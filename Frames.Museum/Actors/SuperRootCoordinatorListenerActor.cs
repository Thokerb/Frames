using Akka.Actor;
using Akka.Cluster;
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
        ReceiveAsync<ClusterEvent.MemberUp>(async msg => await HandleMemberUp(msg));

        ReceiveAsync<Simulation.IsCompleted>(async msg =>
        {
            _log.Info($"sending simulation completed {msg}");
            Serilog.Log.Logger.Information("Simulation completed: {Msg}", msg);
            
            // deleting messages here
            var connectionString = Configuration.GetConnectionString("SqlServer");
            
            if(string.IsNullOrEmpty(connectionString))
            {
                _log.Error("No connection string for SqlServer found in appsettings.json");
                return;
            }
            
            // this is for benchmarks, because Akka.Persistence DeleteMessages has problems with 20k+ messages
            try
            {

                await DatabaseCleanup.DeleteJournalEntries(connectionString, msg.Id);
                await DatabaseCleanup.DeleteSnapshots(connectionString, msg.Id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            msg = msg with
            {
                NumberNodes = Configuration.GetValue<int>("AkkaSettings:AkkaManagementOptions:RequiredContactPointsNr")
            };
            await HubContext.Clients.All.SendAsync("Completion", msg);
        });
    }

    private async Task HandleMemberUp(ClusterEvent.MemberUp msg)
    {
        var mediator = DistributedPubSub.Get(Context.System);
        mediator.Mediator.Tell(new Subscribe(RootCoordinator.TopicName, Self)); // this is to avoid race conditions when the actor starts before the cluster is formed
    }

    protected override void PreStart()
    {
        base.PreStart();
        _log.Info(Self.Path.Address.System);
        Cluster.Get(Context.System).Subscribe(Self, new[] { typeof(ClusterEvent.IMemberEvent) });
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