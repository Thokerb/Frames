using Frames.Model.ValueTypes;

namespace Frames.Engine.Messages;

public static class Tracing
{
    public abstract record StreamElement;

    public sealed record MessageWithId(string Message, Guid Id) : StreamElement, IShardSeperation
    {
        public string ShardId { get; } = "Tracing";
        public string EntityName { get; } = "Tracing";
        public Guid RunId { get; set; } = Guid.Empty;

        public override string ToString()
        {
            return $"Message: {Message}, Id: {Id}";
        }
    }

    public sealed record StepBoundary(List<Guid> StepIds, TimeUnit LasTimeUnit, TimeUnit NexTimeUnit) : StreamElement, IShardSeperation
    {
        public string ShardId { get; } = "Tracing";
        public string EntityName { get; } = "Tracing";
        public Guid RunId { get; set; } = Guid.Empty;
        public override string ToString()
        {
            return $"Step completed, Current TimeStep: {LasTimeUnit}, Next TimeStep: {NexTimeUnit}, Number of messages: {StepIds.Count}\n===============================================";
        }
    }
    
}