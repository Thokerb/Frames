using Frames.Model;
using Frames.Model.Exceptions;
using Frames.Model.ValueTypes;

namespace Frames.Tests.PingPong;

public record struct PlayerState : IState
{
    public string Name { get; set; }
    public int CompareTo(object? obj)
    {
        if (obj is PlayerState other)
        {
            return string.Compare(Name, other.Name, StringComparison.Ordinal);
        }
        throw new ArgumentException("Object is not a PlayerSate");
    }
}

/// <summary>
/// Based ong PingPong example found in Wikipedia
/// </summary>
public class Player : AtomicModel<PlayerState>
{
    public Player()
    {
        AddInPort(Receive);
        AddOutPort(Send);
    }


    public static readonly Port Send = new Port("send");
    public static readonly Port Receive = new Port("receive");
    
    public override PlayerState StateBr { get; set; } = new PlayerState
    {
        Name = "Waiting"
    };
    public override TimeUnit TimeAdvance(PlayerState state)
    {
        switch (state.Name)
        {
            case "Waiting":
                return TimeUnit.Infinity;
            case "Send":
                return TimeUnit.Delta;
            default:
                throw new UnknownStateException(StateBr.Name);
        }
    }

    public override PlayerState ExternalTransition(PlayerState state, Bag bag)
    {
        switch (bag.Inputs.Keys)
        {
            case var keys when keys.Contains(Receive) && state.Name == "Waiting":
                // 1. Set state
                StateBr = new PlayerState()
                {
                    Name = "Send"
                };
                // 2. custom logic
                {
                    
                }
                break;
        }

        return StateBr;
    }

    public override PlayerState InternalTransition(PlayerState state)
    {
        switch (state.Name)
        {
            case "Waiting":
                // do nothing, should not occur

                break;
            case "Send":
                // 1. Set state
                StateBr = new PlayerState()
                {
                    Name = "Waiting"
                };
                break;
        }

        return StateBr;
    }

    public new PlayerState ConfluentTransition(PlayerState state, Bag bag)
    {
        // run external transition first, also default behavior
        return InternalTransition(ExternalTransition(state, bag));
    }

    public override Bag Output(PlayerState state)
    {
        switch (state.Name)
        {
            case "Waiting":
                return Bag.Empty;
            case "Send":
                return new Bag(Send);
            default:
                throw new UnknownStateException(StateBr.Name);
        }
    }
}