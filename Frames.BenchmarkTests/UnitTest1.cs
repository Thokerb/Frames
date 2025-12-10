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
    
    [Fact]
    public void TestSerializationHI()
    {
        var model = new Coupled_HI("name", 1500, 1500, 20, 20, true, 20);
        
        var msg = new Simulation.CreateModel(model, "test", Guid.NewGuid());
        
        JsonConvert.DefaultSettings = () => new JsonSerializerSettings
        {
            TypeNameHandling = TypeNameHandling.Objects,
            MaxDepth = 3000,
        };
        
        // serialize and deserialize
        var serialize = JsonConvert.SerializeObject(msg, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
            MaxDepth = 3000,
            
        });
        var modelDeserialized = JsonConvert.DeserializeObject<IShardSeperation>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
            MaxDepth = 3000 // this doesnt work for some reasons ?
        });
        var model2 = JsonConvert.DeserializeObject<Simulation.CreateModel>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
        }).Model as Coupled_HI;

        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
    
    [Fact]
    public void TestSerializationHO()
    {
        var model = new Coupled_HO("name", 20, 20, 20, 20, true, 20);
        
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
        
        var model2 = JsonConvert.DeserializeObject<Simulation.CreateModel>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
        }).Model as Coupled_HO;

        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
    
    
    [Fact]
    public void TestSerializationLI()
    {
        var model = new Coupled_LI("name", 20, 20, 20, 20, true, 20);
        
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
        
        var model2 = JsonConvert.DeserializeObject<Simulation.CreateModel>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
        }).Model as Coupled_LI;

        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
    
    
    [Fact]
    public void TestSerializationHOmod()
    {
        var model = new Coupled_HOmod("name", 20, 20, 20, 20, true, 20);
        
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
        
        
        var model2 = JsonConvert.DeserializeObject<Simulation.CreateModel>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
        }).Model as Coupled_HOmod;

        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
}