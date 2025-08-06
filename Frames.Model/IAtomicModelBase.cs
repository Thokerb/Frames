using Frames.Model.ValueTypes;

namespace Frames.Model;

public interface IAtomicModelBase : IModel
{
    bool StopConditionCheck(IState state, Bag bag);
    
    /// <summary>
    /// The state of the model.
    /// </summary>
    IState StateInternal { get; set; }

    /// <summary>
    /// The time until the next event.
    /// </summary>
    TimeUnit TimeAdvance(IState state);

    /// <summary>
    /// External transition function.
    /// </summary>
    IState ExternalTransition(IState state, Bag bag);

    /// <summary>
    /// Internal transition function.
    /// </summary>
    IState InternalTransition(IState state);

    /// <summary>
    /// Confluent transition function.
    /// </summary>
    IState ConfluentTransition(IState state, Bag bag);

    /// <summary>
    /// Output function.
    /// </summary>
    Bag Output(IState state);
    
    Type GetStateType();
}