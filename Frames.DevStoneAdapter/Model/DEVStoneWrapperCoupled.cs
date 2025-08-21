using Frames.Model;
using Frames.Model.ValueTypes;

namespace Frames.DevStoneAdapter.Model;

/// <summary>
/// Base class for LI,
/// </summary>
public abstract class DEVStoneWrapperCoupled : CoupledModel
{
    protected int Depth { get; }
    protected int Width { get; }
    protected int IntDelay { get; }
    protected int ExtDelay { get; }
    protected bool AddAtomicOutPorts { get; }
    protected int PrepTime { get; }

    public DEVStoneWrapperCoupled(string name, int depth, int width, int intDelay, int extDelay, bool addAtomicOutPorts, int prepTime) : base(name)
    {
        Depth = depth;
        Width = width;
        IntDelay = intDelay;
        ExtDelay = extDelay;
        AddAtomicOutPorts = addAtomicOutPorts;
        PrepTime = prepTime;

        AddInPort(PortConstants.InPort);
        AddOutPort(PortConstants.OutPort);


        if (depth == 1)
        {
            // Add atomic model
            
            AddModel(new DelayedAtomic(IntDelay,ExtDelay, AddAtomicOutPorts, PrepTime)
            {
                Name = "atomic_0_0"
            });
            
            AddCouplingFromOutIn(PortConstants.InPort, "atomic_0_0", PortConstants.InPort);
            AddCouplingOut("atomic_0_0",PortConstants.OutPort,PortConstants.OutPort);
            
        }
        else
        {
            // Add {width} coupled models with {depth - 1}
            var coupled = GenerateCoupled();
            AddModel(coupled);
            
            AddCouplingFromOutIn(PortConstants.InPort, coupled.Name, PortConstants.InPort);
            AddCouplingOut(coupled.Name,PortConstants.OutPort,PortConstants.OutPort);
            
            for (int i = 0; i < width; i++)
            {
                var atomic = new DelayedAtomic(IntDelay, ExtDelay, AddAtomicOutPorts, PrepTime)
                {
                    Name = $"atomic_{Depth - 1}_{i}"
                };
                
                AddModel(atomic);
                
                // TODO: why is there no coupling here?
                
            }
        }
        
    }


    protected void AssertIsCoupled(IModel model)
    {
        var isCoupled = model is DEVStoneWrapperCoupled;
        if (!isCoupled)
        {
            throw new ArgumentException($"Model {model.Name} is not a coupled model.");
        }
    }
    
    protected void AssertIsAtomic(IModel model)
    {
        var isAtomic = model is DelayedAtomic;
        if (!isAtomic)
        {
            throw new ArgumentException($"Model {model.Name} is not an atomic model.");
        }
    }
    
    

    public abstract DEVStoneWrapperCoupled GenerateCoupled();
}