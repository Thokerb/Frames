using Frames.Model;
using Frames.Model.ValueTypes;
using Newtonsoft.Json;

namespace Frames.Engine.Messages;

public static class Simulation
{
    public sealed record CreateModel(IModel Model, string Name, Guid Id) : WithRootCoordinatorShardId(Id)
    {
    }

    public sealed record StartSimulation(Guid Id, string? CheckpointName = null) : WithRootCoordinatorShardId(Id);

    public sealed record QueryIsCompleted(Guid Id) : WithRootCoordinatorShardId(Id);

    public sealed record IsCompleted(TimeUnit ElapsedTime, CompletionType CompletionType, Guid Id, long TimeInMilliseconds)
        ;

    public sealed record SetStopAfterTime(TimeUnit Time, Guid Id) : WithRootCoordinatorShardId(Id);

    public sealed record SetSpeedControl : WithRootCoordinatorShardId
    {
        public int TimeUnitInMilliseconds { get; init; }
        public bool AsFastAsPossible { get; init; }

        public SetSpeedControl(int timeUnitInMilliseconds, Guid Id) : base(Id)
        {
            TimeUnitInMilliseconds = timeUnitInMilliseconds;
        }

        public SetSpeedControl(bool asFastAsPossible, Guid Id) : base(Id)
        {
            AsFastAsPossible = asFastAsPossible;
        }
    }

    public sealed record HasStopCondition() : WithShardId;

    public sealed record SaveCheckpoint(string Name, TimeUnit CurrentTime) : WithShardId;

    public sealed record FinishedSaveCheckpoint(string Name, TimeUnit CurrentTime) : WithShardId;

    public sealed record StopSimulation(Guid Id) : WithRootCoordinatorShardId(Id);

    public sealed record PauseSimulation(Guid Id) : WithRootCoordinatorShardId(Id);

    public sealed record ResumeSimulation(Guid Id) : WithRootCoordinatorShardId(Id);

    public sealed record SetCheckpoint(string Name, TimeUnit Time, Guid Id) : WithRootCoordinatorShardId(Id);
    public sealed record RemoveCheckpoint(string Name, Guid Id) : WithRootCoordinatorShardId(Id);

    public sealed record LoadCheckpoint(string Name) : WithShardId;

    public sealed record FinishedLoadCheckpoint(string Name) : WithShardId;

    public sealed record GetStatus(Guid Id) : WithRootCoordinatorShardId(Id);
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

public record WithShardId : IShardSeperation
{
    public required string ShardId { get; init; }
    public required string EntityName { get; init; }
    public required Guid RunId { get; set; }
}

/// <summary>
/// For messages that are sent __only__ to the root coordinator.
/// </summary>
public record WithRootCoordinatorShardId(Guid Id) : IShardSeperation
{
    /// <summary>
    /// Each root coordinator actor has a unique shard ID.
    /// </summary>
    public string ShardId { get; internal set; } = $"root-coordinator";

    public string EntityName { get; } = $"root-coordinator";

    public Guid RunId { get; set; } = Id;
}