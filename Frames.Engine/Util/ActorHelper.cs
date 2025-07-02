namespace Frames.Engine.Util;

public static class ActorHelper
{

    public static bool IsCoordinator(IActorRef actorRef)
    {
        return actorRef.Path.Name.StartsWith("coordinator-");
    }
    public static bool IsSimulator(IActorRef actorRef)
    {
        return actorRef.Path.Name.StartsWith("simulator-");
    }

    /// <summary>
    /// This is a very basic shard separation.
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="receiver"></param>
    /// <returns></returns>
    public static string GetShardId(IActorRef sender, IActorRef receiver)
    {
        if (IsSimulator(receiver))
        {
            return sender.Path.Name;
        }
        return receiver.Path.Name;
    }
}