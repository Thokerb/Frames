using Frames.ReelConnector;
using Frames.ReelConnector.ReelDto;

namespace Frames.Test2;

public class ReelArrayTest
{
    
    [Fact]
    public void ReadQueueTest()
    {
        // Arrange
        ReelJson? reelJson = GetReelJson();
        if (reelJson == null)
        {
            throw new InvalidOperationException("Failed to parse reel JSON.");
        }
        
        
        Assert.NotNull(reelJson);
    }
    
     
    [Fact]
    public void ReelAtomicModelInternalTransitionTest()
    {
        var reelJson = GetReelJson();

        var atomicModel = reelJson.AtomicModels.First(x => x.Name == "ArrayTest");
        var atomicModelState = reelJson.States.First(x => x.Name == atomicModel.StateRef);
        
        var reelAtomicModel = new ReelAtomicModel(atomicModel,atomicModelState)
        {
            Name = atomicModel.Name,
        };

        Assert.NotNull(reelAtomicModel);


        var test = reelAtomicModel.State.StateJson.Properties["test"].Value;
        var test2 = reelAtomicModel.State.StateJson.Properties["test2"].Value;
        var test3 = reelAtomicModel.State.StateJson.Properties["test3"].Value;
        
        
        var result = reelAtomicModel.InternalTransition(new ReelState()
        {
            CurrentState = "Idle",
            StateJson = reelAtomicModel.State.StateJson
        });
        
        Assert.NotNull(result);
        Assert.Equal(1, ((List<long>)result.StateJson.Properties["test"].Value).Count);
        Assert.Equal(4, ((List<long>)result.StateJson.Properties["test2"].Value).Count);
        Assert.Equal(2, ((List<string>)result.StateJson.Properties["test3"].Value).Count);
        
      
        var result2 = reelAtomicModel.InternalTransition(new ReelState()
        {
            CurrentState = "Idle",
            StateJson = result.StateJson
        });
        
        Assert.NotNull(result2);
        Assert.Equal(2, ((List<long>)result2.StateJson.Properties["test"].Value).Count);
        Assert.Equal(5, ((List<long>)result2.StateJson.Properties["test2"].Value).Count);
        Assert.Equal(3, ((List<string>)result2.StateJson.Properties["test3"].Value).Count);
              
        var result3 = reelAtomicModel.InternalTransition(new ReelState()
        {
            CurrentState = "Idle",
            StateJson = result2.StateJson
        });
        
        Assert.NotNull(result2);
        Assert.Equal(1, ((List<long>)result3.StateJson.Properties["test"].Value).Count);
        Assert.Equal(6, ((List<long>)result3.StateJson.Properties["test2"].Value).Count);
        Assert.Equal(4, ((List<string>)result3.StateJson.Properties["test3"].Value).Count);
        
              

    }
    
    
    private static ReelJson? GetReelJson()
    {
        var file = "queue.json";
        var filePath = Path.Combine(AppContext.BaseDirectory, "Data", file);
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"The reel file '{file}' does not exist at path: {filePath}");
        }
        var reelContent = File.ReadAllText(filePath);
        reelContent = reelContent.Replace(".", "SEP");
        // Deparse with Newtonsoft.Json
        
        // Act
        // We use Newtonsoft.Json here because akka.net uses Newtonsoft.Json for serialization
        ReelJson? reelJson = Newtonsoft.Json.JsonConvert.DeserializeObject<ReelJson>(reelContent);
        return reelJson;
    }


}