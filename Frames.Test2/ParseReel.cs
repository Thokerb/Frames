using Frames.ReelConnector.ReelDto;

namespace Frames.Test2;

public class ParseReel
{
    
    [Theory]
    [InlineData("arena2.json")]
    [InlineData("blinking_light.json")]
    [InlineData("blinking_light_arena.json")]
    public void ParseReelFile(string file)
    {
        // Arrange
        var filePath = Path.Combine(AppContext.BaseDirectory, "Data", file);
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"The reel file '{file}' does not exist at path: {filePath}");
        }
        var reelContent = File.ReadAllText(filePath);
        // Deparse with Newtonsoft.Json
        
        // Act
        // We use Newtonsoft.Json here because akka.net uses Newtonsoft.Json for serialization
        ReelJson? reelJson = Newtonsoft.Json.JsonConvert.DeserializeObject<ReelJson>(reelContent);
        
        
        // Assert
        Assert.NotNull(reelJson);
    }
}