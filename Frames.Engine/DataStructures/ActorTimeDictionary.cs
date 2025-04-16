using Frames.Model.ValueTypes;

namespace Frames.Engine.DataStructures;

public interface IActorTimeDictionary
{
    void Update(IActorRef actor, TimeUnit time);

    /// <summary>
    /// Gets the time for a specific actor.
    /// </summary>
    TimeUnit Get(IActorRef actor);

    /// <summary>
    /// All TimeUnits in the dictionary are updated to a new time unit.
    /// </summary>
    bool Completed();

    TimeUnit MinTime();
    void Reset();
}

public class ActorTimeDictionary : IActorTimeDictionary
{

    /// <summary>
    /// The dictionary that stores the time for each actor.
    /// </summary>
    private Dictionary<IActorRef, TimeUnit?> _actorTimeDictionary { get; init; }

    /// <summary>
    /// Initializes a new instance of the <see cref="ActorTimeDictionary"/> class.
    /// </summary>
    public ActorTimeDictionary(List<IActorRef> actors)
    {
        _actorTimeDictionary = actors.ToDictionary(actor => actor, _ => TimeUnit.Undefined);
    }
    
    public void Update(IActorRef actor, TimeUnit time)
    {
        if (_actorTimeDictionary.ContainsKey(actor))
        {
            _actorTimeDictionary[actor] = time;
        }
        else
        {
            throw new KeyNotFoundException($"Actor {actor} not found in the dictionary.");
        }
    }

    /// <summary>
    /// Gets the time for a specific actor.
    /// </summary>
    public TimeUnit Get(IActorRef actor)
    {
        if (_actorTimeDictionary.TryGetValue(actor, out var time))
        {
            if (time == null)
            {
                throw new InvalidOperationException($"Time for actor {actor} is not set.");
            }
            
            return time.Value;
        }
        else
        {
            throw new KeyNotFoundException($"Actor {actor} not found in the dictionary.");
        }
    }
    
    /// <summary>
    /// All TimeUnits in the dictionary are updated to a new time unit.
    /// </summary>
    public bool Completed() => _actorTimeDictionary.All(x => x.Value != TimeUnit.Undefined);
    
    public TimeUnit MinTime() => _actorTimeDictionary.Values.Min(x => x!.Value);
    public List<IActorRef> Keys => _actorTimeDictionary.Keys.ToList();

    public void Reset()
    {
        foreach (var actor in _actorTimeDictionary.Keys)
        {
            _actorTimeDictionary[actor] = TimeUnit.Undefined;
        }
    }
}