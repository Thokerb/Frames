namespace Frames.Engine.Messages;

public static class Tracing
{
    public abstract record StreamElement;

    public sealed record MessageWithId(string Message, Guid Id) : StreamElement, IShardSeperation
    {
        public string ShardId { get; } = "Tracing";
        public string EntityName { get; } = "Tracing";
    }

    public sealed record StepBoundary(List<Guid> StepIds) : StreamElement, IShardSeperation
    {
        public string ShardId { get; } = "Tracing";
        public string EntityName { get; } = "Tracing";
    }
}