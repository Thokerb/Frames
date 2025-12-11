using Frames.Model;

namespace Frames.Museum.BlinkingLightBRTest;

public class CSuperArena2 : CoupledModel
{

    public CSuperArena2() : base("csuperarena")
    {

    }

    protected override void Initialize()
    {
        AddModel<BlinkingLightAtomicModelBR, BlinkingLightStateBR>("bl3",
            new BlinkingLightStateBR
            {
                Name = "On",
                MaxCycles = 3 // faster than in CArena
            });

        AddModel<CArena>("sub-arena");
        
        AddCoupling("bl3", BlinkingLightAtomicModelBR.PortOutFinished, "sub-arena", CArena.InArena);
        AddCoupling("sub-arena", CArena.OutArena, "bl3", BlinkingLightAtomicModelBR.PortInFinishedByOther);
        
    }
}