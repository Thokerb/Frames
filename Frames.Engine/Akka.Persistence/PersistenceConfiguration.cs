namespace Frames.Engine.Akka.Persistence;

public static class PersistenceConfiguration
{
    // if this is too low, snapshots may be taken too frequently, impacting performance
    public static int CyclesUntilSnapshot { get; set; } = 500;
}