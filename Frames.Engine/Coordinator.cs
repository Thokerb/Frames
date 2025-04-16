using Frames.Engine.DataStructures;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Serilog;

namespace Frames.Engine;


/// <summary>
/// Coordinator class represents a coordinator which is responsible for managing the execution of the coupled model.
/// Based on the RootCoordinator from Theory of M&S by Zeigler.
/// </summary>
public class Coordinator : ReceiveActor, ILogReceive
{
    /// <summary>
    /// Build from coupledModel and Generator
    /// name is from model
    /// ActorRef is the address of the actor
    /// Is a 1:1 mapping
    /// </summary>
    private Dictionary<string, IActorRef> _children = new();
    
    private ICoupledModel _coupledModel;
    
    private IActorRef? _parent;

    private TimeUnit _timeLast;
    
    private TimeUnit _timeNext;
    
    // TODO: is dictionary the best data structure for this?
    
    /// <summary>
    /// key - name of the child
    /// Can be mapped to address with the _children dictionary
    /// </summary>
    private readonly IDictionary<string, (TimeUnit timeLast, TimeUnit timeNext)> _eventList  = new Dictionary<string, (TimeUnit timeLast, TimeUnit timeNext)>();
    
    private Dictionary<string, TimeUnit> _timeNextExecuteTransition = new();
    private int _timeNextExecuteTransitionCount = 0;
    
    /// <summary>
    /// Name of the children, can be mapped to address with the _children dictionary
    /// </summary>
    private Dictionary<string,bool> _imminentChildren;

    /// <summary>
    /// string - sender of the message
    /// Bag - message
    /// </summary>
    private Dictionary<string,Bag> _outputMailBag = new();
    
    private Bag _outputMessageBagParent;

    /// <summary>
    /// Key - name of the child
    /// Can be mapped to address with the _children dictionary
    /// </summary>
    private Dictionary<string, Bag> _outputMessageBagChildren = new();
    private bool _initializationCompleted;
    
    private void CreateChildren()
    {
        foreach (var child in _coupledModel.GetChildren())
        {
            Props props;
            // Create a new actor for each child
            props = child.Item2 switch
            {
                IAtomicModelBase atomicModel => Props.Create(() => new Simulator(Self, atomicModel)),
                ICoupledModel coupledModel => Props.Create(() => new Coordinator(coupledModel, Self)),
                _ => throw new ArgumentOutOfRangeException()
            };
            
            var actor = Context.ActorOf(props, child.Item1);
            _children.Add(child.Item1, actor);
        }
    }

    public Coordinator(ICoupledModel coupledModel, IActorRef? parent)
    {
        _coupledModel = coupledModel;
        this._parent = parent;
        CreateChildren();

        
        // Simulation Messages
        Receive<Initialization.StartInitialization>(HandleInitialization);
        Receive<Initialization.InitializationCompleted>(HandleInitializationCompleted);
        Receive<ComputeOutput.StartComputeOutput>(HandleStartComputeOutput);
        Receive<ComputeOutput.ComputedOutput>(HandleComputedOutput); // (y,t)
        Receive<ExecuteTransition.StartExecuteTransition>(HandleExecuteTransition);
        Receive<ExecuteTransition.FinishedExecuteTransition>(HandleFinishedExecuteTransition);
    }

    private void HandleComputedOutput(ComputeOutput.ComputedOutput obj)
    {
        // if this is not the last d in IMM then
        // TODO: why not for last ?

        // mark d as reporting
        var name = _children.FirstOrDefault(x => x.Value.Equals(Sender)).Key;
        _imminentChildren[name] = true;

        
        // add (yd, d) to mail
        _outputMailBag.Add(name, obj.Output);
        
        // TODO: should we return if we have not received all responses?
        
        Log.Information("RECEIVED OUTPUT FROM CHILDREN {Child}", name);

        // else if this the last d in IMM then -> check external coupling to form sub-bag of parent output
        if (_imminentChildren.Any(x => !x.Value) )
        {
            Log.Information("NOT ALL CHILDREN HAVE RESPONDED");
            return;
        }
        else {
                Log.Information("RECEIVED OUTPUT FROM ALL CHILDREN");
                _outputMessageBagParent   = new Bag();
        }
        
        // prepare output bag for parent
        // all ports in bag that are not coupled to children are added to the output message bag
        foreach (var entry in _outputMailBag)
        {
            foreach (var input in entry.Value.Inputs)
            {
                
                if (!_coupledModel.HasCoupling(entry.Key, input.Key))
                {
                    _outputMessageBagParent.AddInput(input.Key, input.Value);
                }
            }
            
        }
        // send y-message (yparent , t) to parent
        

        if (!_outputMessageBagParent.IsEmpty)
        {
            // ReSharper disable once UseWithExpressionToCopyRecord. This is an independent command. Dont want to create confusion by fancy syntax
            _parent.Tell(new ComputeOutput.ComputedOutput(_outputMessageBagParent, obj.CurrentTime));
        }
        
        // line 54
        // for each child check if message can be sent to by its influencers
        // naming d_child, is so that it matches the book with single letter variable names
        
        // TODO: do we need to reset _outputMessageBagChildren
        _outputMessageBagChildren.Clear();
        
        
        
        foreach (var r_child in _children)
        {
            // for d such that d ∈ Ir do (=  receiver of the child)
            var influencers = _coupledModel.GetInfluencer(r_child.Key);
            // TODO: why we need influencers, when we know the Sender? => try using sender from messages in mailbag

            foreach (var message in _outputMailBag)
            {
                // if Z_d,_r(yd) is not empty (= if message can be sent from influencer to child)
                
                // TODO: can Bag have more than one input?

                if (!message.Value.IsEmpty)
                {
                    foreach (var entry in message.Value.Inputs)
                    {
                        if (_coupledModel.ChildrenAreCoupled(message.Key, entry.Key, r_child.Key))
                        {
                            // TODO: do we need to merge the bags?
                        
                            var transformedBag = new Bag((_coupledModel.GetCouplingOutPort(message.Key, entry.Key, r_child.Key), entry.Value));

                            if (_outputMessageBagChildren.ContainsKey(r_child.Key))
                            {
                                _outputMessageBagChildren[r_child.Key].AddBag(transformedBag);
                            }
                            else
                            {
                                _outputMessageBagChildren.Add(r_child.Key,transformedBag);
                            }
                        }
                    }
                    
                
                }
            }
            
            // foreach (var d_influencer in influencers) { }
        }
        // receivers = {r | r ∈ children, yr ≠ Φ}
        var receivers = _outputMessageBagChildren
            .Where(x => x.Value.Inputs.Count > 0)
            .Select(x => x.Key)
            .ToList();

        foreach (var receiver in receivers)
        {
            // send x-messages (yr, t) to r
            var actor = _children[receiver];
            actor.Tell(new ExecuteTransition.StartExecuteTransition(_outputMessageBagChildren[receiver], obj.CurrentTime));
            
        }
        
        //  for r ∈ IMM and not in receivers do
        
        var uncoupledChildren = _imminentChildren
            .Where(x => !receivers.Contains(x.Key))
            .ToList();
        foreach (var uncoupledChild in uncoupledChildren)
        {
            // send x-messages (Φ, t) to r
            var actor = _children[uncoupledChild.Key];
            actor.Tell(new ExecuteTransition.StartExecuteTransition(Bag.Empty, obj.CurrentTime));
        }
        
        
           // This is done in the HandleFinishedExecuteTransition method
           
           _timeLast = obj.CurrentTime;

           // TODO: can we have a conflict here, since it is also used by other method
           Log.Information("GETTING READY TO RECEIVE RESPONSES BY HANDLE COMPUTEOUTPUT");
           _timeNextExecuteTransition.Clear();
           _timeNextExecuteTransitionCount = receivers.Count + uncoupledChildren.Count;
        
           // clean up
           _outputMailBag.Clear();
        
    }

    private void HandleFinishedExecuteTransition(ExecuteTransition.FinishedExecuteTransition obj)
    {
        // TODO: add save guards
        
        var name = _children.First(x => x.Value.Equals(Sender)).Key;
        
        _timeNextExecuteTransition.Add(name, obj.TimeNext);

        if (_timeNextExecuteTransition.Count == _timeNextExecuteTransitionCount)
        {
            Log.Information("RECEIVED ALL RESPONSES");
            
            // received all responses
            _timeNext = _timeNextExecuteTransition.Values.Min();
            
            
            // update event list
            foreach (var timeUnit in _timeNextExecuteTransition)
            {
                var nameChild = timeUnit.Key;
                var timeNext = timeUnit.Value;
                
                if (_eventList.ContainsKey(nameChild))
                {
                    _eventList[nameChild] = (_eventList[nameChild].timeNext, timeNext);
                }
                else
                {
                    throw new SynchronisationException("Event list does not contain child");
                }
            }
            
            // send to parent
            // TODO check if this is correct
            _parent.Tell(new ExecuteTransition.FinishedExecuteTransition(_timeNext));
        }
    }

    private void HandleExecuteTransition(ExecuteTransition.StartExecuteTransition obj)
    {
        if (!(_timeLast <= obj.CurrentTime && obj.CurrentTime<= _timeNext))
        {
            // TODO: what does this mean? taken from the book
            throw new SynchronisationException(
                "error: bad synchronization consult external input coupling to get children influenced by the input");
        }
        
        // TODO: verify code
        // 1. determine receivers by checking all children and if they are connected through coupling

        List<string> receivers = obj.Input == null ? new List<string>() :
        _coupledModel.GetCouplings()
            .Where(x => obj.Input.Inputs.ContainsKey(x.inPort))
            .Select(x => x.outModel)
            .ToList();
        List<IActorRef> receiverActors = receivers.Select(x => _children[x]).ToList();
        
        // 2. send message to all children coupled to the input
        foreach (var receiver in receiverActors)
        {
            receiver.Tell(new ExecuteTransition.StartExecuteTransition(obj.Input, obj.CurrentTime));
        }
        
        // TODO: verify imminent are set here
        
        // 3. send all imminent that are not receivers also a x-message with empty bag
        // list of children that are in the imminent list but not in the coupled list
        var imminentButNoReceiver = _imminentChildren
            .Where(x => !receivers.Contains(x.Key))
            .ToList();
        foreach (var uncoupledChild in imminentButNoReceiver)
        {
            var actor = _children[uncoupledChild.Key];
            actor.Tell(new ExecuteTransition.StartExecuteTransition(Bag.Empty, obj.CurrentTime));
        }
        
        _timeLast = obj.CurrentTime;
        // TODO: implicit response, line 40 is handled in the FinishedExecuteTransition method
        Log.Information("GETTING READY TO RECEIVE RESPONSES BY HANDLE EXECUTETRANSITION");
        _timeNextExecuteTransition.Clear();
        _timeNextExecuteTransitionCount = imminentButNoReceiver.Count + receivers.Count;
    }

    private void HandleStartComputeOutput(ComputeOutput.StartComputeOutput obj)
    {
        if(!obj.CurrentTime.Equals(_timeNext))
        {
            throw new SynchronisationException("Current time does not match time next");
        }
        
        _imminentChildren = _eventList
            .Where(x => x.Value.timeNext.Equals(_timeNext))
            .Select(x => (x.Key, false)) // at this point none have reported
            .ToDictionary(x => x.Key, x => x.Item2);

        foreach (var imminentChild in _imminentChildren)
        {
            var actor = _children[imminentChild.Key];
            actor.Tell(new ComputeOutput.StartComputeOutput(obj.CurrentTime));
        }
    }

    private void HandleInitializationCompleted(Initialization.InitializationCompleted obj)
    {
        if (_initializationCompleted)
        {
            throw new SynchronisationException("Initialization already completed");
        }
        
        // Get the sender name
        var name = _children.FirstOrDefault(x => x.Value.Equals(Sender)).Key;
        
        _eventList.Add(name,(obj.TimeLast, obj.TimeNext));

        if (_eventList.Count == _children.Count)
        {
            _initializationCompleted = true;
            
            // TODO: why max ?
            _timeLast = _eventList.Values.Max(x => x.timeLast);
            _timeNext = _eventList.Values.Min(x => x.timeNext);
            
            // tell parent
            _parent.Tell(new Initialization.InitializationCompleted(_timeLast, _timeNext));
        }
    }

    private void HandleInitialization(Initialization.StartInitialization obj)
    {
        foreach (var child in _children)
        {
            child.Value.Tell(new Initialization.StartInitialization(obj.CurrentTime));
        }
    }
}