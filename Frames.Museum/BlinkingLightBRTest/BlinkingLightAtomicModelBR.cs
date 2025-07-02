using Frames.Model;
using Frames.Model.Exceptions;
using Frames.Model.ValueTypes;
using Serilog;

namespace Frames.Museum.BlinkingLightBRTest;


public record struct BlinkingLightStateBR : IState
{
    public BlinkingLightStateBR()
    {
        Name = "On";
    }

    public string Name { get; set; } // either "On" or "Off"
    
    public int MaxCycles { get; set; } = 0;
    
    public int CurrentCycle { get; set; } = 0;
    
    public int WaitingTime { get; set; } = 2;
    
    public int CompareTo(object? obj)
    {
        if (obj is BlinkingLightStateBR other)
        {
            return string.Compare(Name, other.Name, StringComparison.Ordinal);
        }
        throw new ArgumentException("Object is not a BlinkingLightState");
    }
}

/// <summary>
/// Most basic example of a model, switching between two states by internal transition.
/// </summary>
public class BlinkingLightAtomicModelBR : AtomicModel<BlinkingLightStateBR>
{
    public readonly static Port PortInFinishedByOther = new Port("PortInFinishedByOther");
    public readonly static Port PortOutFinished = new Port("PortOutFinished");
    
    public BlinkingLightAtomicModelBR()
    {
        
    }

    public override BlinkingLightStateBR State { get; set; } = new BlinkingLightStateBR
    {
        Name = "On"
        
    };
    public override TimeUnit TimeAdvance(BlinkingLightStateBR stateBr)
    {
        switch (stateBr.Name)
        {
            case "On":
                return new TimeUnit(2);
            case "Off":
                return new TimeUnit(stateBr.WaitingTime);
            case "FinishedByItself":
                return TimeUnit.Infinity;
            case "FinishedByOther":
                return TimeUnit.Infinity;
            case "TransitionFinishedByItself":
                return new TimeUnit(1); // TODO: lets see
            default:
                throw new UnknownStateException(State.Name);
        }
    }

    public override BlinkingLightStateBR ExternalTransition(BlinkingLightStateBR stateBr, Bag bag)
    {
        // Blinking light has no external transition
        if (bag.ContainsKey(PortInFinishedByOther) && stateBr.Name is "On" or "Off" )
        {
            stateBr.Name = "FinishedByOther";
        }
        
        return stateBr;
    }

    public override BlinkingLightStateBR InternalTransition(BlinkingLightStateBR stateBr)
    {
        switch (stateBr.Name)
        {
            case "On":
                stateBr.CurrentCycle++;
                stateBr.Name = "Off";
                break;
            case "Off":
                stateBr.Name = "On";
                break;
            case "TransitionFinishedByItself":
                stateBr.Name = "FinishedByItself";
                break;
            case "FinishedByItself":
                return stateBr;
        }

        if(stateBr.CurrentCycle >= stateBr.MaxCycles && stateBr.Name == "On" )
        {
            stateBr.Name = "TransitionFinishedByItself";
        }
        
        return stateBr;
    }

    public override Bag Output(BlinkingLightStateBR stateBr)
    {
        Log.Debug("[ OUTPUT ] State: {@State}",  stateBr);
        
        if(stateBr.Name == "TransitionFinishedByItself")
        {
            return new Bag((PortOutFinished, stateBr.MaxCycles));
        }
        return Bag.Empty;
    }
}