using Akka.Actor;
using Akka.Cluster.Tools.PublishSubscribe;
using Akka.Hosting;
using Akka.Hosting.TestKit;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Engine.Monitoring;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Museum;
using Frames.Tests.PingPong;
using Frames.Tests.TestUtils;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.BlinkingLightBR;

public class CArenaTest : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
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
    }
    
    
    
    [Fact]
    public async Task CreateCArena()
    {
        var expectResultsProbe = CreateTestProbe();
        var uniqueId = Guid.NewGuid();

        
        // // Arrange root coordinator
        // var rootProps = Props.Create<Engine.RootCoordinator>(() => new Engine.RootCoordinator("persist",serviceProviderMock));
        // var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();
        var listener = ActorRegistry.Get<DistributedPubSubMediator>();
        listener.Tell(new Subscribe(RootCoordinator.TopicName, expectResultsProbe));
            
        ICoupledModel coupledModel = new CArena();
        
        var coupledModelActor = await rootCoordinatorActor.Ask(new Simulation.CreateModel(coupledModel,"coordinator-carena",uniqueId)
        {
        });        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(50),uniqueId));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));
        
        
        // Assert
        var msg = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(4));
        // var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        
        Assert.Equivalent( TimeUnit.Infinity, msg.ElapsedTime);
    }
    
 
    
}