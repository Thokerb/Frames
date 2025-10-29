using Frames.Model;
using Frames.Model.ValueTypes;

namespace Frames.Museum.Benchmark.Model;

public class AtomicBenchmarkModelState : IState
{
    public bool IsActive { get; set; }
    public int CompareTo(object? obj)
    {
        if (obj is AtomicBenchmarkModelState other)
        {
            return ((AtomicBenchmarkModelState)obj).CompareTo(this);
        }
        return 0;
    }
}

public class AtomicBenchmarkModel : AtomicModel<AtomicBenchmarkModelState>
{
    public override AtomicBenchmarkModelState State { get; set; }
    public override TimeUnit TimeAdvance(AtomicBenchmarkModelState state)
    {
        if (state.IsActive)
        {
            return TimeUnit.Delta;
        }
        return TimeUnit.Infinity;
    }

    public override AtomicBenchmarkModelState ExternalTransition(AtomicBenchmarkModelState state, Bag bag)
    {
        return state;
    }

    public override AtomicBenchmarkModelState InternalTransition(AtomicBenchmarkModelState state)
    {
        return state;
    }

    public override Bag Output(AtomicBenchmarkModelState state)
    {
        return Bag.Empty;
    }
}