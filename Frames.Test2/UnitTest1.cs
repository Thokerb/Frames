using Frames.Model;
using Frames.Museum.BlinkingLightBRTest;
using Newtonsoft.Json;
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
        var json = JsonConvert.SerializeObject(arena, new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Error // or Ignore
        });
        JsonConvert.SerializeObject(new BlinkingLightAtomicModelBR(){Name = ""}, new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Error // or Ignore
        });JsonConvert.SerializeObject(new BlinkingLightStateBR(), new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Error // or Ignore
        });

        // Assert
        Assert.NotNull(json);
    }
}