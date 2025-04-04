namespace Frames.Model.Exceptions;

public class IllegalStateException : Exception
{
    public IllegalStateException(string state)
        : base($"Illegal state: {state}")
    {
    }
    
    public IllegalStateException(string state, string message)
        : base($"Illegal state: {state}. {message}")
    {
    }
    
    public IllegalStateException(string state, string message, Exception innerException)
        : base($"Illegal state: {state}. {message}", innerException)
    {
    }
    
}