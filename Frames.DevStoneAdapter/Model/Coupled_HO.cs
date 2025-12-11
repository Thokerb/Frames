namespace Frames.DevStoneAdapter.Model;

public class Coupled_HO : DEVStoneWrapperCoupled
{
    public Coupled_HO(string name, int depth, int width, int intDelay, int extDelay, bool addAtomicOutPorts,
        int prepTime) : base(name, depth, width, intDelay, extDelay, addAtomicOutPorts, prepTime)
    {

    }

    public override DEVStoneWrapperCoupled GenerateCoupled()
    {
        return new Coupled_HO($"Coupled_{Depth - 1}", Depth - 1, Width, IntDelay, ExtDelay, AddAtomicOutPorts,
            PrepTime);
    }

    protected override void Initialize()
    {
        BaseInitialize();
        var children = GetChildren();

        if (!(children.Count > 0))
        {
            throw new ArgumentException(
                $"children count must be greater than 0 in Coupled_HO, but was {children.Count}.");
        }

        if (children.First().Item2 is DEVStoneWrapperCoupled)
        {
            // if first child is a coupled model, add coupling from in port to first child
            AddCouplingFromOutIn(PortConstants.InPort, children.First().Item1, PortConstants.InPort2);
        }


        if (children.Count > 1)
        {
            // take last child as the atomic model
            var lastChild = children.Last();
            AssertIsAtomic(lastChild.Item2);
            AddCouplingFromOutIn(PortConstants.InPort2, lastChild.Item1, PortConstants.InPort);
            AddCouplingOut(lastChild.Item1, PortConstants.OutPort, PortConstants.OutPort2);
        }

        // take all children except the first and last one
        for (int i = 1; i < children.Count - 1; i++)
        {
            var child = children[i];
            var nextChild = children[i + 1];
            AssertIsAtomic(child.Item2);
            AssertIsAtomic(nextChild.Item2);
            AddCoupling(child.Item1, PortConstants.OutPort, nextChild.Item1, PortConstants.InPort);
            AddCouplingFromOutIn(PortConstants.InPort2, child.Item1, PortConstants.InPort);
            AddCouplingOut(child.Item1, PortConstants.OutPort, PortConstants.OutPort2);
        }
    }
}