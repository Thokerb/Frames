using Akka.Actor;
using Akka.Hosting;
using Akka.Hosting.TestKit;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.TestUtils;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.PingPong;

public class PingPongTestOTEL : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
{
    
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
        
    }

    
    
    [Fact]
    public async Task CreateTable()
    {
        var expectResultsProbe = CreateTestProbe();
        
        // Arrange root coordinator
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();

        ICoupledModel coupledModel = new Table();
        
        var coupledModelActor = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(coupledModel,$"coordinator-table")
        {
            ShardId = "1"
        });
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(30)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(),expectResultsProbe);
        
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.True(response.ElapsedTime <= new TimeUnit(31));
        Assert.True(response.ElapsedTime > TimeUnit.Zero);
    }
    
    [Fact]
    public async Task BaseBlinkingLightTest()
    {
        var expectResultsProbe = CreateTestProbe();


        // Arrange root coordinator
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();
        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        
        var blinkingLightActor  = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(model,$"coordinator-table")
        {
            ShardId = "1"
        });

        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(10)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(blinkingLightActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(),expectResultsProbe);
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.True(response.ElapsedTime <= new TimeUnit(11));
        Assert.True(response.ElapsedTime > TimeUnit.Zero);
    }


}