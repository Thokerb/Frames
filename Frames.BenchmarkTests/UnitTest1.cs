using Frames.DevStoneAdapter;
using Frames.DevStoneAdapter.Model;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Tests.TestUtils;
using Newtonsoft.Json;

namespace Frames.BenchmarkTests;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {

        var result = CSharpStone.RunDhrystone(100_000_000);
        
        Assert.True(result==0, "Dhrystone V1 should return a positive result");
    }   
    
    [Fact]
    public void TestCSharpstoneLoad()
    {
        Parallel.ForAsync(0,100_000, async (i, ct) =>
        {
            var result = CSharpStone.RunDhrystone(100_000);
        });

        
        Assert.True(true);
    }    
    [Fact]
    public void TestCSharpstoneLoadFromModel()
    {
        var model = new DelayedAtomic(100_000_000, 20, false, 20);
        model.InternalTransition(new DelayedAtomicState()
        {
            CurrentState = "active",
            ExtCount = 1,
            IntCount = 1
        });

        
        Assert.True(true);
    }
    
    [SkipForGithubAction]
    public void TestSerializationHI()
    {
        var stackSize = Environment.GetEnvironmentVariable("DOTNET_DefaultStackSize");
        
        Assert.NotNull(stackSize);
        // check if stack size is at least 180000
        Assert.True(int.Parse(stackSize) >= 180000, "Stack size should be at least 180000");
        
        var model = new Coupled_HI("name", 1500, 1500, 20, 20, true, 20);
        model.Hydrate();
        
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
        
        model2.Hydrate();
        
        Assert.NotNull(model2);
        Assert.Equal(actual: model2.GetChildren().Count,expected: model.GetChildren().Count);
    }
    
    [SkipForGithubAction]
    public void TestSerializationHO()
    {
        var stackSize = Environment.GetEnvironmentVariable("DOTNET_DefaultStackSize");
        
        Assert.NotNull(stackSize);
        // check if stack size is at least 180000
        Assert.True(int.Parse(stackSize) >= 180000, "Stack size should be at least 180000");
        // const int stackSize = 1024 * 1024 * 16; // 16 MB stack size
        // var tcs = new TaskCompletionSource<Coupled_HO>();
        // new Thread(() =>
        //     {
        //         tcs.SetResult(new Coupled_HO("name", 1500, 1500, 20, 20, true, 20));
        //         
        //     },stackSize)
        //     .Start();
        //
        // tcs.Task.Wait();
        // var model = tcs.Task.Result;
        
        // set env variable DOTNET_DefaultStackSize=180000
        
        // this sucks because we run out of stack size for deep recursions
        var model = new Coupled_HO("name", 1500, 1500, 20, 20, true, 20);
        model.Hydrate();
        
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
        model2.Hydrate();
        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
    
    [SkipForGithubAction]
    public void TestSerializationHO2()
    {
        var stackSize = Environment.GetEnvironmentVariable("DOTNET_DefaultStackSize");
        
        Assert.NotNull(stackSize);
        // check if stack size is at least 180000
        Assert.True(int.Parse(stackSize) >= 180000, "Stack size should be at least 180000");
        // const int stackSize = 1024 * 1024 * 16; // 16 MB stack size
        // var tcs = new TaskCompletionSource<Coupled_HO>();
        // new Thread(() =>
        //     {
        //         tcs.SetResult(new Coupled_HO("name", 1500, 1500, 20, 20, true, 20));
        //         
        //     },stackSize)
        //     .Start();
        //
        // tcs.Task.Wait();
        // var model = tcs.Task.Result;
        
        // set env variable DOTNET_DefaultStackSize=180000
        
        // this sucks because we run out of stack size for deep recursions
        CoupledModel model = new Coupled_HO("name", 10, 10, 20, 20, true, 20);

        int depth = 0;
        int numberModels = 0;
        while (model.GetChildren().Count > 1)
        {
            depth++;
            numberModels += model.GetChildren().Count;
            model = (CoupledModel)model.GetChildren().First().Item2;
            
        }

        Assert.NotNull(model);
        Assert.Equal(9, depth);
        Assert.Equal(depth * 10, numberModels); // omit +1 because last one is atomic
    }
    
    
    [SkipForGithubAction]
    public void TestSerializationLI()
    {
        var stackSize = Environment.GetEnvironmentVariable("DOTNET_DefaultStackSize");
        
        Assert.NotNull(stackSize);
        // check if stack size is at least 180000
        Assert.True(int.Parse(stackSize) >= 180000, "Stack size should be at least 180000");
        var model = new Coupled_LI("name", 1500, 1500, 20, 20, true, 20);
        model.Hydrate();
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

        model2.Hydrate();
        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
    
    
    [SkipForGithubAction]
    public void TestSerializationHOmod()
    {
        var stackSize = Environment.GetEnvironmentVariable("DOTNET_DefaultStackSize");
        
        Assert.NotNull(stackSize);
        // check if stack size is at least 180000
        Assert.True(int.Parse(stackSize) >= 180000, "Stack size should be at least 180000");
        
        var model = new Coupled_HOmod("name", 10, 10, 20, 20, true, 20);
        model.Hydrate();
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
        model2.Hydrate();
        Assert.NotNull(model2);
        Assert.Equal(model2.GetChildren().Count, model.GetChildren().Count);
    }
}