using Akka.Actor;
using Akka.TestKit.Xunit2;
using Frames.Engine;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.RootCoordinatorTest;

public class RootCoordinatorTest : TestKit
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";

    
    public RootCoordinatorTest(ITestOutputHelper output)
    {
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    
    [Fact]
    public void FailWhenStartingWithoutStopCondition()
    {
        // Arrange root coordinator
        var props = Props.Create<Engine.RootCoordinator>();
        var rootCoordinatorActor = Sys.ActorOf(props);

        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel();
        
        var blinkingLightProps = Props.Create<Simulator>(() => new Simulator(rootCoordinatorActor, model));
        var blinkingLightActor = Sys.ActorOf(blinkingLightProps,"simulator-blinking-light");

        // Assert
        EventFilter.Exception<NoStopConditionException>().ExpectOne(() =>
        {
            // Act
            rootCoordinatorActor.Tell(new Simulation.StartSimulation(blinkingLightActor));
        });
    }
}