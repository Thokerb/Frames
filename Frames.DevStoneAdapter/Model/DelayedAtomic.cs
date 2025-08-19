using Frames.Model;
using Frames.Model.ValueTypes;

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
}

public class DelayedAtomic : AtomicModel<DelayedAtomicState>
{
    private int IntDelay { get; }
    private int ExtDelay { get; }
    private bool AddOutPort { get; }
    private int PrepTime { get; }

    public DelayedAtomic(int intDelay, int extDelay, bool addOutPort, int prepTime)
    {
        IntDelay = intDelay;
        ExtDelay = extDelay;
        AddOutPort = addOutPort;
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
            CSharpStone.RunDhrystoneV1(ExtDelay);
        }

        return new DelayedAtomicState()
        {
            ExtCount = state.ExtCount + 1,
            IntCount = state.IntCount,
            CurrentState = "active"
        };    
    }

    public override DelayedAtomicState InternalTransition(DelayedAtomicState state)
    {
        if (IntDelay > 0)
        {
            CSharpStone.RunDhrystoneV1(IntDelay);
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
        if (AddOutPort)
        {
            return new Bag((PortConstants.OutPort, 0));
        }
        return Bag.Empty;
    }
}