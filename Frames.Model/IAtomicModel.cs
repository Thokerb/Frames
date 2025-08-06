using Frames.Model.ValueTypes;

namespace Frames.Model;

public interface IAtomicModel<TState> : IAtomicModelBase where TState : IState
{
    
    /// <summary>
    /// This is the default stop condition.
    /// First parameter is the old state, second is the new state and third is the bag.
    /// </summary>
    // public Func<TState, Bag, bool> StopCondition { get; set; }
    bool StopCondition(TState state, Bag bag);
    
    /// <summary>
    /// The state of the model.
    /// </summary>
    TState State { get; set; }

    /// <summary>
    /// The time until the next event.
    /// </summary>
    TimeUnit TimeAdvance(TState state);

    /// <summary>
    /// External transition function.
    /// </summary>
    TState ExternalTransition(TState state, Bag bag);

    /// <summary>
    /// Internal transition function.
    /// </summary>
    TState InternalTransition(TState state);

    /// <summary>
    /// Confluent transition function.
    /// </summary>
    TState ConfluentTransition(TState state, Bag bag);

    /// <summary>
    /// Output function.
    /// </summary>
    Bag Output(TState state);
}