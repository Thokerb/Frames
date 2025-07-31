using System.Diagnostics;
using Akka.Actor;
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

namespace Frames.Tests.SpeedControl;

public class SpeedControlTest : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
{
    public static readonly Akka.Configuration.Config Config = "akka.loglevel=DEBUG";

    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public SpeedControlTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .WriteTo.TestOutput(output)
            .CreateLogger();
    }
    
    [Fact]
    public async Task BaseSpeedControlTest()
    {
        var expectResultsProbe = CreateTestProbe();

        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var props = Props.Create<RootCoordinator>(() => new RootCoordinator(serviceProviderMock));
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();

        IAtomicModelBase model = new BlinkingLight.BlinkingLightAtomicModel()
        {
            Name = "blinking-light",
        };
        
        var blinkingLightActor = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(model,$"simulator-blinking-light")
        {
            ShardId = "1"
        });

        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(12)));
        rootCoordinatorActor.Tell(new Simulation.SetSpeedControl(1000));
        var watch = Stopwatch.StartNew();
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(blinkingLightActor));
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(),expectResultsProbe);
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(15));
        watch.Stop();
        var duration = watch.ElapsedMilliseconds;
        Assert.InRange(response.ElapsedTime.Value, new TimeUnit(14).Value, new TimeUnit(14).Value);
        Serilog.Log.Information("Elapsed time: {ElapsedTime}", response.ElapsedTime.Value);
        Assert.InRange(duration, 14* 1000, 15* 1000);
    }


}