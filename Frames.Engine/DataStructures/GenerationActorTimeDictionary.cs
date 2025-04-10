using Frames.Model.ValueTypes;

namespace Frames.Engine.DataStructures;

/// <summary>
/// Wrapper around ActorTimeDictionary, that saves previous time values.
/// </summary>
public class GenerationActorTimeDictionary : IActorTimeDictionary
{
    
    public GenerationActorTimeDictionary(List<IActorRef> actors)
    {
        ActorTimeDictionaries.Add(new ActorTimeDictionary(actors));
    }
    
    private List<ActorTimeDictionary> ActorTimeDictionaries { get; init; } = new();
    
    public ActorTimeDictionary Current => ActorTimeDictionaries.Last();


    public void Update(IActorRef actor, TimeUnit time)
    {
        if (Current == null)
        {
            throw new InvalidOperationException("No current ActorTimeDictionary available.");
        }
        
        Current.Update(actor, time);
    }

    public TimeUnit Get(IActorRef actor)
    {
        if (Current == null)
        {
            throw new InvalidOperationException("No current ActorTimeDictionary available.");
        }
        
        return Current.Get(actor);
    }

    public bool Completed() => Current.Completed();
    public TimeUnit MinTime() => Current.MinTime();
    public void Reset()
    {
        ActorTimeDictionaries.Add(new ActorTimeDictionary(Current.Keys));
    }
}