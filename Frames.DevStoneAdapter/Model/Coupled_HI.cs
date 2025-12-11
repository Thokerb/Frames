namespace Frames.DevStoneAdapter.Model;

public class Coupled_HI : DEVStoneWrapperCoupled
{
    public Coupled_HI(string name, int depth, int width, int intDelay, int extDelay, bool addAtomicOutPorts,
        int prepTime) : base(name, depth, width, intDelay, extDelay, addAtomicOutPorts, prepTime)
    {

    }

    public override DEVStoneWrapperCoupled GenerateCoupled()
    {
        return new Coupled_HI($"Coupled_{Depth - 1}", Depth - 1, Width, IntDelay, ExtDelay, AddAtomicOutPorts,
            PrepTime);
    }

    protected override void Initialize()
    {
        BaseInitialize();
        var children = GetChildren();

        if (children.Count > 1)
        {
            // take last child as the atomic model
            var lastChild = children.Last();
            AssertIsAtomic(lastChild.Item2);
            AddCouplingFromOutIn(PortConstants.InPort, lastChild.Item1, PortConstants.InPort);
        }


        // take all children except the first and last one
        for (int i = 1; i < children.Count - 1; i++)
        {
            var child = children[i];
            var nextChild = children[i + 1];
            AssertIsAtomic(child.Item2);
            AssertIsAtomic(nextChild.Item2);
            AddCoupling(child.Item1, PortConstants.OutPort, nextChild.Item1, PortConstants.InPort);
            AddCouplingFromOutIn(PortConstants.InPort, child.Item1, PortConstants.InPort);
        }    }
}