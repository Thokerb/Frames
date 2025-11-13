using Akka.Actor;
using Akka.Cluster.Tools.PublishSubscribe;
using Akka.Event;
using Frames.Engine;
using Frames.Engine.Messages;
using Microsoft.AspNetCore.SignalR;

namespace Frames.Museum.Actors;

public class SuperRootCoordinatorListenerActor : ReceiveActor
{
    private IHubContext<BenchmarkHub> HubContext { get; }
    private readonly ILoggingAdapter _log = Context.GetLogger();

    public SuperRootCoordinatorListenerActor(IHubContext<BenchmarkHub> hubContext)
    {
        HubContext = hubContext;

        _log.Info(Self.Path.Address.System);
        Receive<SubscribeAck>(ack => Console.WriteLine($"Subscribed to '{ack.Subscribe.Topic}'"));

        ReceiveAsync<Simulation.IsCompleted>(async msg =>
        {
            _log.Info("sending simulation completed");
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