using System.Diagnostics;
using Frames.Engine.Messages;
using Frames.Engine.Monitoring;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Museum.Benchmark.Model;
using Frames.Museum.BlinkingLightBRTest;
using Newtonsoft.Json;
using OpenTelemetry;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Xunit;

namespace Frames.Test2;

public class SerializationTest
{
    [Fact]
    public void TestSerialization()
    {
        // Arrange
        ICoupledModel arena = new CArena();

        // Act
        JsonConvert.SerializeObject(arena, new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Error // or Ignore
        });

        // Assert
        Assert.True(true);
    }   
    
    [Fact]
    public void TestSerialization2()
    {
        var model = new BlinkingLightAtomicModelBR()
        {
            Name = "Test",
            State = new BlinkingLightStateBR()
            {
                CurrentCycle = 2,
                MaxCycles = 2,
                Name = "On",
                WaitingTime = 2
            },
            HasStopCondition = true,
        };
        
        // Act
        JsonConvert.SerializeObject(new BlinkingLightAtomicModelBR(){Name = ""}, new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Error // or Ignore
        });

        // Assert
        Assert.True(true);
    }  
    [Fact]
    public void TestSerialization3()
    {
        // Act
        JsonConvert.SerializeObject(new BlinkingLightStateBR(), new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Error // or Ignore
        });

        // Assert
        Assert.True(true);
    }    
    
    /// <summary>
    /// Test only works when Jaeger is running on localhost:4317
    /// </summary>
    [Fact]
    public void TestSerialization4()
    {
        var instrumentation = new Instrumentation();

        Sdk.CreateTracerProviderBuilder()
            .SetResourceBuilder(ResourceBuilder
                .CreateDefault()
                .AddService("Frames")
            )
            // .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(TracerName))
            .AddSource(instrumentation.ActivitySource.Name)
            .AddConsoleExporter()
            .AddOtlpExporter(options =>
            {
                options.Endpoint = new Uri("http://localhost:4317");
                options.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.Grpc;
            })
            .Build();
        
        var x = instrumentation.ActivitySource.StartActivity("TestActivity", ActivityKind.Internal);
        
        // Act
        var result = JsonConvert.SerializeObject(new EngineMessages.StartInitialization(new TimeUnit(3), x)
        {
            ShardId = "2",
            EntityName = "w",
            RunId = Guid.NewGuid()
        }, new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Error // or Ignore
        });
        
        var deserialized = JsonConvert.DeserializeObject<EngineMessages.StartInitialization>(result, new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Error // or Ignore
        });
        

        // Assert
        Assert.NotEqual(deserialized.TraceId.ToString(), new ActivityTraceId().ToString());
    }

    [Fact]
    public void TestSerialization5()
    {
        int numberInactive = 20;
        int numberActive = 20;
        var stepSize = 10;
        var model = new CoupledBenchmarkModel("root2", numberInactive, numberActive,stepSize, true);
        Assert.Equal((numberActive + numberInactive) / stepSize, model.GetChildren().Count());
        
        // serialize and deserialize
        var serialize = JsonConvert.SerializeObject(model, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects
        });
        var modelDeserialized = JsonConvert.DeserializeObject<CoupledBenchmarkModel>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects
        });
        Assert.Equal((numberActive + numberInactive) / stepSize, modelDeserialized.GetChildren().Count());
    }
    
    [Fact]
    public void TestSerialization6()
    {
        var model = new CoupledBenchmarkModel("root2", 20, 20,10, true);

        var msg = new Simulation.CreateModel(model, "test", Guid.NewGuid());
        
        // serialize and deserialize
        var serialize = JsonConvert.SerializeObject(msg, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.All
        });
        var modelDeserialized = JsonConvert.DeserializeObject<IShardSeperation>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.All
        });
        Assert.Equal(modelDeserialized.ShardId, msg.ShardId);
    }    
    [Fact]
    public void TestSerializationSize()
    {
        // Akka.Remote.OversizedPayloadException  max allowed size 128000 bytes, actual size of encoded Frames.Engine.Messages.Simulation+CreateModel was 177351 bytes.
        /*
         * {
              "numberNodes": 200,
              "percentageActive": 0.5,
              "timeUnits": 400
            }
         */

        
        var model = new CoupledBenchmarkModel("root2", 1000, 1000, 10,true);

        var msg = new Simulation.CreateModel(model, "test", Guid.NewGuid());
        
        // serialize and deserialize
        var serialize = JsonConvert.SerializeObject(msg, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
        });
        var modelDeserialized = JsonConvert.DeserializeObject<IShardSeperation>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects
        });
        

        Assert.InRange( System.Text.Encoding.Unicode.GetByteCount(serialize) ,0, 1128000);
    }    
    
    [Fact]
    public void TestSerializationTimeUnit()
    {
        // Akka.Remote.OversizedPayloadException  max allowed size 128000 bytes, actual size of encoded Frames.Engine.Messages.Simulation+CreateModel was 177351 bytes.
        /*
         * {
              "numberNodes": 200,
              "percentageActive": 0.5,
              "timeUnits": 400
            }
         */


        var model = new TimeUnit(222);

        
        // serialize and deserialize
        var serialize = JsonConvert.SerializeObject(model, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto,
        });
        var modelDeserialized = JsonConvert.DeserializeObject<TimeUnit>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });
        

        Assert.Equal(modelDeserialized.Value,model.Value);
    }
}

