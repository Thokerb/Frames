using System.Diagnostics;
using Akka.Actor;
using Akka.Hosting;
using Akka.Hosting.TestKit;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.TestUtils;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.PingPong;

public class PlayerTest : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
{
    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public PlayerTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .MinimumLevel.Verbose()
            // exclude when message contains 'version : "0.0.1 Akka"'
            .Filter.ByExcluding(e => e.MessageTemplate.Text.Contains("version"))
            // enrich with bla

            .WriteTo.TestOutput(output)
            .CreateLogger();
        
    }
    
    
    [Fact]
    public async Task TestPlayerWhoWaitsForever()
    {
        var expectResultsProbe = CreateTestProbe();

        // Arrange root coordinator
        var uniqueId = Guid.NewGuid();
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();
        IAtomicModelBase model = new Player()
        {
            Name = "Player"
        };
        model.StateInternal = new PlayerState()
        {
            Name = "Send"
        };

        var playerActor  = await rootCoordinatorActor.Ask(new Simulation.CreateModel(model,$"coordinator-table",uniqueId)
        {
        });
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(10),uniqueId));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(uniqueId),expectResultsProbe);
        
        // Assert
        // Act        
        // Assert that exception is thrown
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));
        Assert.Equivalent(response.ElapsedTime, TimeUnit.Infinity);
        
    }

}