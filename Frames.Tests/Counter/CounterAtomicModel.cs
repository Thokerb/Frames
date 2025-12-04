using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Tests.BlinkingLight;

namespace Frames.Tests.Counter;

public record CounterState : IState
{
    public int Count { get; set; } = 0;
    public int CompareTo(object? obj)
    {
        if (obj is CounterState other)
        {
            return Count.CompareTo(other.Count);
        }
        throw new ArgumentException("Object is not a CounterState");
    }
}

public class CounterAtomicModel : AtomicModel<CounterState>
{
    public static readonly Port InPort = new Port("In");
    public override CounterState State { get; set; }  = new CounterState();
    public override TimeUnit TimeAdvance(CounterState state)
    {
        return TimeUnit.Infinity;
    }

    public override CounterState ExternalTransition(CounterState state, Bag bag)
    {
        if(bag.ContainsKey(InPort))
        {
            if (bag.GetInput(InPort).Count != 1)
            {
                throw new ArgumentException("Expected exactly one input value on InPort");
            }
            var value = bag.GetInput(InPort)?.First();
            if (value is int intValue)
            {
                state.Count += intValue;
            }
        }

        return state;
    }

    public override CounterState InternalTransition(CounterState state)
    {
        return state;
    }

    public override Bag Output(CounterState state)
    {
        return Bag.Empty;
    }
}