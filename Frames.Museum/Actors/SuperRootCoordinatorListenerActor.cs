using Akka.Actor;
using Akka.Event;
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
        var success =Context.System.EventStream.Subscribe(Self, typeof(Simulation.IsCompleted));
        _log.Info($" suc: {success}");
    }

    protected override void PostStop()
    {
        _log.Info("stopping");
        Context.System.EventStream.Unsubscribe(Self, typeof(Simulation.IsCompleted));
        base.PostStop();
    }
}