using Akka.Actor;
using Akka.Hosting;
using System.Diagnostics;
using Akka.Cluster.Hosting;
using Akka.Cluster.Sharding;
using Akka.Discovery.Config.Hosting;
using Akka.Logger.Serilog;
using Akka.Management;
using Akka.Management.Cluster.Bootstrap;
using Akka.Persistence.Hosting;
using Akka.Remote.Hosting;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Engine.Monitoring;
using Frames.Museum.Actors;
using Frames.Museum.ClusterOverview;
using Microsoft.AspNetCore.SignalR;
using LogLevel = Akka.Event.LogLevel;


namespace Frames.Museum;

public struct FramesRegion
{
}

public static class AkkaConfiguration
{
    public static IServiceCollection ConfigureWebApiAkka(this IServiceCollection services, IConfiguration configuration,
        Action<AkkaConfigurationBuilder, IServiceProvider> additionalConfig)
    {
        var akkaSettings = configuration.GetRequiredSection("AkkaSettings").Get<AkkaSettings>();
        Debug.Assert(akkaSettings != null, nameof(akkaSettings) + " != null");

        services.AddSingleton(akkaSettings);

        return services.AddAkka(akkaSettings.ActorSystemName, (builder, serviceProvider) =>
        {
            builder.ConfigureActorSystem(serviceProvider);
            additionalConfig(builder, serviceProvider);
        });
    }

    private static AkkaConfigurationBuilder ConfigureActorSystem(this AkkaConfigurationBuilder builder,
        IServiceProvider serviceProvider)
    {
        var settings = serviceProvider.GetRequiredService<AkkaSettings>();

        return builder
            .ConfigureLoggers(configBuilder =>
            {
                configBuilder.LogConfigOnStart = settings.LogConfigOnStart;
                configBuilder.LogLevel = LogLevel.DebugLevel;
                configBuilder.AddLogger<SerilogLogger>();
                configBuilder.DebugOptions = new DebugOptions()
                {
                    Unhandled = true,
                    Receive = true,
                    AutoReceive = true,
                    RouterMisconfiguration = true,
                    LifeCycle = true,
                };
                configBuilder.DeadLetterOptions = new DeadLetterOptions()
                {
                    ShouldLog = TriStateValue.All
                };
                configBuilder.AddLoggerFactory();
            })
            .ConfigureNetwork(serviceProvider)
            .ConfigurePersistence(serviceProvider)
            .ConfigureActorRegistry(serviceProvider);
    }

    private static AkkaConfigurationBuilder ConfigureNetwork(this AkkaConfigurationBuilder builder,
        IServiceProvider serviceProvider)
    {
        var settings = serviceProvider.GetRequiredService<AkkaSettings>();

        if (!settings.UseClustering)
        {
            return builder;
        }

        builder.WithRemoting(settings.RemoteOptions);

        if (settings.AkkaManagementOptions is { Enabled: true })
        {
            // need to delete seed-nodes so Akka.Management will take precedence
            var clusterOptions = settings.ClusterOptions;
            clusterOptions.SeedNodes = [];

            builder
                .WithClustering(clusterOptions)
                .WithAkkaManagement(hostName: settings.AkkaManagementOptions.Hostname,
                    settings.AkkaManagementOptions.Port)
                .WithClusterBootstrap(serviceName: settings.AkkaManagementOptions.ServiceName,
                    portName: settings.AkkaManagementOptions.PortName,
                    requiredContactPoints: settings.AkkaManagementOptions.RequiredContactPointsNr);

            switch (settings.AkkaManagementOptions.DiscoveryMethod)
            {
                case DiscoveryMethod.Kubernetes:
                case DiscoveryMethod.AwsEcsTagBased:
                case DiscoveryMethod.AwsEc2TagBased:
                case DiscoveryMethod.AzureTableStorage:
                    break;
                case DiscoveryMethod.Config:
                {
                    Console.WriteLine(string.Join(",",settings.AkkaManagementOptions.ExternalEndpoints));
                    builder
                        .WithConfigDiscovery(options =>
                        {
                            options.Services.Add(new Service
                            {
                                Name = settings.AkkaManagementOptions.ServiceName,
                                // TODO: use endpoints from configuration which should be set by environment variables so that in docker we can add them 
                                Endpoints = settings.AkkaManagementOptions.ExternalEndpoints.Where(x => !string.IsNullOrEmpty(x)).Select(x => x).Append($"{settings.AkkaManagementOptions.Hostname}:{settings.AkkaManagementOptions.Port}").ToArray() 
                            });
                        });
                    break;
                }
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
        else
        {
            builder.WithClustering(settings.ClusterOptions);
        }

        return builder;
    }

    public static AkkaConfigurationBuilder ConfigurePersistence(this AkkaConfigurationBuilder builder,
        IServiceProvider serviceProvider)
    {
        var settings = serviceProvider.GetRequiredService<AkkaSettings>();

        switch (settings.PersistenceMode)
        {
            case PersistenceMode.InMemory:
                return builder.WithInMemoryJournal().WithInMemorySnapshotStore();
            default:
                throw new ArgumentOutOfRangeException();
        }
    }

    public static AkkaConfigurationBuilder ConfigureActorRegistry(this AkkaConfigurationBuilder builder,
        IServiceProvider serviceProvider)
    {
        var settings = serviceProvider.GetRequiredService<AkkaSettings>();
        var extractor = new FramesMessageExtractor();

        if (settings.UseClustering)
        {
            return builder
                    .WithSingleton<TracingActor>(
                        "tracingActor",
                        propsFactory: (_, _, _) =>
                        {
                            return Props.Create(() => new TracingActor());
                        }
                        )
                    .WithActors((system, registry, _) =>
                    {
                        // var hub = serviceProvider.GetRequiredService<IHubContext<MetricsHub>>();
                        // var parentTracingActor = system.ActorOf(GenericChildPerEntityParent.Props(extractor, s => Props.Create(() => new MetricsListenerActor(hub))));
                        // registry.Register<MetricsListenerActor>(parentTracingActor);
                        var metricListener =
                            system.ActorOf(
                                Props.Create(() =>
                                    new MetricsListenerActor(
                                        serviceProvider.GetRequiredService<IHubContext<MetricsHub>>())),
                                "metrics-listener");
                        registry.Register<MetricsListenerActor>(metricListener);
                        var gossipListener =
                            system.ActorOf(
                                Props.Create(() =>
                                    new ClusterGossipListenerActor(
                                        serviceProvider.GetRequiredService<IHubContext<ClusterHub>>())),
                                "gossip-listener");
                        registry.Register<ClusterGossipListenerActor>(gossipListener);                        
                        
                        var tracingListener =
                            system.ActorOf(
                                Props.Create(() =>
                                    new TracingStreamHubActor(
                                        serviceProvider.GetRequiredService<IHubContext<TracingHub>>())),
                                "tracing-listener");
                        registry.Register<TracingStreamHubActor>(tracingListener);
            
                    })
                    .WithShardRegion<RootCoordinator>(
                    typeName: "framesRegion1",
                    entityPropsFactory: (_, _, _) =>
                    {

                        
                        return _ =>
                        {
                            return Props.Create(() => new RootCoordinator(serviceProvider));
                        };
                    },
                    extractor,
                    settings.ShardOptions
                )
                .WithShardRegion<Simulator>(
                    typeName: "framesRegion2",
                    entityPropsFactory: (_, _, _) =>
                    {
                        return _ =>
                        {
                            return Props.Create(() => new Simulator(serviceProvider));
                        };
                    },
                    extractor,
                    settings.ShardOptions
                    )    
                .WithShardRegion<Coordinator>(
                    typeName: "framesRegion3",
                    entityPropsFactory: (_, _, _) =>
                    {
                        return _ =>
                        {
                            return Props.Create(() => new Coordinator(serviceProvider));
                        };
                    },
                    extractor,
                    settings.ShardOptions
                    )
                ;
        }


        return builder.WithActors((system, registry, _) =>
        {
            var parent =
                system.ActorOf(
                    GenericChildPerEntityParent.Props(extractor, _ => Props.Create(() => new RootCoordinator(serviceProvider))),
                    "root-coordinator");
            registry.Register<RootCoordinator>(parent);
            var parentCoordinator = system.ActorOf(GenericChildPerEntityParent.Props(extractor, _ => Props.Create(() => new Coordinator(serviceProvider))));
            registry.Register<Coordinator>(parentCoordinator);
            var parentSimulator = system.ActorOf(GenericChildPerEntityParent.Props(extractor, _ => Props.Create(() => new Simulator(serviceProvider))));
            registry.Register<Simulator>(parentSimulator);            
            var parentTracingActor = system.ActorOf(GenericChildPerEntityParent.Props(extractor, _ => Props.Create(() => new TracingActor())));
            registry.Register<TracingActor>(parentTracingActor);
            
            
        });
    }
}


/// <summary>
/// Here we have to decide which message to which shard region.
/// It makes sense to keep actors that communicate often with each other in the same shard region.
/// Overall most messages are bubbling up to the root coordinator
/// It makes sense that Simulators and Coordinators are in the same shard region.
/// When a coordinator has a child coordinator then this can be in a different shard region.
/// </summary>
/// <returns></returns>
public class FramesMessageExtractor : IMessageExtractor
{
    /// <summary>
    /// To which entity does this message belong to?
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public string EntityId(object message)
    {
        if (message is IShardSeperation shardSeparation)
        {
            return $"{shardSeparation.EntityName}-{shardSeparation.RunId}";
        }
        throw new NotSupportedException("Message type not supported for hashing: " + message.GetType());
    }

    /// <summary>
    /// What is the message for this entity?
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public object EntityMessage(object message)
    {
        return message;
    }

    /// <summary>
    /// What is the shard id (= cluster group) for this message?
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public string ShardId(object message)
    {
        if (message is IShardSeperation shardSeparation)
        {
            return shardSeparation.ShardId;
        }
        throw new NotSupportedException("Message type not supported for hashing: " + message.GetType());
    }

    public string ShardId(string entityId, object? messageHint = null)
    {
        if (messageHint is IShardSeperation shardSeparation)
        {
            return shardSeparation.ShardId;
        }
        throw new NotSupportedException("Message type not supported for hashing: " + messageHint?.GetType());
        
    }
}