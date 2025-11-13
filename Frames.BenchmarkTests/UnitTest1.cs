using Frames.DevStoneAdapter;
using Frames.DevStoneAdapter.Model;
using Frames.Engine.Messages;
using Newtonsoft.Json;

namespace Frames.BenchmarkTests;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {

        var result = CSharpStone.RunDhrystoneV1(100_000_000);
        
        Assert.True(result==0, "Dhrystone V1 should return a positive result");
    }

    public void TestSerializationHI()
    {
        var model = new Coupled_HI("name", 20, 20, 20, 20, true, 20);
        
        var msg = new Simulation.CreateModel(model, "test", Guid.NewGuid());
        
        // serialize and deserialize
        var serialize = JsonConvert.SerializeObject(msg, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto,
        });
        var modelDeserialized = JsonConvert.DeserializeObject<WithShardId>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });
        
        var model2 = JsonConvert.DeserializeObject<Coupled_HI>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });

        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
    public void TestSerializationHO()
    {
        var model = new Coupled_HO("name", 20, 20, 20, 20, true, 20);
        
        var msg = new Simulation.CreateModel(model, "test", Guid.NewGuid());
        
        // serialize and deserialize
        var serialize = JsonConvert.SerializeObject(msg, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto,
        });
        var modelDeserialized = JsonConvert.DeserializeObject<WithShardId>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });
        
        var model2 = JsonConvert.DeserializeObject<Coupled_HO>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });

        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
    public void TestSerializationLI()
    {
        var model = new Coupled_LI("name", 20, 20, 20, 20, true, 20);
        
        var msg = new Simulation.CreateModel(model, "test", Guid.NewGuid());
        
        // serialize and deserialize
        var serialize = JsonConvert.SerializeObject(msg, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto,
        });
        var modelDeserialized = JsonConvert.DeserializeObject<WithShardId>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });
        
        var model2 = JsonConvert.DeserializeObject<Coupled_LI>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });

        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
    public void TestSerializationHOmod()
    {
        var model = new Coupled_HOmod("name", 20, 20, 20, 20, true, 20);
        
        var msg = new Simulation.CreateModel(model, "test", Guid.NewGuid());
        
        // serialize and deserialize
        var serialize = JsonConvert.SerializeObject(msg, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto,
        });
        var modelDeserialized = JsonConvert.DeserializeObject<WithShardId>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });
        
        var model2 = JsonConvert.DeserializeObject<Coupled_HOmod>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });

        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
}