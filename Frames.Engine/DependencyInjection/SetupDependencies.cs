using Frames.Engine.Monitoring;
using Frames.Engine.Persistence;
using Frames.Engine.Persistence.Database;
using Microsoft.Extensions.DependencyInjection;

namespace Frames.Engine.DependencyInjection;

public static class SetupDependencies
{

    public static IServiceCollection AddFrameServices(this IServiceCollection services)
    {
        // Persistence
        services.AddSingleton<IDatabaseManager, MongoDBManager>();
        services.AddSingleton<ISnapshotManager, SnapshotManager>();
        
        // Tracking
        services.AddSingleton<Instrumentation>();

        return services;
    }
    
}