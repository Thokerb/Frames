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

        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();

        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "simulator-blinking-light",
        };
        
        var blinkingLightActor = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(model,"simulator-blinking-light")
        {
            ShardId = "1"
        });
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(10)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(blinkingLightActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(),expectResultsProbe);
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.InRange(response.ElapsedTime.Value, new TimeUnit(11).Value, new TimeUnit(11).Value);
    }


}