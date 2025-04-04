namespace Frames.Model.ValueTypes;

/// <summary>
/// Pipe class represents a pipe which maps ports in the coupled model.
/// </summary>
public class Pipe
{
    public string Value { get; }
    
    public Pipe(string value)
    {
        Value = value;
    }
    public override string ToString()
    {
        return Value;
    }
    
    public static implicit operator Pipe(string value)
    {
        return new Pipe(value);
    }
    
    public static implicit operator string(Pipe pipe)
    {
        return pipe.Value;
    }
}