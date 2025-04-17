namespace Frames.Model.ValueTypes;

/// <summary>
/// Pipe class represents a pipe which maps ports in the coupled model.
/// </summary>
public class Port : IEquatable<Port>
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

    public bool Equals(Port? other)
    {
        if (other is null) return false;
        if (ReferenceEquals(this, other)) return true;
        return Value == other.Value;
    }

    public override bool Equals(object? obj)
    {
        if (obj is null) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != GetType()) return false;
        return Equals((Port)obj);
    }

    public override int GetHashCode()
    {
        return Value.GetHashCode();
    }
}