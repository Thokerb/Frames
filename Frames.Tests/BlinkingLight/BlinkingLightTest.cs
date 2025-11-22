using Akka.Actor;
using Akka.Cluster.Tools.PublishSubscribe;
using Akka.Hosting;
using Akka.Hosting.TestKit;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Museum.Actors;
using Frames.Tests.PingPong;
using Frames.Tests.TestUtils;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Xunit.Abstractions;

namespace Frames.Tests.BlinkingLight;

public class BlinkingLightTest : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";

    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public BlinkingLightTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    [Fact]
    public async Task BaseBlinkingLightTest()
    {
        var expectResultsProbe = CreateTestProbe();

        var uniqueId = Guid.NewGuid();
        
        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();
        var listener = ActorRegistry.Get<DistributedPubSubMediator>();
        listener.Tell(new Subscribe(RootCoordinator.TopicName, expectResultsProbe));

        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "simulator-blinking-light",
        };
        
        var blinkingLightActor = await rootCoordinatorActor.Ask(new Simulation.CreateModel(model,"simulator-blinking-light",uniqueId)
        {
        });
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(10),uniqueId));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));
        
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(7));

        Assert.InRange(response.ElapsedTime.Value, new TimeUnit(11).Value, new TimeUnit(11).Value);
    }


}