using Frames.Model;
using Frames.Model.ValueTypes;

namespace Frames.Engine.Messages;

/// <summary>
/// Written as (i,t) in Theory of M S
/// </summary>
public static class Initialization
{
    public sealed record StartInitialization(TimeUnit CurrentTime);

    public sealed record InitializationCompleted(TimeUnit TimeLast, TimeUnit TimeNext);
}

public static class ComputeOutput
{
    /// <summary>
    /// Written as (*,t) in Theory of M S
    /// <param name="CurrentTime">t</param>
    /// </summary>
    public sealed record StartComputeOutput(TimeUnit CurrentTime);

    /// <summary>
    /// Written as (y,t) in Theory of M S
    /// <param name="Output">y</param>
    /// <param name="CurrentTime">t</param>
    /// </summary>
    public sealed record ComputedOutput(Bag Output, TimeUnit CurrentTime);
}

/// <summary>
/// Written as (x,*) in Theory of M S
/// </summary>
public static class ExecuteTransition
{
    public sealed record StartExecuteTransition(Bag Input, TimeUnit CurrentTime);

    public sealed record FinishedExecuteTransition(TimeUnit TimeNext);
}