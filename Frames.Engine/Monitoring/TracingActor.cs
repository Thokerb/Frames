using Akka.Hosting;
using Akka.Streams;
using Akka.Streams.Dsl;
using Frames.Engine.Tracing;
using Serilog;

namespace Frames.Engine.Monitoring;

public class TracingActor : ReceiveActor {
    private IActorRef StreamRef { get; init; }
    
    public TracingActor()
    {
        StreamRef = 
            Source
                .ActorRef<Messages.Tracing.StreamElement>(1000, OverflowStrategy.DropHead)
                .Via(TracingFlow.GroupByStepFlow())
                .To(Sink.ForEach<List<Messages.Tracing.MessageWithId>>(group =>
                {
                    Log.Information("[ROOT] Processing group:");
                    foreach (var message in group)
                    {
                        
                        Context.System.EventStream.Publish(message);
                        Log.Information("[ROOT] Message: {Message}", message);
                    }
                }))
                .Run(Context.System);
        
        Receive<Messages.Tracing.StreamElement>(msg =>
        {
            StreamRef.Tell(msg);
        });
    }
}