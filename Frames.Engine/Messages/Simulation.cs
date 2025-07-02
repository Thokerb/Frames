using Frames.Model;
using Frames.Model.ValueTypes;

namespace Frames.Engine.Messages;

/// <summary>
/// Written as (x,*) in Theory of M S
/// </summary>
public static class Simulation
{
    public sealed record CreateModel(IModel Model, string Name) : WithRootShardId
    {
    }

    public sealed record StartSimulation(IActorRef Children, string? CheckpointName = null) : WithRootShardId;
    public sealed record QueryIsCompleted(): WithRootShardId;
    public sealed record IsCompleted(TimeUnit ElapsedTime, CompletionType CompletionType): WithRootShardId;
    public sealed record SetStopAfterTime(TimeUnit Time): WithRootShardId;
    public sealed record SetSpeedControl : WithRootShardId
    {
        public int TimeUnitInMilliseconds { get; init; }
        public bool AsFastAsPossible { get; init; }
        
        public SetSpeedControl(int timeUnitInMilliseconds)
        {
            TimeUnitInMilliseconds = timeUnitInMilliseconds;
        }
        public SetSpeedControl(bool asFastAsPossible)
        {
            AsFastAsPossible = asFastAsPossible;
        }
    }

    public sealed record HasStopCondition(): WithRootShardId;
    public sealed record SaveCheckpoint(string Name, TimeUnit CurrentTime): WithRootShardId;
    public sealed record FinishedSaveCheckpoint(string Name, TimeUnit CurrentTime): WithRootShardId;
    public sealed record StopSimulation(): WithRootShardId;
    public sealed record PauseSimulation(): WithRootShardId;
    public sealed record ResumeSimulation(): WithRootShardId;
    public sealed record SetCheckpoint(string Name, TimeUnit Time): WithRootShardId;
    
    public sealed record LoadCheckpoint(string Name): WithRootShardId;
    public sealed record FinishedLoadCheckpoint(string Name): WithRootShardId;
}

public enum CompletionType
{
    NotCompleted,
    StopAfterTime,
    StopAfterCondition,
    ManualStop,
    ManualPause,
    Error,
    Timeout
}

public record WithRootShardId : IShardSeperation
{
    public string ShardId { get; } = "root-coordinator";
}