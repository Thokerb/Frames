namespace Frames.Engine.Messages;

public static class Tracing
{
    public abstract record StreamElement;

    public sealed record MessageWithId(string Message, Guid Id) : StreamElement;
    public sealed record StepBoundary(List<Guid> StepIds) : StreamElement;

}