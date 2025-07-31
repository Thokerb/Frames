using Akka.Actor;
using Akka.Hosting;
using Akka.Hosting.TestKit;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.BlinkingLightBR;
using Frames.Tests.PingPong;
using Frames.Tests.TestUtils;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.Checkpoints;

public class CheckPointsTest : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
{
    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public CheckPointsTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
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



    /// <summary>
    /// This test only works, when MongoDB is running and the connection string is set in the config file.
    /// Config file path: <see cref="TestUtils.ConfigurationMock"/>
    /// </summary>
    [SkipForGithubAction]
    public async Task CreateCSuperArena()
    {
        var expectResultsProbe = CreateTestProbe();

        // Arrange root coordinator
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();

        ICoupledModel coupledModel = new CSuperArena();

        var coupledModelActor = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(coupledModel,"coordinator-carena")
        {
            ShardId = "root-coordinator"
        });
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetCheckpoint("checkpoint1", new TimeUnit(10)));
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(50)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(),expectResultsProbe);


        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(6));


        Assert.Equivalent(TimeUnit.Infinity, response.ElapsedTime);
        
        rootCoordinatorActor.Tell(new Simulation.LoadCheckpoint("checkpoint1"){ShardId = "root-coordinator", EntityName = "root-coordinator"});
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor, "checkpoint1"));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(),expectResultsProbe);
        
        var response2 = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(6));
        Assert.Equivalent(TimeUnit.Infinity, response2.ElapsedTime);
        
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
            ShardId = "root-coordinator"
        });
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(50)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(),expectResultsProbe);


        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(6));


        Assert.Equivalent(TimeUnit.Infinity, response.ElapsedTime);
    }


}