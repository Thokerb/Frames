using Frames.Model;
using Frames.Model.Exceptions;
using Frames.Model.ValueTypes;

namespace Frames.Tests.IllegalBlinkingLight;


public record struct BlinkingLightState : IState
{
    public string Name { get; set; } // either "On" or "Off"
    public int CompareTo(object? obj)
    {
        if (obj is BlinkingLightState other)
        {
            return string.Compare(Name, other.Name, StringComparison.Ordinal);
        }
        throw new ArgumentException("Object is not a BlinkingLightState");
    }
}

/// <summary>
/// Most basic example of a model, switching between two states by internal transition.
/// </summary>
public class IllegalBlinkingLightAtomicModel : AtomicModel<BlinkingLightState>
{
    public IllegalBlinkingLightAtomicModel()
    {
        
    }

    public override BlinkingLightState StateBr { get; set; } = new BlinkingLightState
    {
        Name = "On"
    };
    public override TimeUnit TimeAdvance(BlinkingLightState state)
    {
        switch (state.Name)
        {
            case "On":
                // SET STATE to Off, which is not allowed in TimeAdvance
                StateBr = new BlinkingLightState
                {
                    Name = "Off"
                };
                
                return new TimeUnit(2);
            case "Off":
                return new TimeUnit(1);
            default:
                throw new UnknownStateException(StateBr.Name);
        }
    }

    public override BlinkingLightState ExternalTransition(BlinkingLightState state, Bag bag)
    {
        // Blinking light has no external transition
        throw new NotSupportedException();
    }

    public override BlinkingLightState InternalTransition(BlinkingLightState state)
    {
        switch (state.Name)
        {
            case "On":
                return new BlinkingLightState
                {
                    Name = "Off"
                };
            case "Off":
                return new BlinkingLightState
                {
                    Name = "On"
                };
            default:
                throw new UnknownStateException(StateBr.Name);
        }
    }

    public override Bag Output(BlinkingLightState state)
    {
        // Blinking light has no output
        // Set state to Off, which is not allowed in Output
        StateBr = new BlinkingLightState
        {
            Name = "Off"
        };
        
        
        return new Bag();
    }
}