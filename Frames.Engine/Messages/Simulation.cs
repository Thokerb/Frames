using Frames.Model.ValueTypes;

namespace Frames.Engine.Messages;

/// <summary>
/// Written as (x,*) in Theory of M S
/// </summary>
public static class Simulation
{
    public sealed record StartSimulation(IActorRef Children, string? CheckpointName = null);
    
    public sealed record InterruptSimulation();
    public sealed record QueryIsCompleted();
    public sealed record IsCompleted(TimeUnit ElapsedTime);
    public sealed record SetStopAfterTime(TimeUnit Time);
    public sealed record HasStopCondition();
    public sealed record SaveCheckpoint(string Name, TimeUnit CurrentTime);
    public sealed record FinishedSaveCheckpoint(string Name, TimeUnit CurrentTime);
    public sealed record StopSimulation();
    public sealed record PauseSimulation();
    public sealed record ResumeSimulation();
    public sealed record SetCheckpoint(string Name, TimeUnit Time);
    
    public sealed record LoadCheckpoint(string Name);
    public sealed record FinishedLoadCheckpoint(string Name);
    
}