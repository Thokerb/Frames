using Frames.Model.ValueTypes;

namespace Frames.Engine.Dto;

public class TimeEventTuple
{
    // (TimeUnit timeLast, TimeUnit timeNext)
    public TimeUnit TimeLast { get; set; }
    public TimeUnit TimeNext { get; set; }
    public TimeEventTuple() {}

    
    public TimeEventTuple(TimeUnit timeLast, TimeUnit timeNext)
    {
        TimeLast = timeLast;
        TimeNext = timeNext;
    }
    public TimeEventTuple((TimeUnit timeLast, TimeUnit timeNext) timeEventTuple)
    {
        TimeLast = timeEventTuple.timeLast;
        TimeNext = timeEventTuple.timeNext;
    }
    
}