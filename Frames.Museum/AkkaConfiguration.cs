using Akka.Actor;
using Akka.Hosting;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using System.Diagnostics;
using Akka.Actor;
using Akka.Cluster.Hosting;
using Akka.Cluster.Sharding;
using Akka.Configuration;
using Akka.Discovery.Config.Hosting;
using Akka.HealthCheck.Hosting;
using Akka.Hosting;
using Akka.Management;
using Akka.Management.Cluster.Bootstrap;
using Akka.Persistence.Hosting;
using Akka.Remote.Hosting;
using Akka.Util;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Museum.ClusterOverview;
using Microsoft.AspNetCore.SignalR;


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

    public static AkkaConfigurationBuilder ConfigureActorSystem(this AkkaConfigurationBuilder builder,
        IServiceProvider serviceProvider)
    {
        var settings = serviceProvider.GetRequiredService<AkkaSettings>();

        return builder
            .ConfigureLoggers(configBuilder =>
            {
                configBuilder.LogConfigOnStart = settings.LogConfigOnStart;
                configBuilder.AddLoggerFactory();
            })
            .ConfigureNetwork(serviceProvider)
            .ConfigurePersistence(serviceProvider)
            .ConfigureRootCoordinator(serviceProvider);
    }

    public static AkkaConfigurationBuilder ConfigureNetwork(this AkkaConfigurationBuilder builder,
        IServiceProvider serviceProvider)
    {
        var settings = serviceProvider.GetRequiredService<AkkaSettings>();
        var configuration = serviceProvider.GetRequiredService<IConfiguration>();

        if (!settings.UseClustering)
        {
            return builder;
        }

        builder.WithRemoting(settings.RemoteOptions);

        if (settings.AkkaManagementOptions is { Enabled: true })
        {
            // need to delete seed-nodes so Akka.Management will take precedence
            var clusterOptions = settings.ClusterOptions;
            clusterOptions.SeedNodes = Array.Empty<string>();

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
                    builder
                        .WithConfigDiscovery(options =>
                        {
                            options.Services.Add(new Service
                            {
                                Name = settings.AkkaManagementOptions.ServiceName,
                                // TODO: use endpoints from configuration which should be set by environment variables so that in docker we can add them 
                                Endpoints = new[]
                                {
                                    $"{settings.AkkaManagementOptions.Hostname}:{settings.AkkaManagementOptions.Port}",
                                }
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

    public static AkkaConfigurationBuilder ConfigureRootCoordinator(this AkkaConfigurationBuilder builder,
        IServiceProvider serviceProvider)
    {
        var settings = serviceProvider.GetRequiredService<AkkaSettings>();
        var extractor = CreateHashCodeMessageExtractor();

        if (settings.UseClustering)
        {
            return builder.WithShardRegion<RootCoordinator>(
                    typeName: "framesRegion",
                    entityPropsFactory: (system, registry, resolver) =>
                    {
                        // var metricListener =
                        //     system.ActorOf(
                        //         Props.Create(() =>
                        //             new MetricsListenerActor(
                        //                 serviceProvider.GetRequiredService<IHubContext<MetricsHub>>())),
                        //         "metrics-listener");
                        // registry.Register<MetricsListenerActor>(metricListener);
                        
                        return s =>
                        {
                            Console.WriteLine("framesRegion1"+s);
                            return Props.Create(() => new RootCoordinator(serviceProvider));
                        };
                    },
                    extractor,
                    settings.ShardOptions
                )
                .WithShardRegion<Simulator>(
                    typeName: "framesRegion2",
                    entityPropsFactory: (system, registry, resolver) =>
                    {
                        return s =>
                        {
                            Console.WriteLine("framesRegion2"+s);
                            return Props.Create(() => new Simulator(serviceProvider));
                        };
                    },
                    extractor,
                    settings.ShardOptions
                    )    
                .WithShardRegion<Coordinator>(
                    typeName: "framesRegion3",
                    entityPropsFactory: (system, registry, resolver) =>
                    {
                        return s =>
                        {
                            Console.WriteLine("framesRegion3"+s);
                            return Props.Create(() => new Coordinator(serviceProvider));
                        };
                    },
                    extractor,
                    settings.ShardOptions
                    )
                ;
        }


        // TODO: this is not properly configured, because we are always using shard regions
        return builder.WithActors((system, registry, resolver) =>
        {
            var parent = system.ActorOf(
                Props.Create(() => new RootCoordinator(serviceProvider)),
                "root-coordinator"
            );
            registry.Register<RootCoordinator>(parent);
        });
    }

    /// <summary>
    /// Here we have to decide which message to which shard region.
    /// It makes sense to keep actors that communicate often with each other in the same shard region.
    /// Overall most messages are bubbling up to the root coordinator
    /// It makes sense that Simulators and Coordinators are in the same shard region.
    /// When a coordinator has a child coordinator then this can be in a different shard region.
    /// </summary>
    /// <returns></returns>
    public static IMessageExtractor CreateHashCodeMessageExtractor()
    {
        return new FramesMessageExtractor();
        
        return HashCodeMessageExtractor.Create(30, o =>
        {
            return o switch
            {
                IShardSeperation message => message.ShardId,
                _ => throw new NotSupportedException("Message type not supported for hashing: " + o.GetType())
            };
        }, o => o);
    }    
    

}

public class FramesMessageExtractor : IMessageExtractor
{
    /// <summary>
    /// To which entity does this message belong to?
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public string? EntityId(object message)
    {
        if (message is IShardSeperation shardSeperation)
        {
            return shardSeperation.EntityName;
        }
        throw new NotSupportedException("Message type not supported for hashing: " + message.GetType());
    }

    /// <summary>
    /// What is the message for this entity?
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public object? EntityMessage(object message)
    {
        return message;
    }

    /// <summary>
    /// What is the shard id (= cluster group) for this message?
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public string? ShardId(object message)
    {
        if (message is IShardSeperation shardSeperation)
        {
            return shardSeperation.ShardId;
        }
        throw new NotSupportedException("Message type not supported for hashing: " + message.GetType());
    }

    public string ShardId(string entityId, object? messageHint = null)
    {
        if (messageHint is IShardSeperation shardSeperation)
        {
            return shardSeperation.ShardId;
        }
        throw new NotSupportedException("Message type not supported for hashing: " + messageHint.GetType());
        
    }
}