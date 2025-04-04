namespace Frames.Model.Exceptions;

public class UnknownStateException : Exception
{
    public UnknownStateException(string state)
        : base($"Unknown state: {state}")
    {
    }

    public UnknownStateException(string state, Exception innerException)
        : base($"Unknown state: {state}", innerException)
    {
    }
    
}