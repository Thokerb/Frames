using Akka.Actor;
using Akka.TestKit.Xunit2;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.PingPong;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.BlinkingLight;

public class BlinkingLightTest : TestKit, IClassFixture<OpenTelemetryFixture>
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";

    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public BlinkingLightTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    
    [Fact]
    public async Task BaseBlinkingLightTest()
    {
        // Arrange root coordinator
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(_openTelemetryFixture.Instrumentation));
        var rootCoordinatorActor = Sys.ActorOf(props);

        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        
        var blinkingLightProps = Props.Create<Simulator>(() => new Simulator(rootCoordinatorActor, model, _openTelemetryFixture.Instrumentation));
        var blinkingLightActor = Sys.ActorOf(blinkingLightProps,"simulator-blinking-light");

        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(10)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(blinkingLightActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());
        
        // Assert
        var response = await ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.True(response.ElapsedTime <= new TimeUnit(11));
        Assert.True(response.ElapsedTime > TimeUnit.Zero);
    }
    
    
}