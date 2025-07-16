using Akka;
using Akka.Actor;
using Akka.Streams;
using Akka.Streams.Dsl;
using Akka.Streams.SignalR;
using Akka.Streams.SignalR.AspNetCore;
using Akka.Streams.SignalR.AspNetCore.Internals;
using Microsoft.AspNetCore.SignalR;
 
namespace Frames.Museum.ClusterOverview;

public class MetricStream: Akka.Streams.SignalR.AspNetCore.StreamConnector
{
    public MetricStream(IHubClients clients,ActorSystem app, ConnectionSourceSettings sourceSettings = null, ConnectionSinkSettings sinkSettings = null) 
        : base(clients, sourceSettings, sinkSettings)
    {
        var materializer = ActorMaterializer.Create(app);

        
        this.Source
            .Collect(x => x as Received) // filter out lifecycle events
            .Select(x => Signals.Broadcast(x.Data))
            .To(this.Sink)
            .Run(materializer);
            ;
    }
}
