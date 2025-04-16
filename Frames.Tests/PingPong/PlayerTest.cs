using Akka.Actor;
using Akka.TestKit.Xunit2;
using Frames.Engine;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.PingPong;

public class PlayerTest : TestKit
{
    private readonly TestKit _testKit;

    public PlayerTest(ITestOutputHelper output)
    {
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .MinimumLevel.Verbose()
            // exclude when message contains 'version : "0.0.1 Akka"'
            .Filter.ByExcluding(e => e.MessageTemplate.Text.Contains("version"))
            // enrich with bla
            .Enrich.WithProperty("Test", "PingPongTest")
            .WriteTo.TestOutput(output)
            .CreateLogger();
        
        
        var system = ActorSystem.Create("my-test-system", File.ReadAllText("logConfig.conf"));
        var testKit = new TestKit(system);
        _testKit = testKit;
        
    }
    
    
    [Fact]
    public async Task TestPlayerWhoWaitsForever()
    {
        // Arrange root coordinator
        var rootProps = Props.Create<Engine.RootCoordinator>();
        var rootCoordinatorActor = ActorOf(rootProps,"root-coordinator");
        
        IAtomicModelBase model = new Player();
        model.State = new PlayerState()
        {
            Name = "Send"
        };
        var playerProps = Props.Create<Simulator>(() => new Simulator(rootCoordinatorActor, model));
        
        var playerActor = ActorOf(playerProps,"simulator-player");
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(10)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(playerActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());
        
        // Assert
        // Act        
        // Assert that exception is thrown
        var response = await _testKit.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));
        Assert.Equivalent(response.ElapsedTime, TimeUnit.Infinity);
        
    }

    [Fact]
    public async Task TestExternalTransition()
    {
        IAtomicModelBase model = new Player();
        model.State = new PlayerState()
        {
            Name = "Waiting"
        };
        var playerProps = Props.Create<Simulator>(() => new Simulator(_testKit.TestActor, model));
        var playerActor = _testKit.ActorOf(playerProps,"simulator-player");

        // needs to be receive, because coupling transforms send to receive
        var input = new Bag(Player.Receive);
        
        playerActor.Tell(new ExecuteTransition.StartExecuteTransition(input, TimeUnit.Zero));
        
        var response = await _testKit.ExpectMsgAsync<ExecuteTransition.FinishedExecuteTransition>(TimeSpan.FromSeconds(3));
    }
    [Fact]
    public async Task TestInternalTransition()
    {
        IAtomicModelBase model = new Player();
        model.State = new PlayerState()
        {
            Name = "Waiting"
        };
        var playerProps = Props.Create<Simulator>(() => new Simulator(_testKit.TestActor, model));
        var playerActor = _testKit.ActorOf(playerProps,"simulator-player");

        // needs to be receive, because coupling transforms send to receive
        var input = Bag.Empty;
        
        playerActor.Tell(new ExecuteTransition.StartExecuteTransition(input, TimeUnit.Zero));
        
        var response = await _testKit.ExpectMsgAsync<ExecuteTransition.FinishedExecuteTransition>(TimeSpan.FromSeconds(3));
    }
}