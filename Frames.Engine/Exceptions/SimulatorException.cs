namespace Frames.Engine.Exceptions;

/// <summary>
/// These are exceptions, which are thrown when the simulator has illegal configuration.
/// In this case the simulator should stop executing and the user should correct the configuraiton.
/// </summary>
public class SimulatorException : Exception
{
    public SimulatorException(string message) : base(message)
    {
    }
}

public class NoStopConditionException : SimulatorException
{
    public NoStopConditionException() : base("No stop condition was set.")
    {
    }
}

public class IllegalStateModificationException : SimulatorException
{
    public IllegalStateModificationException(string function) : base("Illegal state modification in " + function)
    {
    }
}