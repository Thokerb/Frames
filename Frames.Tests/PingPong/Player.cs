using Frames.Model;
using Frames.Model.Exceptions;
using Frames.Model.ValueTypes;

namespace Frames.Tests.PingPong;

/// <summary>
/// Based ong PingPong example found in Wikipedia
/// </summary>
public class Player : AtomicModel<string>
{
    
    private static readonly Pipe Send = new Pipe("send");
    private static readonly Pipe Receive = new Pipe("receive");
    
    public override string State { get; set; } = "Waiting";
    public override TimeUnit TimeAdvance(string state)
    {
        switch (state)
        {
            case "Waiting":
                return TimeUnit.Infinity;
            case "Send":
                return TimeUnit.Delta;
            default:
                throw new UnknownStateException(State);
        }
    }

    public override string ExternalTransition(string state, Bag bag)
    {
        switch (bag.Inputs.Keys)
        {
            case var keys when keys.Contains(Receive) && state == "Waiting":
                // 1. Set state
                State = "Send";
                // 2. custom logic
                {
                    
                }
                break;
        }

        return State;
    }

    public override string InternalTransition(string state)
    {
        switch (state)
        {
            case "Waiting":
                // do nothing, should not occur
                throw new IllegalStateException(State);
            case "Send":
                // 1. Set state
                State = "Waiting";
                // 2. custom logic
                {
                }
                break;
        }

        return State;
    }

    public override string ConfluentTransition(string state, Bag bag)
    {
        // run external transition first, also default behavior
        return InternalTransition(ExternalTransition(state, bag));
    }

    public override Bag Output(string state)
    {
        switch (state)
        {
            case "Waiting":
                return new Bag(Send);
            case "Send":
                return Bag.Empty;
            default:
                throw new UnknownStateException(State);
        }
    }
}