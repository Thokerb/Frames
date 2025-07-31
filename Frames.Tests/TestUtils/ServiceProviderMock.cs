using Akka.Cluster.Sharding;
using Frames.Engine;
using Frames.Engine.Monitoring;
using Frames.Engine.Persistence;
using Frames.Engine.Persistence.Database;
using Frames.Museum;
using NSubstitute;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace Frames.Tests.TestUtils;

public static class ServiceProviderMock
{
    public static IServiceProvider CreateMock(Instrumentation instrumentation)
    {
        var serviceProvider = Substitute.For<IServiceProvider>();
        var simulatorSnapshotManagerMock = SimulatorSnapshotManagerMock.CreateMock();
        var configurationMock = ConfigurationMock.CreateMock();
        
        // mock Instrumentation returns
        serviceProvider.GetService(typeof(Instrumentation)).Returns(instrumentation);

        var databaseManagerMock = new MongoDBManager(configurationMock);
        serviceProvider.GetService(typeof(IDatabaseManager)).Returns(databaseManagerMock);
        // mock ISimulatorSnapshotManager returns
        serviceProvider.GetService(typeof(ISnapshotManager)).Returns(new SnapshotManager(databaseManagerMock));
        // mock IConfiguration returns
        serviceProvider.GetService(typeof(IConfiguration)).Returns(configurationMock);
        // mock IServiceProvider
        serviceProvider.GetService(typeof(IServiceProvider)).Returns(serviceProvider);
        
        var settings = new AkkaSettings() { UseClustering = false, PersistenceMode = PersistenceMode.InMemory };
        serviceProvider.GetService(typeof(AkkaSettings)).Returns(settings);
        
        // var simulatorProps = Props.Create(() => new Simulator(serviceProvider));
        // var simulatorActor = actorSystem.ActorOf(simulatorProps);
        // var coordinatorProps = Props.Create(() => new Coordinator(serviceProvider));
        // var coordinatorActor = actorSystem.ActorOf(coordinatorProps);
        // var rootCoordinatorProps = Props.Create(() => new RootCoordinator(serviceProvider));
        // var rootCoordinatorActor = actorSystem.ActorOf(rootCoordinatorProps, "root-coordinator");
        // var tracingActorProps = Props.Create(() => new TracingActor());
        // var tracingActor = actorSystem.ActorOf(tracingActorProps);
        //
        // var actorRegistry = new ActorRegistry();
        // actorRegistry.Register<Simulator>(simulatorActor);             
        // actorRegistry.Register<Coordinator>(coordinatorActor);     
        // actorRegistry.Register<RootCoordinator>(rootCoordinatorActor);    
        // actorRegistry.Register<TracingActor>(tracingActor);    
        
        // var actorRegistryMock = Substitute.For<ActorRegistry>();
        // actorRegistryMock.Get<Simulator>().Returns(_ =>
        // {
        //     var props = Props.Create<Simulator>();
        //     var actor = actorSystem.ActorOf(props,$"simulator-{"any"}");
        //     return actor;
        // });
        // actorRegistryMock.GetAsync<Simulator>().Returns(_ =>
        // {
        //     var props = Props.Create<Simulator>();
        //     var actor = actorSystem.ActorOf(props,$"simulator-{"any"}");
        //     return actor;
        // });
        // serviceProvider.GetService(typeof(ActorRegistry)).Returns(actorRegistry);
        
        return serviceProvider;
    }
} 