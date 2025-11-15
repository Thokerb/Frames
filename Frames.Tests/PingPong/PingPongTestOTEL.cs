using Akka.Actor;
using Akka.Cluster.Tools.PublishSubscribe;
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
        var uniqueId = Guid.NewGuid();
        var listener = ActorRegistry.Get<DistributedPubSubMediator>();
        listener.Tell(new Subscribe(RootCoordinator.TopicName, expectResultsProbe));
        // Arrange root coordinator
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();

        ICoupledModel coupledModel = new Table();
        
        await rootCoordinatorActor.Ask(new Simulation.CreateModel(coupledModel,$"coordinator-table",uniqueId)
        {
        });
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(30),uniqueId));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));
        
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.InRange<int>(response.ElapsedTime, TimeUnit.Zero + TimeUnit.Delta, new TimeUnit(31));
    }
    
    [Fact]
    public async Task BaseBlinkingLightTest()
    {
        var expectResultsProbe = CreateTestProbe();
        var uniqueId = Guid.NewGuid();

        // Arrange root coordinator
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();
        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        var listener = ActorRegistry.Get<DistributedPubSubMediator>();
        listener.Tell(new Subscribe(RootCoordinator.TopicName, expectResultsProbe));
        
        await rootCoordinatorActor.Ask(new Simulation.CreateModel(model,$"coordinator-table",uniqueId)
        {
        });

        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(10),uniqueId));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.True(response.ElapsedTime <= new TimeUnit(11));
        Assert.True(response.ElapsedTime > TimeUnit.Zero);
    }


}