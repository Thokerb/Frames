using System.Collections;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Frames.Model.ValueTypes;

public record InternalBagKey
{
    public required Port SenderPort { get; init; }
    public required string SenderModelId { get; init; }
}

/// <summary>
/// Bag is used by AtomicModels and InternalBag is used internally by Coordinator. It carries more information (sender receiver)
/// </summary>
public record struct InternalBag
{
    public InternalBag()
    {
    }
    public static InternalBag Empty => new();

    public InternalBag(params (InternalBagKey key, object? value)[] inputs)
    {
        foreach (var input in inputs)
        {
            AddInput<object>(input.key, input.value);
        }
    }

    public InternalBag(params (InternalBagKey key, List<object?> value)[] inputs)
    {
        foreach (var input in inputs)
        {
            AddInput(input.key, input.value);
        }
    }

    public InternalBag(params InternalBagKey[] inputs)
    {
        foreach (var input in inputs)
        {
            AddInput<object>(input, null);
        }
    }

    public bool IsEmpty => Inputs.Count == 0;


    public Dictionary<InternalBagKey, List<object?>> Inputs { get; set; } = new();

    public void AddInput<T>(InternalBagKey key, T? value)  where T : class
    {

        // special check to prevent adding lists via this method, but allowing Reel "object" lists
        if (value is IList )
        {
            throw new InvalidOperationException("Use AddInput with List<object?> for adding lists");
        }
        
        if (Inputs.ContainsKey(key))
        {
            Inputs[key].Add(value);
        }
        else
        {
            Inputs[key] = new List<object?> { value };
        }
    }
    public void AddInput(InternalBagKey key, List<object?> value)
    {
        if (Inputs.ContainsKey(key))
        {
            Inputs[key].AddRange(value);
        }
        else
        {
            Inputs[key] = new List<object?>();
            Inputs[key].AddRange(value);
        }
    }

    public List<object?>? GetInput(InternalBagKey key)
    {
        Inputs.TryGetValue(key, out var value);
        return value;
    }

    public bool ContainsKey(InternalBagKey key)
    {
        return Inputs.ContainsKey(key);
    }
    
    public override string ToString()
    {
        var sb = new StringBuilder();
        sb.Append("InternalBag: [");
        foreach (var input in Inputs)
        {
            sb.Append($"{input.Key}: {JsonSerializer.Serialize(input.Value, new JsonSerializerOptions
            {
                NumberHandling = JsonNumberHandling.WriteAsString,
                WriteIndented = false
            })}, ");
        }
        sb.Append("]");
        return sb.ToString();
    }

    public void Clear()
    {
        Inputs.Clear();
    }

    public InternalBag DeepCopy()
    {
        return new InternalBag()
        {
            Inputs = Inputs.ToDictionary(
                entry => entry.Key,
                entry => entry.Value.Select(x => x).ToList()
            )
        };
    }

    public Bag ToBag()
    {
        var bag = new Bag();
        foreach (var input in Inputs)
        {
            bag.AddInput(input.Key.SenderPort, input.Value);
        }

        return bag;
    }
}