using Frames.Museum.Actors;
using Frames.Museum.ClusterOverview;

namespace Frames.Museum;

public static class SignalRConfiguration
{
    public static void AddSignalRConfiguration(this IServiceCollection services)
    {
        services.AddSignalR();
        services.AddSignalRAkkaStream(); // Makes IStreamDispatcher available
    }
    
    public static void UseSignalRConfiguration(this WebApplication app)
    {
        app.MapHub<MetricsHub>("/metrics");
        app.MapHub<ClusterHub>("/clusterHub");
        app.MapHub<TracingHub>("/tracingHub");

    }
    
}