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
    public sealed record StartInitialization(TimeUnit CurrentTime)  : WithActivityTrace;

    /// <summary>
    /// Implicit response, not written in Book because not needed in non actor based communication
    /// </summary>
    /// <param name="TimeLast"></param>
    /// <param name="TimeNext"></param>
    public sealed record InitializationCompleted(TimeUnit TimeLast, TimeUnit TimeNext);
}

public static class ComputeOutput
{
    /// <summary>
    /// Written as (*,t) in Theory of M S
    /// <param name="CurrentTime">t</param>
    /// </summary>
    public sealed record StartComputeOutput(TimeUnit CurrentTime)  : WithActivityTrace;

    /// <summary>
    /// Written as (y,t) in Theory of M S
    /// <param name="Output">y</param>
    /// <param name="CurrentTime">t</param>
    /// </summary>
    public sealed record ComputedOutput(Bag Output, TimeUnit CurrentTime) : WithOutputTrace;
}

public static class ExecuteTransition
{
    /// <summary>
    /// Written as (x,*) in Theory of M S
    /// </summary>
    public sealed record StartExecuteTransition(Bag? Input, TimeUnit CurrentTime) : WithActivityTrace;

    /// <summary>
    /// Implicit response, not written in Book because not needed in non actor based communication
    /// </summary>
    /// <param name="TimeNext"></param>
    public sealed record FinishedExecuteTransition(TimeUnit TimeNext) : WithSimulatorInformation;
}

public record WithActivityTrace(ActivityTraceId TraceId, ActivitySpanId SpanId)
{
    // TODO: check nullability
    protected WithActivityTrace() : this( Activity.Current!.TraceId,Activity.Current!.SpanId) { }
}

public record WithSimulatorInformation(bool StopConditionReached = false, Dictionary<string, TraceInformation>? ToStringState = null);
public record WithOutputTrace(string ToStringOutput = "");

public record TraceInformation(string State);