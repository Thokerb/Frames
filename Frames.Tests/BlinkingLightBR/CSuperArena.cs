using Frames.Model;

namespace Frames.Tests.BlinkingLightBR;

public class CSuperArena : CoupledModel
{

    public CSuperArena() : base("csuperarena")
    {
        AddModel<BlinkingLightAtomicModelBR, BlinkingLightStateBR>("bl3",
            new BlinkingLightStateBR
            {
                Name = "On",
                MaxCycles = 12
            });

        AddModel<CArena>("sub-arena");
        
        AddCoupling("bl3", BlinkingLightAtomicModelBR.PortOutFinished, "sub-arena", "in-arena");
        AddCoupling("sub-arena", "out-arena", "bl3", BlinkingLightAtomicModelBR.PortInFinishedByOther);
    }
    
}