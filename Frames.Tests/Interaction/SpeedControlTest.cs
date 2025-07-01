using System.Diagnostics;
using Akka.Actor;
using Akka.TestKit.Xunit2;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.PingPong;
using Frames.Tests.TestUtils;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.Interaction;

public class InteractionControlTest : TestKit, IClassFixture<OpenTelemetryFixture>
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";

    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public InteractionControlTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    // long running test
    [Fact]
    public async Task BaseInteractionControlTest()
    {
        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = Sys.ActorOf(props);

        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        
        var blinkingLightProps = Props.Create<Simulator>(() => new Simulator(rootCoordinatorActor, model, serviceProviderMock));
        var blinkingLightActor = Sys.ActorOf(blinkingLightProps,"simulator-blinking-light");

        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(12)));
        rootCoordinatorActor.Tell(new Simulation.SetSpeedControl(1000));
        var stopTime = new Stopwatch();
        stopTime.Start();
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(blinkingLightActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());
        Thread.Sleep(3000);
        rootCoordinatorActor.Tell(new Simulation.PauseSimulation());
        Serilog.Log.Information($"Simulation stopped {stopTime.ElapsedMilliseconds} ms");
        Thread.Sleep(3000);
        Serilog.Log.Information($"Simulation resumed {stopTime.ElapsedMilliseconds} ms");
        rootCoordinatorActor.Tell(new Simulation.ResumeSimulation());
        
        // Assert
        var response = await ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(25));
        var response2 = await ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(25));
        stopTime.Stop();
        Assert.InRange(stopTime.ElapsedMilliseconds, 17 * 1000, 18 * 1000);
        Assert.InRange(response2.ElapsedTime.Value, new TimeUnit(14).Value, new TimeUnit(14).Value);
    }
}