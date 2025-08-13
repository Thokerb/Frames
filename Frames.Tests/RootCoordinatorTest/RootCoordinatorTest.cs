using Akka.Actor;
using Akka.Hosting;
using Akka.Hosting.TestKit;
using Frames.Engine;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Tests.PingPong;
using Frames.Tests.TestUtils;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.RootCoordinatorTest;

public class RootCoordinatorTest : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";
    private readonly OpenTelemetryFixture _openTelemetryFixture;

    
    public RootCoordinatorTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    
    [Fact]
    public async Task FailWhenStartingWithoutStopCondition()
    {
        var probe = CreateTestProbe();
        // Arrange root coordinator
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();
        var uniqueId = Guid.NewGuid();

        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        
        var blinkingLightActor  = await rootCoordinatorActor.Ask(new Simulation.CreateModel(model,$"simulator-blinking-light",uniqueId)
        {
            ShardId = "1"
        });
        // Assert
        probe.EventFilter.Exception<NoStopConditionException>().ExpectOne(() =>
        {
            // Act
            rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId),probe);
        });
    }


}