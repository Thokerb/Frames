using Akka.Actor;
using Akka.Streams;
using Akka.Streams.Dsl;
using Ceen;
using Frames.Engine.Tracing;
using Microsoft.AspNetCore.SignalR;

namespace Frames.Museum.Actors;


/// <summary>
/// This actor is a modified version of the TracingActor in Frames.Engine;
/// It is used to send messages to the TracingStreamHub.
/// </summary>
public class TracingStreamHubActor : ReceiveActor
{
    private IHubContext<TracingHub> HubContext { get; }

    public TracingStreamHubActor(IHubContext<TracingHub> hubContext)
    {
        HubContext = hubContext;


        ReceiveAsync<Engine.Messages.Tracing.MessageWithId>(async msg =>
        {
            await HubContext.Clients.All.SendAsync("TraceEvent", msg.Message);
        });
    }

    protected override void PreStart()
    {
        base.PreStart();
        Context.System.EventStream.Subscribe(Self, typeof(Engine.Messages.Tracing.MessageWithId));
    }

    protected override void PostStop()
    {
        Context.System.EventStream.Unsubscribe(Self);
        base.PostStop();
    }
    
}