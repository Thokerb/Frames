using Frames.Model;
using Frames.Model.ValueTypes;

namespace Frames.Museum.BlinkingLightBRTest;

public class CArena : CoupledModel
{
    public static  readonly Port OutArena = new Port("out-arena");
    public static  readonly Port InArena = new Port("in-arena");

    public CArena() : base("CArena")
    {
        AddModel<BlinkingLightAtomicModelBR, BlinkingLightStateBR>("bl1",
            new BlinkingLightStateBR
            {
                Name = "On",
                MaxCycles = 5,
                WaitingTime = 3
            });
        AddModel<BlinkingLightAtomicModelBR, BlinkingLightStateBR>("bl2",
            new BlinkingLightStateBR
            {
                Name = "On",
                MaxCycles = 20,
                WaitingTime = 5
            });
        
        AddCoupling("bl1", BlinkingLightAtomicModelBR.PortOutFinished, "bl2", BlinkingLightAtomicModelBR.PortInFinishedByOther);
        AddCoupling("bl2", BlinkingLightAtomicModelBR.PortOutFinished, "bl1", BlinkingLightAtomicModelBR.PortInFinishedByOther);
        
        // AddCoupling(this.Name, "in-arena", "bl1", BlinkingLightAtomicModelBR.PortInFinishedByOther);
        // AddCoupling(this.Name,"in-arena", "bl2", BlinkingLightAtomicModelBR.PortInFinishedByOther);
        
        // TODO: is this required or automatically done by the framework?
        AddCouplingOut("bl1", BlinkingLightAtomicModelBR.PortOutFinished, OutArena);
        AddCouplingOut("bl2", BlinkingLightAtomicModelBR.PortOutFinished, OutArena);
        
        // TODO: is this required or automatically done by the framework?
        AddCouplingFromOutIn( InArena, "bl1",BlinkingLightAtomicModelBR.PortInFinishedByOther);
        AddCouplingFromOutIn( InArena, "bl2", BlinkingLightAtomicModelBR.PortInFinishedByOther);
    }

}