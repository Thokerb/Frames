using Akka.Actor;
using Akka.TestKit.Xunit2;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.TestUtils;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.PingPong;

public class PingPongTestOTEL : IClassFixture<OpenTelemetryFixture>
{
    private TestKit _testKit;
    
    private readonly OpenTelemetryFixture _openTelemetryFixture;
    
    public PingPongTestOTEL(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .MinimumLevel.Verbose()
            // exclude when message contains 'version : "0.0.1 Akka"'
            .Filter.ByExcluding(e => e.MessageTemplate.Text.Contains("version"))
            // enrich with bla
            // .Enrich.WithProperty("TestName", "PingPongTest")
            .WriteTo.TestOutput(output,outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{Properties}{NewLine}{Exception}")
            .CreateLogger();
        
        
        var system = ActorSystem.Create("my-test-system", File.ReadAllText("logConfig.conf"));
        var testKit = new TestKit(system);
        _testKit = testKit;
    }

    [Fact]
    public void TestEnrichedLog()
    {
        Log.Information("This is a test log message");
        Log.Debug("This is a test log message");
        
        Assert.True(true);
    }
    
    
    
    [Fact]
    public async Task CreateTable()
    {
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);

        // Arrange root coordinator
        var rootProps = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = _testKit.ActorOf(rootProps,"root-coordinator");

        ICoupledModel coupledModel = new Table();
        
        var coupledModelProps = Props.Create<Coordinator>(() => new Coordinator(rootCoordinatorActor, coupledModel, serviceProviderMock));
        var coupledModelActor = _testKit.ActorOf(coupledModelProps,"coordinator-table");
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(30)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());
        
        
        // Assert
        var response = await _testKit.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.True(response.ElapsedTime <= new TimeUnit(31));
        Assert.True(response.ElapsedTime > TimeUnit.Zero);
    }
    
    [Fact]
    public async Task BaseBlinkingLightTest()
    {
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);

        // Arrange root coordinator
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = _testKit.ActorOf(props);

        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        
        var blinkingLightProps = Props.Create<Simulator>(() => new Simulator(rootCoordinatorActor, model, serviceProviderMock));
        var blinkingLightActor = _testKit.ActorOf(blinkingLightProps,"simulator-blinking-light");

        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(10)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(blinkingLightActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());
        
        // Assert
        var response = await _testKit.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.True(response.ElapsedTime <= new TimeUnit(11));
        Assert.True(response.ElapsedTime > TimeUnit.Zero);
    }
}