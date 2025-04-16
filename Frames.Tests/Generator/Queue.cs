using Frames.Model;
using Frames.Model.ValueTypes;

namespace Frames.Tests.Generator;
public record QueueState : IState
{
    public int? Size { get; set; } = null;
    public int CompareTo(object? obj)
    {
        if (obj is QueueState other)
        {
            return Size?.CompareTo(other.Size) ?? 0;
        }
        throw new ArgumentException("Object is not a QueueState");
    }
}

public class Queue : AtomicModel<QueueState>
{
    public override QueueState StateBr { get; set; } = new QueueState()
    {
        Size = null
    };
    public override TimeUnit TimeAdvance(QueueState state)
    {
        if (state.Size == null)
        {
            return TimeUnit.Infinity;
        }
        else
        {
            return TimeUnit.Delta;
        }
    }

    public override QueueState ExternalTransition(QueueState state, Bag bag)
    {
        state.Size = bag.Inputs[Queue.InPort] as int?;
        return state;
    }

    public static Port InPort = new Port("In");
    public static Port OutPort = new Port("Out");

    public override QueueState InternalTransition(QueueState state)
    {
        state.Size = null;
        return state;
    }

    public override Bag Output(QueueState state)
    {
        return new Bag((OutPort, state.Size));
    }
}

