using Newtonsoft.Json;

namespace Frames.Model.ValueTypes;

/// <summary>
/// Value type for time units
/// </summary>
public record struct TimeUnit : IComparable<TimeUnit>
{
    [JsonProperty]
    public int Value { get; init; }
    
    [JsonProperty]
    public bool IsInfinity { get; init; }

    public TimeUnit(TimeUnit timeUnit)
    {
        Value = timeUnit.Value;
        IsInfinity = timeUnit.IsInfinity;
    }
    
    public TimeUnit(int value, bool isInfinity = false)
    {
        Value = value;
        IsInfinity = isInfinity;
        
        if(value == int.MaxValue)
        {
            IsInfinity = true;
            Value = int.MaxValue;
        }
        
        if (value < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(value), "Time unit cannot be negative.");
        }

        if (value == 0)
        {
            // this is allowed but brings the simulator to an extra execution round. Maybe we can leverage this in the future
        }
    }
    

    public override string ToString()
    {
        return $"{Value}";
    }

    public static implicit operator TimeUnit(int value)
    {
        return new TimeUnit(value);
    }

    public static implicit operator double(TimeUnit timeUnit)
    {
        
        return (double)timeUnit.Value;
    }
    public static implicit operator TimeUnit(double value)
    {
        
        if(double.IsPositiveInfinity(value))
        {
            return Infinity;
        }
        
        if (value % 1 == 0)
        {
            return new TimeUnit((int)value);
        }

        return new TimeUnit((int)Math.Ceiling(value));

        throw new Exception("Time unit must not have decimal");
    }
    
    public static implicit operator int(TimeUnit timeUnit)
    {
        return timeUnit.Value;
    }
    
    public static explicit operator TimeUnit(long value)
    {
        if (value > int.MaxValue)
        {
            throw new OverflowException("Cannot convert long value greater than int.MaxValue to TimeUnit.");
        }
        return new TimeUnit((int)value);
    }    
    
    public static TimeUnit operator +(TimeUnit a, TimeUnit b)
    {
        if (a.IsInfinity || b.IsInfinity)
        {
            return Infinity;
        }
        return new TimeUnit(a.Value + b.Value);
    }
    public static TimeUnit operator -(TimeUnit a, TimeUnit b)
    {
        if(a.IsInfinity || b.IsInfinity)
        { 
            // TODO: this should not occur I think
            // because substraction is only needed in elapsed time, which is not infinity
            throw new NotSupportedException();
        }
        return new TimeUnit(a.Value - b.Value);
    }
    
    // infinity static
    public static TimeUnit Infinity => new(int.MaxValue,true);
    
    /// <summary>
    /// Zero time unit
    /// Convenience property for zero time unit
    /// </summary>
    public static TimeUnit Zero => new(0);
    
    /// <summary>
    /// Smallest time unit
    /// Convenience property for smallest time unit
    /// </summary>
    public static TimeUnit Delta => new(1);
    
    public static TimeUnit? Undefined => null;

    public int CompareTo(TimeUnit other)
    {
        if (other.IsInfinity && IsInfinity)
        {
            return 0;
        }
        if (other.IsInfinity)
        {
            return -1;
        }
        if (IsInfinity)
        {
            return 1;
        }
        return Value.CompareTo(other.Value);
    }
}
