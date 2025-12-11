using Frames.Model;
using Newtonsoft.Json;

namespace Frames.DevStoneAdapter.Model;

/// <summary>
/// Base class for LI,
/// </summary>
public abstract class DEVStoneWrapperCoupled : CoupledModel
{
    [JsonProperty]
    protected int Depth { get; }
    [JsonProperty]
    protected int Width { get; }
    [JsonProperty]
    protected int IntDelay { get; }
    [JsonProperty]
    protected int ExtDelay { get; }
    [JsonProperty]
    protected bool AddAtomicOutPorts { get; }
    [JsonProperty]
    protected int PrepTime { get; }

    public DEVStoneWrapperCoupled(string name, int depth, int width, int intDelay, int extDelay, bool addAtomicOutPorts, int prepTime) : base(name)
    {
        Depth = depth;
        Width = width;
        IntDelay = intDelay;
        ExtDelay = extDelay;
        AddAtomicOutPorts = addAtomicOutPorts;
        PrepTime = prepTime;

        
        
    }

    protected void BaseInitialize()
    {
        AddInPort(PortConstants.InPort);
        AddOutPort(PortConstants.OutPort);

        if (Depth == 0)
        {
            throw new Exception("should not be possible -> serialize error?");
        }

        if (Depth == 1)
        {
            // Add atomic model
            
            AddModel(new DelayedAtomic(IntDelay,ExtDelay, AddAtomicOutPorts, PrepTime)
            {
                Name = "atomic_0_0",
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
            
            for (int i = 0; i < Width; i++)
            {
                var atomic = new DelayedAtomic(IntDelay, ExtDelay, AddAtomicOutPorts, PrepTime)
                {
                    Name = $"atomic_{Depth - 1}_{i}",
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