using System.Diagnostics;
using Frames.Model;
using Frames.Model.ValueTypes;
using Newtonsoft.Json;


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
    public sealed record StartInitialization : WithActivityTrace,IShardSeperation
    {
        /// <summary>
        /// Written as (i,t) in Theory of M S
        /// </summary>
        public StartInitialization(TimeUnit CurrentTime, Activity? activity) : base(activity)
        {
            this.CurrentTime = CurrentTime;
        }

        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
        public required Guid RunId { get; set; }
        public TimeUnit CurrentTime { get; init; }
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
        public required Guid RunId { get; set; }
    }

    public sealed record SetupSimulator(
        IAtomicModelBase AtomicModel,
        string Name,
        string CoordinatorName
        )
        : IShardSeperation
    {
        public required string ShardId { get; set; }
        public string EntityName { get; } = Name;
        public required Guid RunId { get; set; }
    };


    public sealed record SetupCoordinator(ICoupledModel CoupledModel, string Name, string ParentName)
        : IShardSeperation
    {
        public string ShardId { get; } = Name;
        public string EntityName { get; } = Name;
        public required Guid RunId { get; set; }
    };

}

public static class ComputeOutput
{
    /// <summary>
    /// Written as (*,t) in Theory of M S
    /// <param name="CurrentTime">t</param>
    /// </summary>
    public sealed record StartComputeOutput : WithActivityTrace, IShardSeperation
    {
        /// <summary>
        /// Written as (*,t) in Theory of M S
        /// <param name="CurrentTime">t</param>
        /// </summary>
        public StartComputeOutput(TimeUnit CurrentTime, Activity? activity) : base(activity)
        {
            this.CurrentTime = CurrentTime;
        }

        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
        public required Guid RunId { get; set; }
        public TimeUnit CurrentTime { get; init; }


    }

    /// <summary>
    /// Written as (y,t) in Theory of M S
    /// <param name="Output">y</param>
    /// <param name="CurrentTime">t</param>
    /// </summary>
    public sealed record ComputedOutput(InternalBag Output, TimeUnit CurrentTime) : IShardSeperation
    {
        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
        public required Guid RunId { get; set; }
    }
}

public static class ExecuteTransition
{
    /// <summary>
    /// Written as (x,*) in Theory of M S
    /// </summary>
    public sealed record StartExecuteTransition : WithActivityTrace, IShardSeperation
    {
        /// <summary>
        /// Written as (x,*) in Theory of M S
        /// </summary>
        public StartExecuteTransition(InternalBag? Input, TimeUnit CurrentTime,Activity? activity) : base(activity)
        {
            this.Input = Input;
            this.CurrentTime = CurrentTime;
        }

        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
        public InternalBag? Input { get; init; }
        public TimeUnit CurrentTime { get; init; }
        public required Guid RunId { get; set; }

    }

    /// <summary>
    /// Implicit response, not written in Book because not needed in non actor based communication
    /// </summary>
    /// <param name="TimeNext"></param>
    public sealed record FinishedExecuteTransition(TimeUnit TimeNext) : WithSimulatorInformation, IShardSeperation
    {
        public required string ShardId { get; set; }
        public required string EntityName { get; set; }
        public required Guid RunId { get; set; }
    }
}

public record WithActivityTrace
{
    // TODO: check nullability
    protected WithActivityTrace(Activity? activity)
    {
        TraceIdValue = activity?.TraceId.ToString() ?? new ActivityTraceId().ToString();
        SpanIdValue = activity?.SpanId.ToString() ?? new ActivitySpanId().ToString();
    }
    
    public string TraceIdValue { get; init; }
    public string SpanIdValue { get; init; }
    
    [JsonIgnore]
    public ActivityTraceId TraceId => ActivityTraceId.CreateFromString(TraceIdValue);
    
    [JsonIgnore]
    public ActivitySpanId SpanId => ActivitySpanId.CreateFromString(SpanIdValue);
}

public static class StateSnapshot
{
    public sealed record SaveSnapshot(string CheckpointName);
    public sealed record SnapshotSaved();
    
    public sealed record LoadSnapshot(string CheckpointName);
    public sealed record SnapshotLoaded();
}


public record WithSimulatorInformation(bool StopConditionReached = false, List<Guid>? ToStringState = null);


/// <summary>
/// When receiver is a simulator ShardId = SenderId, When receiver is a coordinator ShardId = receiverId
/// </summary>
/// <param name="ShardId"></param>
public interface IShardSeperation
{
    /// <summary>
    /// ShardId is the akka ShardId, which is used to deceide what actors are in the same shard.
    /// See CreateHashCodeMessageExtractor in AkkaConfiguration.cs for how this is calculated.
    /// </summary>
    string ShardId { get; }
    
    /// <summary>
    /// EntityName is the name of the entity that is receiving the message.
    /// It is used to identify the entity within the cluster, but also keeping location transparency.
    /// </summary>
    string EntityName { get; }
    
    /// <summary>
    /// This Id is appended to the EntityName to create a unique name for the actor for each run.
    /// </summary>
    Guid RunId { get; set; }
};