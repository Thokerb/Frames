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
        model.AddModel<BlinkingLightAtomicModelBR>("source");
        model.AddModel<BlinkingLightAtomicModelBR>("target");
        model.AddCoupling("source", "sourcePort", "target", "targetPort");
        
        // Act
        var receiver = model.GetReceivers("source","sourcePort");
        
        // Assert
        Assert.Single(receiver);

    }
}