using Akka.Actor;
using Akka.TestKit.Xunit2;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.PingPong;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.Generator;

public class CQueueTest : TestKit, IClassFixture<OpenTelemetryFixture>
{
    private TestKit _testKit;
    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public CQueueTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .MinimumLevel.Information()
            .WriteTo.TestOutput(output)
            .CreateLogger();
        
        
        var system = ActorSystem.Create("my-test-system", File.ReadAllText("logConfig.conf"));
        var testKit = new TestKit(system);
        _testKit = testKit;
        
    }
    
    
    
    [Fact]
    public async Task CreateCQueue()
    {
        // Arrange root coordinator
        var rootProps = Props.Create<Engine.RootCoordinator>(() => new Engine.RootCoordinator(_openTelemetryFixture.Instrumentation));
        var rootCoordinatorActor = _testKit.ActorOf(rootProps,"root-coordinator");

        ICoupledModel coupledModel = new CQueue();
        
        var coupledModelProps = Props.Create<Coordinator>(() => new Coordinator(coupledModel, rootCoordinatorActor, _openTelemetryFixture.Instrumentation));
        var coupledModelActor = _testKit.ActorOf(coupledModelProps,"coordinator-cqueue");
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(10)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());
        
        
        // Assert
        var response = await _testKit.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        
        Assert.Equivalent(response.ElapsedTime, TimeUnit.Infinity);
    }
}