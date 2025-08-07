using Akka;
using Akka.Streams.Dsl;

namespace Frames.Engine.Tracing;

public static class TracingFlow
{
    public static Flow<Messages.Tracing.StreamElement, List<Messages.Tracing.MessageWithId>, NotUsed> GroupByStepFlow()
    {
        return FlowOperations.StatefulSelectMany<
            Messages.Tracing.StreamElement,        // T
            Messages.Tracing.StreamElement,        // TIn
            List<Messages.Tracing.MessageWithId>,  // TOut
            NotUsed               // TMat
        >(
            Flow.Create<Messages.Tracing.StreamElement>(),
            () =>
            {
                var pendingMessages = new Dictionary<Guid, Messages.Tracing.MessageWithId>();

                return elem =>
                {
                    switch (elem)
                    {
                        case Messages.Tracing.MessageWithId msg:
                            pendingMessages[msg.Id] = msg;
                            return [];
                        case Messages.Tracing.StepBoundary boundary:
                        {
                            var group = boundary.StepIds
                                .Where(pendingMessages.ContainsKey)
                                .Select(id => pendingMessages[id])
                                .ToList();

                            foreach (var id in boundary.StepIds)
                                pendingMessages.Remove(id);

                            group.Add(new Messages.Tracing.MessageWithId(boundary.ToString(),Guid.Empty));
                            
                            return [group];
                        }
                        default:
                            return [];
                    }
                };
            }
        );
    }

}