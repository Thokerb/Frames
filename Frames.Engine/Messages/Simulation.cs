using Frames.Model;
using Frames.Model.ValueTypes;

namespace Frames.Engine.Messages;

/// <summary>
/// Written as (x,*) in Theory of M S
/// </summary>
public static class Simulation
{
    public sealed record CreateModel(IModel Model, string Name) : WithRootCoordinatorShardId
    {
    }

    public sealed record StartSimulation(IActorRef Children, string? CheckpointName = null) : WithRootCoordinatorShardId;
    public sealed record QueryIsCompleted(): WithRootCoordinatorShardId;
    public sealed record IsCompleted(TimeUnit ElapsedTime, CompletionType CompletionType): WithRootCoordinatorShardId;
    public sealed record SetStopAfterTime(TimeUnit Time): WithRootCoordinatorShardId;
    public sealed record SetSpeedControl : WithRootCoordinatorShardId
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

    public sealed record HasStopCondition(): WithRootCoordinatorShardId;
    public sealed record SaveCheckpoint(string Name, TimeUnit CurrentTime): WithRootShardId;
    public sealed record FinishedSaveCheckpoint(string Name, TimeUnit CurrentTime): WithRootShardId;
    public sealed record StopSimulation(): WithRootCoordinatorShardId;
    public sealed record PauseSimulation(): WithRootCoordinatorShardId;
    public sealed record ResumeSimulation(): WithRootCoordinatorShardId;
    public sealed record SetCheckpoint(string Name, TimeUnit Time): WithRootCoordinatorShardId;
    
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

// TODO: rename
public record WithRootShardId : IShardSeperation
{
    public required string ShardId { get; init; }
    public required string EntityName { get; init; }
}

/// <summary>
/// For messages that are sent __only__ to the root coordinator.
/// </summary>
public record WithRootCoordinatorShardId : IShardSeperation
{
    public string ShardId { get; set; } = "root-coordinator";
    public string EntityName { get; init; } = "root-coordinator";
}