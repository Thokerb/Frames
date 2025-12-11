using Frames.Model;
using Frames.Model.ValueTypes;
using Newtonsoft.Json;

namespace Frames.DevStoneAdapter.Model;

public class DelayedAtomicState : IState
{
    public required string CurrentState { get; set; } = "initial";
    public int IntCount { get; set; } = 0;
    public int ExtCount { get; set; } = 0;
    
    public int CompareTo(object? obj)
    {
        if (obj is not DelayedAtomicState other)
        {
            return 1; // or throw an exception
        }

        return string.Compare(CurrentState, other.CurrentState, StringComparison.Ordinal);
    }

    public override string ToString()
    {
        return $"State: {CurrentState}, IntCount: {IntCount}, ExtCount: {ExtCount}";
    }
}

public class DelayedAtomic : AtomicModel<DelayedAtomicState>
{
    [JsonProperty]
    private int IntDelay { get; }
    [JsonProperty]
    private int ExtDelay { get; }
    [JsonProperty]
    private bool AddOutPortElem { get; }
    [JsonProperty]
    private int PrepTime { get; }

    public DelayedAtomic(int intDelay, int extDelay, bool addOutPort, int prepTime)
    {
        IntDelay = intDelay;
        ExtDelay = extDelay;
        AddOutPortElem = addOutPort;
        PrepTime = prepTime;
        State = new DelayedAtomicState()
        {
            CurrentState = "initial"
        };
    }
    
    public override DelayedAtomicState State { get; set; }
    public override TimeUnit TimeAdvance(DelayedAtomicState state)
    {
        if (state.CurrentState == "active")
        {
            return new TimeUnit(PrepTime);
        }
        return TimeUnit.Infinity;
    }

    public override DelayedAtomicState ExternalTransition(DelayedAtomicState state, Bag bag)
    {
        if (ExtDelay > 0)
        {
            CSharpStone.RunDhrystone(ExtDelay);
        }

        return new DelayedAtomicState()
        {
            ExtCount = state.ExtCount + 1,
            IntCount = state.IntCount,
            CurrentState = "active"
        };    
    }

    public override DelayedAtomicState ConfluentTransition(DelayedAtomicState state, Bag bag)
    {
        // first internal then external, because then the model can go from active to passive and then back to active
        var afterInternal = InternalTransition(state);
        var afterExternal = ExternalTransition(afterInternal, bag);
        return afterExternal;
    }

    public override DelayedAtomicState InternalTransition(DelayedAtomicState state)
    {
        if (IntDelay > 0)
        {
            CSharpStone.RunDhrystone(IntDelay);
        }

        return new DelayedAtomicState()
        {
            IntCount = state.IntCount + 1,
            ExtCount = state.ExtCount,
            CurrentState = "passive"
        };
    }

    public override Bag Output(DelayedAtomicState state)
    {
        if (AddOutPortElem)
        {
            return new Bag((PortConstants.OutPort, 0));
        }
        return Bag.Empty;
    }
}