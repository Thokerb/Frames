using Akka.Hosting;
using Akka.Hosting.TestKit;
using Frames.Engine.Monitoring;
using Frames.Museum;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Frames.Tests.TestUtils;

public class BaseTestKit : TestKit
{
    protected override void ConfigureServices(HostBuilderContext context, IServiceCollection services)
    {
        var settings = new AkkaSettings() { UseClustering = false, PersistenceMode = PersistenceMode.InMemory };
        services.AddSingleton(settings);
        base.ConfigureServices(context, services);
    }

    
    protected override void ConfigureAkka(AkkaConfigurationBuilder builder, IServiceProvider provider)
    {
        var serviceProviderMock = ServiceProviderMock.CreateMock(new Instrumentation());
        builder.ConfigureRootCoordinator(serviceProviderMock).ConfigurePersistence(serviceProviderMock);
    }
}