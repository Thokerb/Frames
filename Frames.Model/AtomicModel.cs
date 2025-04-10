using Frames.Model.ValueTypes;

namespace Frames.Model;

public interface IAtomicModelBase
{
    /// <summary>
    /// The state of the model.
    /// </summary>
    IState State { get; set; }

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
}

public interface IState : IComparable
{
}

public interface IAtomicModel<TState> : IAtomicModelBase where TState : IState
{
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

public class Bag
{
    public Bag()
    {
    }

    public Bag(params (Pipe key, object? value)[] inputs)
    {
        foreach (var input in inputs)
        {
            Inputs.Add(input.key, input.value);
        }
    }

    public Bag(params Pipe[] inputs)
    {
        foreach (var input in inputs)
        {
            Inputs.Add(input, null);
        }
    }

    public bool IsEmpty => Inputs.Count == 0;


    public Dictionary<Pipe, object?> Inputs { get; set; } = new();

    public void AddInput(Pipe key, object? value)
    {
        Inputs[key] = value;
    }

    public object? GetInput(Pipe key)
    {
        Inputs.TryGetValue(key, out var value);
        return value;
    }

    public bool ContainsKey(Pipe key)
    {
        return Inputs.ContainsKey(key);
    }

    public static Bag Empty => new();
}

public abstract class AtomicModel<TState> : IAtomicModel<TState>
    where TState : IState
{
    public abstract TState State { get; set; }
    public TimeUnit TimeAdvance(IState state) => TimeAdvance((TState)state);

    public IState ExternalTransition(IState state, Bag bag) => ExternalTransition((TState)state, bag);

    public IState InternalTransition(IState state) => InternalTransition((TState)state);

    public IState ConfluentTransition(IState state, Bag bag) => ConfluentTransition((TState)state, bag);

    public Bag Output(IState state) => Output((TState)state);

    public abstract TimeUnit TimeAdvance(TState state);
    public abstract TState ExternalTransition(TState state, Bag bag);
    public abstract TState InternalTransition(TState state);

    /// <summary>
    /// Default behavior of confluent transition is to call external transition and then internal transition.
    /// Can be overridden in derived classes.
    /// </summary>
    /// <param name="state"></param>
    /// <param name="bag"></param>
    /// <returns></returns>
    public TState ConfluentTransition(TState state, Bag bag)
    {
        return InternalTransition(ExternalTransition(state, bag));
    }

    public abstract Bag Output(TState state);

    public void AddInPort(Pipe pipe)
    {
    }

    public void AddOutPort(Pipe pipe)
    {
    }

    IState IAtomicModelBase.State
    {
        get => State;
        set => State = (TState)value;
    }
}