using Frames.Model.ValueTypes;
using Frames.Tests.BlinkingLightBR;

namespace Frames.Tests.CoupledModelTest;

public class TestCoupling
{


    [Fact]
    public void TestGetReceivers()
    {
        // Any coupled model
        // Arrange
        var model = new CSuperArena();
        
        // Act
        var receiver = model.GetReceivers("simulator-bl3",BlinkingLightAtomicModelBR.PortOutFinished);
        
        // Assert
        Assert.Single(receiver);

    }
}