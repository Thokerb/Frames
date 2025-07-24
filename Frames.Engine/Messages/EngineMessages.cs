using System.Diagnostics;
using Frames.Model;
using Frames.Model.ValueTypes;


namespace Frames.Engine.Messages;

/**
 * Implicit responses are required because we are communicating with actors asynchronously.
 * This means that we cannot expect a direct response to a message we send, but have to listen for a response
 * and keep track whether we received responses from all children.
 */


public static class EngineMessages
{
    /// <summary>
    /// Written as (i,t) in Theory of M S
    /// </summary>
    public sealed record StartInitialization(TimeUnit CurrentTime)  : WithActivityTrace,IShardSeperation
    {
        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
    }

    /// <summary>
    /// Implicit response, not written in Book because not needed in non actor based communication
    /// </summary>
    /// <param name="TimeLast"></param>
    /// <param name="TimeNext"></param>
    public sealed record InitializationCompleted(TimeUnit TimeLast, TimeUnit TimeNext) : IShardSeperation
    {
        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
    }

    public sealed record SetupSimulator(
        IActorRef Coordinator,
        IAtomicModelBase AtomicModel,
        string Name,
        string CoordinatorName)
        : IShardSeperation
    {
        public required string ShardId { get; set; }
        public string EntityName { get; } = Name;
    };


    public sealed record SetupCoordinator(IActorRef Parent, ICoupledModel CoupledModel, string Name, string ParentName)
        : IShardSeperation
    {
        public string ShardId { get; } = Name;
        public string EntityName { get; } = Name;
    };

}

public static class ComputeOutput
{
    /// <summary>
    /// Written as (*,t) in Theory of M S
    /// <param name="CurrentTime">t</param>
    /// </summary>
    public sealed record StartComputeOutput(TimeUnit CurrentTime)  : WithActivityTrace, IShardSeperation
    {
        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
    }

    /// <summary>
    /// Written as (y,t) in Theory of M S
    /// <param name="Output">y</param>
    /// <param name="CurrentTime">t</param>
    /// </summary>
    public sealed record ComputedOutput(Bag Output, TimeUnit CurrentTime) : WithOutputTrace, IShardSeperation
    {
        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
    }
}

public static class ExecuteTransition
{
    /// <summary>
    /// Written as (x,*) in Theory of M S
    /// </summary>
    public sealed record StartExecuteTransition(Bag? Input, TimeUnit CurrentTime) : WithActivityTrace, IShardSeperation
    {
        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
    }

    /// <summary>
    /// Implicit response, not written in Book because not needed in non actor based communication
    /// </summary>
    /// <param name="TimeNext"></param>
    public sealed record FinishedExecuteTransition(TimeUnit TimeNext) : WithSimulatorInformation, IShardSeperation
    {
        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
    }
}

public record WithActivityTrace(ActivityTraceId TraceId, ActivitySpanId SpanId)
{
    // TODO: check nullability
    protected WithActivityTrace() : this( Activity.Current?.TraceId ?? new ActivityTraceId(),Activity.Current?.SpanId ?? new ActivitySpanId()) { }
}

public static class StateSnapshot
{
    public sealed record SaveSnapshot(string CheckpointName);
    public sealed record SnapshotSaved();
    
    public sealed record LoadSnapshot(string CheckpointName);
    public sealed record SnapshotLoaded();
}


public record WithSimulatorInformation(bool StopConditionReached = false, Dictionary<string, Guid>? ToStringState = null);

//TODO: I think this is not needed anymore as we send this with streams now
public record WithOutputTrace(string ToStringOutput = "");

/// <summary>
/// When receiver is a simulator ShardId = SenderId, When receiver is a coordinator ShardId = receiverId
/// </summary>
/// <param name="ShardId"></param>
public interface IShardSeperation
{
    string ShardId { get; }
    string EntityName { get; }
};

//TODO: I think this is not needed anymore as we send this with streams now
public record TraceInformation(string State);