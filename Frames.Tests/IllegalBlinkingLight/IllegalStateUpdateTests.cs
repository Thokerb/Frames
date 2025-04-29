using Akka.Actor;
using Akka.TestKit.Xunit2;
using Frames.Engine;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.PingPong;
using Frames.Tests.TestUtils;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.IllegalBlinkingLight;

public class IllegalStateUpdateTests : TestKit, IClassFixture<OpenTelemetryFixture>
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";

    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public IllegalStateUpdateTests(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .MinimumLevel.Verbose()
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    
    [Fact]
    public void ThrowOnIllegalTimeAdvance()
    {
        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = Sys.ActorOf(props);

        IAtomicModelBase model = new IllegalBlinkingLightAtomicModel();
        var blinkingLightProps = Props.Create<Simulator>(() => new Simulator(rootCoordinatorActor, model, serviceProviderMock));
        var blinkingLightActor = Sys.ActorOf(blinkingLightProps);
        
        // Act        
        // Assert that exception is thrown
        EventFilter.Exception<IllegalStateModificationException>().ExpectOne(() =>
        {
            using var activity = _openTelemetryFixture.Instrumentation.ActivitySource.StartActivity("test");
            blinkingLightActor.Tell(new EngineMessages.StartInitialization(TimeUnit.Zero));
        });

    }
    
    
    
    [Fact]
    public void ThrowOnIllegalOutput()
    {
        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = Sys.ActorOf(props);

        IAtomicModelBase model = new IllegalBlinkingLightAtomicModel();
        var blinkingLightProps = Props.Create<Simulator>(() => new Simulator(rootCoordinatorActor, model, serviceProviderMock));
        var blinkingLightActor = Sys.ActorOf(blinkingLightProps);
        
        // Act        
        // Assert that exception is thrown
        EventFilter.Exception<IllegalStateModificationException>().ExpectOne(() =>
        {
            using var activity = _openTelemetryFixture.Instrumentation.ActivitySource.StartActivity("test");
            blinkingLightActor.Tell(new ComputeOutput.StartComputeOutput(TimeUnit.Zero));
        });

    }
}