using Akka.Actor;
using Akka.Cluster.Tools.PublishSubscribe;
using Akka.Event;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Museum.Util;
using Microsoft.AspNetCore.SignalR;

namespace Frames.Museum.Actors;

public class SuperRootCoordinatorListenerActor : ReceiveActor
{
    private IHubContext<BenchmarkHub> HubContext { get; }
    private IConfiguration Configuration { get; }
    private readonly ILoggingAdapter _log = Context.GetLogger();

    public SuperRootCoordinatorListenerActor(IHubContext<BenchmarkHub> hubContext, IConfiguration configuration)
    {
        HubContext = hubContext;
        Configuration = configuration;

        _log.Info(Self.Path.Address.System);
        Receive<SubscribeAck>(ack => Console.WriteLine($"Subscribed to '{ack.Subscribe.Topic}'"));

        ReceiveAsync<Simulation.IsCompleted>(async msg =>
        {
            _log.Info($"sending simulation completed {msg}");
            
            // deleting messages here
            var connectionString = Configuration.GetConnectionString("SqlServer");
            
            if(string.IsNullOrEmpty(connectionString))
            {
                _log.Error("No connection string for SqlServer found in appsettings.json");
                return;
            }
            
            // this is for benchmarks, because Akka.Persistence DeleteMessages has problems with 20k+ messages
            await DatabaseCleanup.DeleteJournalEntries(connectionString, msg.Id);
            await DatabaseCleanup.DeleteSnapshots(connectionString, msg.Id);
            
            await HubContext.Clients.All.SendAsync("Completion", msg);
        });
    }

    protected override void PreStart()
    {
        base.PreStart();
        _log.Info(Self.Path.Address.System);
        var mediator = DistributedPubSub.Get(Context.System);
        mediator.Mediator.Tell(new Subscribe(RootCoordinator.TopicName, Self));
        _log.Info("subscribed to topic " + RootCoordinator.TopicName);
    }

    protected override void PostStop()
    {
        _log.Info("stopping");
        base.PostStop();
    }
}