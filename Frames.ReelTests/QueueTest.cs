using Frames.ReelConnector;
using Frames.ReelConnector.ReelDto;

namespace Frames.Test2;

public class QueueTest
{
    
    [Fact]
    public void ExecuteQueueTest()
    {
        // Arrange
        ReelJson? reelJson = GetReelJson();
        if (reelJson == null)
        {
            throw new InvalidOperationException("Failed to parse reel JSON.");
        }
        
        
        Assert.NotNull(reelJson);
        
        var reelCoupledModel = new ReelCoupledModel(reelJson, "QueueSystem", "QueueSystem");
        
        Assert.NotNull(reelCoupledModel);
        
        // 3 proc, 1 gen, 1 queue
        Assert.Equal(5, reelCoupledModel.GetChildren().Count);

    }
    
    private static ReelJson? GetReelJson()
    {
        var file = "queue2.json";
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