using Akka.Actor;
using Akka.Cluster.Tools.PublishSubscribe;


namespace Frames.Museum.Actors;

public class LocalPubSubMediator : ReceiveActor
{

    private Dictionary<string, HashSet<IActorRef>> _subscribers = new();
    
    public LocalPubSubMediator()
    {
        // this is for consistency with DistributedPubSub
        // only implement Subscribe and SubscribeAck for now plus publish but no groups
        
        
        Receive<Subscribe>(msg =>
        {
            if (!_subscribers.ContainsKey(msg.Topic))
            {
                _subscribers[msg.Topic] = new HashSet<IActorRef>();
            }
            _subscribers[msg.Topic].Add(msg.Ref);
            Sender.Tell(new SubscribeAck(msg));
        });
        
        Receive<Publish>(msg =>
        {
            if (_subscribers.ContainsKey(msg.Topic))
            {
                foreach (var subscriber in _subscribers[msg.Topic])
                {
                    subscriber.Tell(msg.Message);
                }
            }
        });
        
        
    }
    
}