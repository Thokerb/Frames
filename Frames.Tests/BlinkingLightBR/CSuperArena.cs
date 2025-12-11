using Frames.Model;

namespace Frames.Tests.BlinkingLightBR;

public class CSuperArena : Model.CoupledModel
{

    public CSuperArena() : base("csuperarena")
    {

    }

    protected override void Initialize()
    {
        AddModel<BlinkingLightAtomicModelBR, BlinkingLightStateBR>("bl3",
            new BlinkingLightStateBR
            {
                Name = "On",
                MaxCycles = 12
            });

        AddModel<CArena>("sub-arena");
        
        AddCoupling("bl3", BlinkingLightAtomicModelBR.PortOutFinished, "sub-arena", CArena.InArena);
        AddCoupling("sub-arena", CArena.OutArena, "bl3", BlinkingLightAtomicModelBR.PortInFinishedByOther);    }
}