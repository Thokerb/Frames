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
    
    public static string RootCoordinatorName(Guid id) => $"{RootCoordinatorIdentifier}-{id}";
    public static string RootCoordinatorIdentifier = "root-coordinator";

    public static string GetEntityNameFromSender(IActorRef pathName)
    {
        
        var input = pathName.Path.Elements.Last();
        var key = input.Split("-%5B").First();
        var result = key.Substring(0, key.Length - 37); // default 36 characters for a GUID + 1 for the hyphen
        return result;
    }
}

