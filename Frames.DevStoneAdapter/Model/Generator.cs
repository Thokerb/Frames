using Frames.Model;
using Frames.Model.ValueTypes;

namespace Frames.DevStoneAdapter.Model;

public class GeneratorState : IState
{
    // self.num_outputs = num_outputs
    //     self.period = period
    //     self.state = "active"
    
    public string State { get; set; } = "active";
    
    public TimeUnit Period { get; set; } = TimeUnit.Zero;
    
    public int NumOutputs { get; set; } = 1;
    public int CompareTo(object? obj)
    {
        if (obj is not GeneratorState other)
        {
            return 1; // or throw an exception
        }

        return string.Compare(State, other.State, StringComparison.Ordinal);
    }
}

public class Generator : AtomicModel<GeneratorState>
{
    public override GeneratorState State { get; set; }
    public override TimeUnit TimeAdvance(GeneratorState state)
    {
        if (state.State == "active")
        {
            return TimeUnit.Zero;
        }

        if (state.State == "waiting")
        {
            return state.Period;
        }
        return TimeUnit.Infinity;
        
    }

    public override GeneratorState ExternalTransition(GeneratorState state, Bag bag)
    {
        return state;
    }

    public override GeneratorState InternalTransition(GeneratorState state)
    {
        if (state.State == "active" && state.Period != TimeUnit.Zero)
        {
            state.State = "waiting";
        }
        else if (state.State == "waiting")
        {
            state.State = "active";
        }
        else
        {
            state.State = "passive";
        }
        return state;
    }

    public override Bag Output(GeneratorState state)
    {
        //         return {self.o_out: list(range(self.num_outputs))}
        Bag bag = new Bag((PortConstants.OutPort, 0),(PortConstants.OutPort2,0));
        return bag;
    }
}