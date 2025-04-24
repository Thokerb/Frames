using Frames.Model.ValueTypes;

namespace Frames.Engine.Messages;

/// <summary>
/// Written as (x,*) in Theory of M S
/// </summary>
public static class Simulation
{
    public sealed record StartSimulation(IActorRef Children);
    
    public sealed record InterruptSimulation();
    public sealed record QueryIsCompleted();
    public sealed record IsCompleted(TimeUnit ElapsedTime);
    public sealed record SetStopAfterTime(TimeUnit Time);
    public sealed record HasStopCondition();
}