namespace Frames.Engine.Util;

/// <summary>
/// This message is sent to an actor before it is stopped.
/// </summary>
public class Stop
{
    public static Stop Instance = new();

    private Stop() { }
}

public class StopNow
{
    public static StopNow Instance = new();

    private StopNow() { }
}