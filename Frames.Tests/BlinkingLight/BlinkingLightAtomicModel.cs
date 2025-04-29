using System.Runtime.Serialization;
using Frames.Model;
using Frames.Model.Exceptions;
using Frames.Model.ValueTypes;

namespace Frames.Tests.BlinkingLight;


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

    public void GetObjectData(SerializationInfo info, StreamingContext context)
    {
        info.AddValue(nameof(Name), Name);
    }
}

/// <summary>
/// Most basic example of a model, switching between two states by internal transition.
/// </summary>
public class BlinkingLightAtomicModel : AtomicModel<BlinkingLightState>
{
    public static readonly Port OutPort = new Port("Out");

    public override BlinkingLightState State { get; set; } = new BlinkingLightState
    {
        Name = "On"
    };
    public override TimeUnit TimeAdvance(BlinkingLightState state)
    {
        switch (state.Name)
        {
            case "On":
                return new TimeUnit(2);
            case "Off":
                return new TimeUnit(1);
            default:
                throw new UnknownStateException(State.Name);
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
                throw new UnknownStateException(State.Name);
        }
    }

    public override Bag Output(BlinkingLightState state)
    {
        switch (state.Name)
        {
            case "On":
                return new Bag((OutPort, 1));
            case "Off":
                return Bag.Empty;
            default:
                throw new UnknownStateException(State.Name);
        }
    }
}