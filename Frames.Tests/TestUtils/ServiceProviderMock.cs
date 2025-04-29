using Frames.Engine.Monitoring;
using Frames.Engine.Persistence;
using Frames.Engine.Persistence.Database;
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
        
        return serviceProvider;
    }
} 