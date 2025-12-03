using System.Collections;
using System.Text;
using System.Text.Json;

namespace Frames.Model.ValueTypes;

public record struct Bag
{
    public Bag()
    {
    }

    public Bag(params (Port key, object? value)[] inputs)
    {
        foreach (var input in inputs)
        {
            AddInput<object>(input.key, input.value);
        }
    }

    public Bag(params (Port key, List<object?> value)[] inputs)
    {
        foreach (var input in inputs)
        {
            AddInput(input.key, input.value);
        }
    }

    public Bag(params Port[] inputs)
    {
        foreach (var input in inputs)
        {
            AddInput<object>(input, null);
        }
    }

    public bool IsEmpty => Inputs.Count == 0;


    public Dictionary<Port, List<object?>> Inputs { get; set; } = new();

    public void AddInput<T>(Port key, T? value)  where T : class
    {

        // special check to prevent adding lists via this method, but allowing Reel "object" lists
        if (value is IList and not List<KeyValuePair<string, object>>)
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
    public void AddInput(Port key, List<object?> value)
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

    public List<object?>? GetInput(Port key)
    {
        Inputs.TryGetValue(key, out var value);
        return value;
    }

    public bool ContainsKey(Port key)
    {
        return Inputs.ContainsKey(key);
    }

    public static Bag Empty => new();

    public override string ToString()
    {
        var sb = new StringBuilder();
        sb.Append("Bag: [");
        foreach (var input in Inputs)
        {
            sb.Append($"{input.Key}: {JsonSerializer.Serialize(input.Value, new JsonSerializerOptions
            {
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

    public Bag DeepCopy()
    {
        return new Bag()
        {
            Inputs = Inputs.ToDictionary(
                entry => entry.Key,
                entry => entry.Value.Select(x => x).ToList()
            )
        };
    }
}