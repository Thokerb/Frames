namespace Frames.Engine.Exceptions;

public class SynchronisationException : Exception
{
    public SynchronisationException(string message) : base(message)
    {
    }

    public SynchronisationException(string message, Exception innerException) : base(message, innerException)
    {
    }
    
}