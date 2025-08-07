using Frames.ReelConnector;
using Frames.ReelConnector.ReelDto;

namespace Frames.Test2;

public class ReelCoupledModelTest
{
    
    private ReelJson ReadReelJsonFromFile()
    {
        var file = "arena2.json";
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
        
        if (reelJson == null)
        {
            throw new InvalidOperationException("Failed to deserialize ReelJson from the file.");
        }
        
        return reelJson;
    }
    
    
    [Theory]
    [InlineData("BlinkingLightArena2")]
    [InlineData("CArena")]
    public void ReelCoupledModel_Creation_Success(string modelName)
    {
        // Arrange
        var reelJson = ReadReelJsonFromFile();
        
        // Act
        var reelCoupledModel = new ReelCoupledModel(reelJson, modelName, null);
        
        // Assert
        Assert.NotNull(reelCoupledModel);
    }
}