using System.Diagnostics;
using Akka.Actor;
using Akka.Cluster.Tools.PublishSubscribe;
using Akka.Hosting;
using Akka.Hosting.TestKit;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.PingPong;
using Frames.Tests.TestUtils;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.Interaction;

public class InteractionControlTest : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";

    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public InteractionControlTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    // long running test
    [Fact]
    public async Task BaseInteractionControlTest()
    {
        var expectResultsProbe = CreateTestProbe();
        var uniqueId = Guid.NewGuid();

        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();

        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        
        var blinkingLightActor = await rootCoordinatorActor.Ask(new Simulation.CreateModel(model,$"simulator-blinking-light", uniqueId)
        {
        });

        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(12), uniqueId));
        rootCoordinatorActor.Tell(new Simulation.SetSpeedControl(1000, uniqueId));
        var stopTime = new Stopwatch();
        stopTime.Start();
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));
        var listener = ActorRegistry.Get<DistributedPubSubMediator>();
        listener.Tell(new Subscribe(RootCoordinator.TopicName, expectResultsProbe));
        
        Thread.Sleep(3000);
        rootCoordinatorActor.Tell(new Simulation.PauseSimulation(uniqueId));
        Serilog.Log.Information($"Simulation stopped {stopTime.ElapsedMilliseconds} ms");
        Thread.Sleep(3000);
        Serilog.Log.Information($"Simulation resumed {stopTime.ElapsedMilliseconds} ms");
        rootCoordinatorActor.Tell(new Simulation.ResumeSimulation(uniqueId));
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(25));
        var response2 = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(25));
        stopTime.Stop();
        Assert.InRange(stopTime.ElapsedMilliseconds, 17 * 1000, 18 * 1000);
        Assert.InRange(response2.ElapsedTime.Value, new TimeUnit(14).Value, new TimeUnit(14).Value);
    }


}