using Akka.Actor;
using Akka.Cluster.Tools.PublishSubscribe;
using Akka.Event;
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

public class PingPongTest : BaseTestKit,  IClassFixture<OpenTelemetryFixture>
{
    private readonly OpenTelemetryFixture _openTelemetryFixture;

    public PingPongTest(ITestOutputHelper output, OpenTelemetryFixture openTelemetryFixture)
    {
        _openTelemetryFixture = openTelemetryFixture;
        Serilog.Log.Logger = new LoggerConfiguration()
            // add the xunit test output sink to the serilog logger
            // https://github.com/trbenning/serilog-sinks-xunit#serilog-sinks-xunit
            .MinimumLevel.Information()
            // exclude when message contains 'version : "0.0.1 Akka"'
            .Filter.ByExcluding(e => e.MessageTemplate.Text.Contains("version"))
            // enrich with bla
            // .Enrich.WithProperty("TestName", "PingPongTest")
            .WriteTo.TestOutput(output)
            .CreateLogger();
        
    }

    [Fact]
    public async Task CreateTable()
    {
        var expectResultsProbe = CreateTestProbe();
        var uniqueId = Guid.NewGuid();

        // Arrange root coordinator
        var serviceProviderMock = ServiceProviderMock.CreateMock(_openTelemetryFixture.Instrumentation);
        var rootProps = Props.Create<Engine.RootCoordinator>(() => new Engine.RootCoordinator("persist",serviceProviderMock));
        var rootCoordinatorActor = ActorRegistry.Get<RootCoordinator>();
        var listener = ActorRegistry.Get<DistributedPubSubMediator>();
        listener.Tell(new Subscribe(RootCoordinator.TopicName, expectResultsProbe));
        
        ICoupledModel coupledModel = new Table();
        
        await rootCoordinatorActor.Ask(new Simulation.CreateModel(coupledModel,$"coordinator-table",uniqueId)
        {
        });
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(30),uniqueId));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));
        
        
        // Assert
        var response = await expectResultsProbe.ExpectMsgAsync<Simulation.IsCompleted>(TimeSpan.FromSeconds(3));

        Assert.True(response.ElapsedTime <= new TimeUnit(31));
        Assert.True(response.ElapsedTime > TimeUnit.Zero);
    }


}