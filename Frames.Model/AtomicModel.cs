using Frames.Model.ValueTypes;
using Newtonsoft.Json;

namespace Frames.Model;

public abstract class AtomicModel<TState> : IAtomicModel<TState>
    where TState : IState
{
    bool IAtomicModelBase.StopConditionCheck(IState state, Bag bag)
    {
        return StopCondition((TState)state, bag);
    }
    [JsonProperty]
    public  string Name { get; set; }

    public virtual bool HasStopCondition { get; set; } = false;

    /// <summary>
    /// State of the model.
    /// </summary>
    [JsonProperty]
    public abstract TState State { get; set; }
    
    [JsonProperty]
    public TimeUnit CurrentTime { get; set; }

    /// <summary>
    /// Do not override this method. Override the TState version instead.
    /// </summary>
    /// <param name="state"></param>
    /// <returns></returns>
    public TimeUnit TimeAdvance(IState state) => TimeAdvance((TState)state);

    /// <summary>
    /// Do not override this method. Override the TState version instead.
    /// </summary>
    /// <param name="state"></param>
    /// <param name="bag"></param>
    /// <returns></returns>
    public IState ExternalTransition(IState state, Bag bag) => ExternalTransition((TState)state, bag);

    /// <summary>
    /// Do not override this method. Override the TState version instead.
    /// </summary>
    /// <param name="state"></param>
    /// <returns></returns>
    public IState InternalTransition(IState state) => InternalTransition((TState)state);

    /// <summary>
    /// Do not override this method. Override the TState version instead.
    /// </summary>
    /// <param name="state"></param>
    /// <param name="bag"></param>
    /// <returns></returns>
    public IState ConfluentTransition(IState state, Bag bag) => ConfluentTransition((TState)state, bag);
    
    /// <summary>
    /// Do not override this method. Override the TState version instead.
    /// </summary>
    /// <param name="state"></param>
    /// <param name="bag"></param>
    /// <returns></returns>
    public bool StopCondition(IState state, Bag bag) => StopCondition((TState)state, bag);

    public Bag Output(IState state) => Output((TState)state);
    public Type GetStateType()
    {
        return typeof(TState);
    }

    public abstract TimeUnit TimeAdvance(TState state);
    public abstract TState ExternalTransition(TState state, Bag bag);
    public abstract TState InternalTransition(TState state);

    /// <summary>
    /// This is the default stop condition.
    /// First parameter is the  state, second is the bag.
    /// </summary>

    public virtual bool StopCondition(TState state, Bag bag)
    {
        return false;
    }
    /// <summary>
    /// Default behavior of confluent transition is to call internal transition first and then external transition.
    /// Can be overridden in derived classes.
    /// </summary>
    /// <param name="state"></param>
    /// <param name="bag"></param>
    /// <returns></returns>
    public virtual TState ConfluentTransition(TState state, Bag bag)
    {
        // return ExternalTransition(InternalTransition(state), bag);
        return InternalTransition(ExternalTransition(state, bag));
    }

    public abstract Bag Output(TState state);

    public void AddInPort(Port port)
    {
    }

    public void AddOutPort(Port port)
    {
    }

    /// <summary>
    /// This should only be used internally.
    /// </summary>
    IState IAtomicModelBase.StateInternal
    {
        get => State;
        set => State = (TState)value;
    }

    public static string GetPrefix()
    {
        return "simulator-";
    }
}