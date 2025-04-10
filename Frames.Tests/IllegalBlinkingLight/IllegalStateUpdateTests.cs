using Akka.Actor;
using Akka.TestKit.Xunit2;
using Frames.Engine;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.IllegalBlinkingLight;

public class IllegalStateUpdateTests : TestKit
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";

    
    public IllegalStateUpdateTests(ITestOutputHelper output)
    {
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    
    [Fact]
    public void ThrowOnIllegalTimeAdvance()
    {
        // Arrange root coordinator
        var props = Props.Create<RootCoordinator>();
        var rootCoordinatorActor = Sys.ActorOf(props);

        IAtomicModelBase model = new IllegalBlinkingLightAtomicModel();
        
        var blinkingLightProps = Props.Create<Simulator>(() => new Simulator(rootCoordinatorActor, model));
        var blinkingLightActor = Sys.ActorOf(blinkingLightProps);
        
        // Act        
        // Assert that exception is thrown
        EventFilter.Exception<IllegalStateModificationException>().ExpectOne(() =>
        {
            blinkingLightActor.Tell(new Initialization.StartInitialization(TimeUnit.Zero));
        });

    }
    [Fact]
    public void ThrowOnIllegalOutput()
    {
        // Arrange root coordinator
        var props = Props.Create<RootCoordinator>();
        var rootCoordinatorActor = Sys.ActorOf(props);

        IAtomicModelBase model = new IllegalBlinkingLightAtomicModel();
        
        var blinkingLightProps = Props.Create<Simulator>(() => new Simulator(rootCoordinatorActor, model));
        var blinkingLightActor = Sys.ActorOf(blinkingLightProps);
        
        // Act        
        // Assert that exception is thrown
        EventFilter.Exception<IllegalStateModificationException>().ExpectOne(() =>
        {
            blinkingLightActor.Tell(new ComputeOutput.StartComputeOutput(TimeUnit.Zero));
        });

    }
}