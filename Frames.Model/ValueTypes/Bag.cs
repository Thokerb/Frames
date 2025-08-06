using System.Text;

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

    public void Clear()
    {
        Inputs.Clear();
    }
}