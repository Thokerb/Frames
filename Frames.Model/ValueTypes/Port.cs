namespace Frames.Model.ValueTypes;

/// <summary>
/// Pipe class represents a pipe which maps ports in the coupled model.
/// </summary>
public class Port
{
    public string Value { get; }
    
    public Port(string value)
    {
        Value = value;
    }
    public override string ToString()
    {
        return Value;
    }
    
    public static implicit operator Port(string value)
    {
        return new Port(value);
    }
    
    public static implicit operator string(Port port)
    {
        return port.Value;
    }
}