using Frames.Tests.BlinkingLightBR;
using Newtonsoft.Json;

public class SerializationTest
{
    [Fact]
    public void TestSerialization()
    {
        // Arrange
        var arena = new CArena();
        
        // Act
        var json = JsonConvert.SerializeObject(arena, new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Error // or Ignore
        });
        
        // Assert
        Assert.NotNull(json);
        
    }
}