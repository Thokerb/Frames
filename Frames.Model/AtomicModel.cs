using Frames.Model.ValueTypes;

namespace Frames.Model;

public interface IAtomicModel<TState> 
{
    public TState State { get; set; }
    public TimeUnit TimeAdvance(TState state);
    public TState ExternalTransition(TState state, Bag bag);
    public TState InternalTransition(TState state);
    public TState ConfluentTransition(TState state,Bag bag);
    public Bag Output(TState state);
}

public class Bag
{
    public Bag() { }
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
{
    public abstract TState State { get; set; }
    public abstract TimeUnit TimeAdvance(TState state);
    public abstract TState ExternalTransition(TState state, Bag bag);
    public abstract TState InternalTransition(TState state);
    public abstract TState ConfluentTransition(TState state, Bag bag);
    public abstract Bag Output(TState state);
}