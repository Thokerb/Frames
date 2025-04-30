namespace Frames.Engine.Dto;

public class ActorLogMessage
{
    public required Guid MessageId { get; set; }
    
    public required string Message { get; set; }
}

