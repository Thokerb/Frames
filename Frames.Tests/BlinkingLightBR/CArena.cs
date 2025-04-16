using Frames.Model;

namespace Frames.Tests.BlinkingLightBR;

public class CArena : CoupledModel
{

    public CArena() : base("CArena")
    {
        AddModel<BlinkingLightAtomicModelBR, BlinkingLightStateBR>("bl1",
            new BlinkingLightStateBR
            {
                Name = "On",
                MaxCycles = 5
            });
        AddModel<BlinkingLightAtomicModelBR, BlinkingLightStateBR>("bl2",
            new BlinkingLightStateBR
            {
                Name = "On",
                MaxCycles = 20
            });
        
        AddCoupling("bl1", BlinkingLightAtomicModelBR.PortOutFinished, "bl2", BlinkingLightAtomicModelBR.PortInFinishedByOther);
        AddCoupling("bl2", BlinkingLightAtomicModelBR.PortOutFinished, "bl1", BlinkingLightAtomicModelBR.PortInFinishedByOther);
        
        // AddCoupling(this.Name, "in-arena", "bl1", BlinkingLightAtomicModelBR.PortInFinishedByOther);
        // AddCoupling(this.Name,"in-arena", "bl2", BlinkingLightAtomicModelBR.PortInFinishedByOther);
        
        // TODO: is this required or automatically done by the framework?
        // AddCoupling("bl1", BlinkingLightAtomicModelBR.PortOutFinished, "CArena", "out-arena");
        // AddCoupling("bl2", BlinkingLightAtomicModelBR.PortOutFinished, "CArena", "out-arena");
    }
    
}