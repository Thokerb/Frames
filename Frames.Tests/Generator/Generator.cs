using Frames.Model;
using Frames.Model.ValueTypes;

namespace Frames.Tests.Generator;

public record GeneratorState : IState
{
    public bool State { get; set; } = false;
    public int CompareTo(object? obj)
    {
        if (obj is GeneratorState other)
        {
            return State.CompareTo(other.State);
        }
        throw new ArgumentException("Object is not a GeneratorState");
    }
}

public class Generator : AtomicModel<GeneratorState>
{
    
    public static readonly Port OutputPort = new Port("Output");
    
    public override GeneratorState StateBr { get; set; } = new GeneratorState()
    {
        State = true
    };
    public override TimeUnit TimeAdvance(GeneratorState state)
    {
        if (state.State)
        {
            return TimeUnit.Delta;
        }
        else
        {
            return TimeUnit.Infinity;
        }
    }

    public override GeneratorState ExternalTransition(GeneratorState state, Bag bag)
    {
        return state;
    }

    public override GeneratorState InternalTransition(GeneratorState state)
    {
        state.State = false;
        return state;
    }

    public override Bag Output(GeneratorState state)
    {
        return new Bag((OutputPort, 5));
    }
}