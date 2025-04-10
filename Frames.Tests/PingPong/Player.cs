using Frames.Model;
using Frames.Model.Exceptions;
using Frames.Model.ValueTypes;

namespace Frames.Tests.PingPong;

public record struct PlayerSate : IState
{
    public string Name { get; set; }
    public int CompareTo(object? obj)
    {
        if (obj is PlayerSate other)
        {
            return string.Compare(Name, other.Name, StringComparison.Ordinal);
        }
        throw new ArgumentException("Object is not a PlayerSate");
    }
}

/// <summary>
/// Based ong PingPong example found in Wikipedia
/// </summary>
public class Player : AtomicModel<PlayerSate>
{
    public Player()
    {
        AddInPort(Receive);
        AddOutPort(Send);
    }


    public static readonly Pipe Send = new Pipe("send");
    public static readonly Pipe Receive = new Pipe("receive");
    
    public override PlayerSate State { get; set; } = new PlayerSate
    {
        Name = "Waiting"
    };
    public override TimeUnit TimeAdvance(PlayerSate state)
    {
        switch (state.Name)
        {
            case "Waiting":
                return TimeUnit.Infinity;
            case "Send":
                return TimeUnit.Delta;
            default:
                throw new UnknownStateException(State.Name);
        }
    }

    public override PlayerSate ExternalTransition(PlayerSate state, Bag bag)
    {
        switch (bag.Inputs.Keys)
        {
            case var keys when keys.Contains(Receive) && state.Name == "Waiting":
                // 1. Set state
                State = new PlayerSate()
                {
                    Name = "Send"
                };
                // 2. custom logic
                {
                    
                }
                break;
        }

        return State;
    }

    public override PlayerSate InternalTransition(PlayerSate state)
    {
        switch (state.Name)
        {
            case "Waiting":
                // do nothing, should not occur
                throw new IllegalStateException(State.Name);
            case "Send":
                // 1. Set state
                State = new PlayerSate()
                {
                    Name = "Waiting"
                };
                // 2. custom logic
                {
                }
                break;
        }

        return State;
    }

    public new PlayerSate ConfluentTransition(PlayerSate state, Bag bag)
    {
        // run external transition first, also default behavior
        return InternalTransition(ExternalTransition(state, bag));
    }

    public override Bag Output(PlayerSate state)
    {
        switch (state.Name)
        {
            case "Waiting":
                return new Bag(Send);
            case "Send":
                return Bag.Empty;
            default:
                throw new UnknownStateException(State.Name);
        }
    }
}