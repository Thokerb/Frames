using Akka.Actor;
using Akka.Hosting;
using Akka.Hosting.TestKit;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.PingPong;
using Frames.Tests.TestUtils;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.BlinkingLightBR;

public class CSuperArenaTest : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
{
    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public CSuperArenaTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
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
        }
    
    
    
    [Fact]
    public async Task CreateCSuperArena()
    {
        var expectResultsProbe = CreateTestProbe();

        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var rootProps = Props.Create<Engine.RootCoordinator>(() => new Engine.RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();

        ICoupledModel coupledModel = new CSuperArena();
        
        var coupledModelActor = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(coupledModel,"coordinator-carena")
        {
            ShardId = "1"
        });        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(50)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(),expectResultsProbe);
        
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(6));

        
        Assert.Equivalent( TimeUnit.Infinity,response.ElapsedTime);
    }    
    
    
    [Fact]
    public async Task CreateCSuperArena2()
    {
        var expectResultsProbe = CreateTestProbe();

        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var rootProps = Props.Create<Engine.RootCoordinator>(() => new Engine.RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();

        ICoupledModel coupledModel = new CSuperArena2();
        
        var coupledModelActor = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(coupledModel,"coordinator-carena")
        {
            ShardId = "1"
        });        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(50)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(),expectResultsProbe);
        
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(6));

        
        Assert.Equivalent( TimeUnit.Infinity,response.ElapsedTime);
    }


}