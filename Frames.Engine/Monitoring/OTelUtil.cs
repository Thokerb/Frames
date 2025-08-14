using System.Diagnostics;
using Frames.Engine.Messages;

namespace Frames.Engine.Monitoring;

public static class OTelUtil
{

    public static void WriteSharding(this Activity? activity, IShardSeperation msg)
    {
        if (activity == null)
        {
            return;
        }
        
        activity.SetTag("shard.id", msg.ShardId);
        activity.SetTag("entity.name", msg.EntityName);
        activity.SetTag("run.id", msg.RunId);
    }
    
}