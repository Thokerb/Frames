using System.Text;
using Frames.Model.ValueTypes;

namespace Frames.Model;

public interface IAtomicModelBase : IModel
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

    public Bag(params (Port key, object? value)[] inputs)
    {
        foreach (var input in inputs)
        {
            Inputs.Add(input.key, input.value);
        }
    }

    public Bag(params Port[] inputs)
    {
        foreach (var input in inputs)
        {
            Inputs.Add(input, null);
        }
    }

    public bool IsEmpty => Inputs.Count == 0;


    public Dictionary<Port, object?> Inputs { get; set; } = new();

    public void AddInput(Port key, object? value)
    {
        Inputs[key] = value;
    }

    public object? GetInput(Port key)
    {
        Inputs.TryGetValue(key, out var value);
        return value;
    }

    public bool ContainsKey(Port key)
    {
        return Inputs.ContainsKey(key);
    }

    public static Bag Empty => new();

    public void AddBag(Bag objOutput)
    {
        foreach (var input in objOutput.Inputs)
        {
            if (Inputs.ContainsKey(input.Key))
            {
                // TODO: is this allowed to overwrite?
                // verify or throw exception
                Inputs[input.Key] = input.Value;
            }
            else
            {
                Inputs.Add(input.Key, input.Value);
            }
        }
    }

    public override string ToString()
    {
        var sb = new StringBuilder();
        sb.Append("Bag: [");
        foreach (var input in Inputs)
        {
            sb.Append($"{input.Key}: {input.Value}, ");
        }
        sb.Append("]");
        return sb.ToString();
    }
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
    /// Default behavior of confluent transition is to call internal transition first and then external transition.
    /// Can be overridden in derived classes.
    /// </summary>
    /// <param name="state"></param>
    /// <param name="bag"></param>
    /// <returns></returns>
    public TState ConfluentTransition(TState state, Bag bag)
    {
        return ExternalTransition(InternalTransition(state), bag);
        // return InternalTransition(ExternalTransition(state, bag));
    }

    public abstract Bag Output(TState state);

    public void AddInPort(Port port)
    {
    }

    public void AddOutPort(Port port)
    {
    }

    IState IAtomicModelBase.State
    {
        get => State;
        set => State = (TState)value;
    }

    public static string GetPrefix()
    {
        return "simulator-";
    }
}