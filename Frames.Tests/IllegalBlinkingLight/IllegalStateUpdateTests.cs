using System.Diagnostics;
using Akka.Actor;
using Akka.Hosting;
using Akka.Hosting.TestKit;
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

public class IllegalStateUpdateTests : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
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
    public async Task ThrowOnIllegalTimeAdvance()
    {
        var expectResultsProbe = CreateTestProbe();

        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();

        IAtomicModelBase model = new IllegalBlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        var blinkingLightActor = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(model,$"simulator-blinking-light")
        {
            ShardId = "1"
        });
        
        // Act        
        // Assert that exception is thrown
        expectResultsProbe.EventFilter.Exception<IllegalStateModificationException>().ExpectOne(() =>
        {
            using var activity = _openTelemetryFixture.Instrumentation.ActivitySource.StartActivity("test");
            blinkingLightActor.Tell(new EngineMessages.StartInitialization(TimeUnit.Zero, null)
            {
                ShardId = "root",
                EntityName = "simulator-blinking-light",
                SpanIdValue = ActivitySpanId.CreateRandom().ToString(),
                TraceIdValue = ActivityTraceId.CreateRandom().ToString()
            },expectResultsProbe);
        });

    }
    
    
    
    [Fact]
    public async Task ThrowOnIllegalOutput()
    {
        var expectResultsProbe = CreateTestProbe();
        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();
        
        IAtomicModelBase model = new IllegalBlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        var blinkingLightActor = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(model,$"simulator-blinking-light")
        {
            ShardId = "1"
        });        
        // Act
        // // Assert that exception is thrown
        expectResultsProbe.EventFilter.Exception<IllegalStateModificationException>().ExpectOne(() =>
        {
            using var activity = _openTelemetryFixture.Instrumentation.ActivitySource.StartActivity("test");
            // wrong shardId, but does not matter for this test
            blinkingLightActor.Tell(new ComputeOutput.StartComputeOutput(TimeUnit.Zero,null)
            {
                ShardId = "root-coordinator",
                EntityName = "simulator-blinking-light",
                SpanIdValue = ActivitySpanId.CreateRandom().ToString(),
                TraceIdValue = ActivityTraceId.CreateRandom().ToString(),
            },expectResultsProbe);
        });

    }


}