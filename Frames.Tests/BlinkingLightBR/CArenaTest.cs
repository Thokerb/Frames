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

namespace Frames.Tests.BlinkingLightBR;

public class CArenaTest : IClassFixture<OpenTelemetryFixture>
{
    private TestKit _testKit;
    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public CArenaTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .MinimumLevel.Information()
            // exclude when message contains 'version : "0.0.1 Akka"'
            .Filter.ByExcluding(e => e.MessageTemplate.Text.Contains("version"))
            // enrich with bla
            .WriteTo.TestOutput(output)
            .CreateLogger();
        
        
        var system = ActorSystem.Create("my-test-system", File.ReadAllText("logConfig.conf"));
        var testKit = new TestKit(system);
        _testKit = testKit;
        
    }
    
    
    
    [Fact]
    public async Task CreateCArena()
    {
        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var rootProps = Props.Create<Engine.RootCoordinator>(() => new Engine.RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = _testKit.ActorOf(rootProps,"root-coordinator");

        ICoupledModel coupledModel = new CArena();
        
        var coupledModelProps = Props.Create<Coordinator>(() => new Coordinator(rootCoordinatorActor, coupledModel, serviceProviderMock));
        var coupledModelActor = _testKit.ActorOf(coupledModelProps,"coordinator-carena");
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(50)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());
        
        
        // Assert
        var response = await _testKit.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        
        Assert.Equivalent( TimeUnit.Infinity,response.ElapsedTime);
    }
}