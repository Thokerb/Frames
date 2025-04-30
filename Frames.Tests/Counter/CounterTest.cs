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

namespace Frames.Tests.Counter;

public class CounterTest : TestKit, IClassFixture<OpenTelemetryFixture>
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";
    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public CounterTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .MinimumLevel.Information()
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    
    [Fact]
    public async Task CCounterTest()
    {
        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = Sys.ActorOf(props);

        ICoupledModel model = new CCounter();
        
        var coupledModelProps = Props.Create<Coordinator>(() => new Coordinator(rootCoordinatorActor, model, serviceProviderMock));
        var coupledModelActor = Sys.ActorOf(coupledModelProps,"coordinator-counter");

        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(20)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());
        
        // Assert
        var response = await ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.True(response.ElapsedTime <= new TimeUnit(21));
        Assert.True(response.ElapsedTime > TimeUnit.Zero);
    }    
    [Fact]
    public async Task CCounterWithStopConditionTest()
    {
        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = Sys.ActorOf(props);

        ICoupledModel model = new CCounterWithStopCondition();
        
        var coupledModelProps = Props.Create<Coordinator>(() => new Coordinator(rootCoordinatorActor, model, serviceProviderMock));
        var coupledModelActor = Sys.ActorOf(coupledModelProps,"coordinator-CCounterWithStopCondition");

        // Act
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());
        
        // Assert
        var response = await ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.Equal(new TimeUnit(29).Value, response.ElapsedTime.Value);
    }
}