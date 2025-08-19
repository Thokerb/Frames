namespace Frames.DevStoneAdapter.Model;

// ReSharper disable once InconsistentNaming
public class Coupled_LI : DEVStoneWrapperCoupled
{
    public Coupled_LI(string name, int depth, int width, int intDelay, int extDelay, bool addAtomicOutPorts, int prepTime) : base(name, depth, width, intDelay, extDelay, addAtomicOutPorts, prepTime)
    {

        // TODO: why assert in devstone pythonpdevs ?
        foreach (var child in GetChildren().Where(x => x.Item2 is DelayedAtomic))
        {
            AddCouplingFromOutIn(PortConstants.InPort, child.Item1, PortConstants.InPort);
        }
        
        
    }

    public override DEVStoneWrapperCoupled GenerateCoupled()
    {
        return new Coupled_LI($"Coupled_{this.Depth}", Depth - 1, Width, IntDelay, ExtDelay, AddAtomicOutPorts, PrepTime);
    }
}