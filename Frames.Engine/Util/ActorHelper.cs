namespace Frames.Engine.Util;

public static class ActorHelper
{

    public static bool IsCoordinator(string actorName)
    {
        return actorName.StartsWith("coordinator-");
    }
    public static bool IsSimulator(string actorName)
    {
        return actorName.StartsWith("simulator-");
    }

    /// <summary>
    /// This is a very basic shard separation.
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="receiver"></param>
    /// <returns></returns>
    public static string GetShardId(string sender, string receiver)
    {
        if (IsSimulator(receiver))
        {
            return sender;
        }
        return receiver;
    }
    
    public static readonly string RootCoordinatorName = "root-coordinator";
}

