using System.Diagnostics;
using Akka.DependencyInjection;
using Frames.Engine.Dto;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Engine.Monitoring;
using Frames.Engine.Persistence;
using Frames.Engine.Util;
using Frames.Model;
using Frames.Model.ValueTypes;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace Frames.Engine;

/// <summary>
/// Coordinator class represents a coordinator which is responsible for managing the execution of the coupled model.
/// Based on the RootCoordinator from Theory of M S by Zeigler.
/// </summary>
public class Coordinator : ReceiveActor, ILogReceive
{
    private Instrumentation Instrumentation { get; }
    private IServiceProvider ServiceProvider { get; }

    private ActivityContext _parentContext;

    /// <summary>
    /// Build from coupledModel and Generator
    /// name is from model
    /// ActorRef is the address of the actor
    /// Is a 1:1 mapping
    /// </summary>
    private readonly Dictionary<string, IActorRef> _children = new();

    private readonly ICoupledModel _coupledModel;

    private readonly IActorRef _parent;

    private TimeUnit _timeLast;

    private TimeUnit _timeNext;

    // TODO: is dictionary the best data structure for this?

    /// <summary>
    /// key - name of the child
    /// Can be mapped to address with the _children dictionary
    /// </summary>
    private IDictionary<string, TimeEventTuple> _eventList =
        new Dictionary<string, TimeEventTuple>();

    private Dictionary<string, ExecuteTransition.FinishedExecuteTransition> _timeNextExecuteTransition = new();
    private int _timeNextExecuteTransitionCount;

    /// <summary>
    /// Name of the children, can be mapped to address with the _children dictionary
    /// </summary>
    private Dictionary<string, bool> _imminentChildren = new();

    /// <summary>
    /// string - sender of the message
    /// Bag - message
    /// </summary>
    private Dictionary<string, Bag> _outputMailBag = new();

    private Bag _outputMessageBagParent = new Bag();

    /// <summary>
    /// Key - name of the child
    /// Can be mapped to address with the _children dictionary
    /// </summary>
    private Bag _outputMessageBagChildren = new();

    private bool _initializationCompleted;

    private void CreateChildren()
    {
        // Create a new actor for each child
        foreach (var child in _coupledModel.GetChildren())
        {
            Props props;
            switch (child.Item2)
            {
                // TODO: DI
                case IAtomicModelBase atomicModel:
                    props = Props.Create(() => 
                        new Simulator(Self, atomicModel, ServiceProvider));
                    break;
                case ICoupledModel coupledModel:
                    props = Props.Create<Coordinator>(() => 
                        new Coordinator(Self, coupledModel, ServiceProvider));
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            var actor = Context.ActorOf(props, child.Item1);
            _children.Add(child.Item1, actor);
        }
    }
    
    private ISnapshotManager SnapshotManager { get; }

    public Coordinator(IActorRef parent, ICoupledModel coupledModel,
        IServiceProvider serviceProvider)
    {
        ServiceProvider = serviceProvider;
        SnapshotManager = ServiceProvider.GetRequiredService<ISnapshotManager>();
        Instrumentation = ServiceProvider.GetRequiredService<Instrumentation>();
        ActivitySource = Instrumentation.ActivitySource;
        _coupledModel = coupledModel;
        this._parent = parent;
        CreateChildren();


        // Simulation Messages
        Receive<EngineMessages.StartInitialization>(HandleInitialization);
        Receive<EngineMessages.InitializationCompleted>(HandleInitializationCompleted);
        Receive<ComputeOutput.StartComputeOutput>(HandleStartComputeOutput);
        Receive<ComputeOutput.ComputedOutput>(HandleComputedOutput); // (y,t)
        Receive<ExecuteTransition.StartExecuteTransition>(HandleExecuteTransition);
        Receive<ExecuteTransition.FinishedExecuteTransition>(HandleFinishedExecuteTransition);

        Receive<Simulation.HasStopCondition>((_ => Sender.Tell(_coupledModel.HasStopCondition)));
        ReceiveAsync<Simulation.SaveCheckpoint>(HandleSaveCheckpoint);
        Receive<Simulation.FinishedSaveCheckpoint>(HandleFinishedSaveCheckpoint);
        ReceiveAsync<Simulation.LoadCheckpoint>(HandleLoadCheckpoint);
        Receive<Simulation.FinishedLoadCheckpoint>(HandleFinishedLoadCheckpoint);
    }
    
    private int ChildrenLoadCheckpointCount { get; set; }
    
    private async Task HandleLoadCheckpoint(Simulation.LoadCheckpoint obj)
    {
        await LoadCheckpointAsync(obj.Name);
        
        ChildrenLoadCheckpointCount = 0;
        foreach (var child in _children)
        {
            child.Value.Tell(obj);
        }
    }
    
    private async Task LoadCheckpointAsync(string checkpointName)
    {
        var snapshot = await SnapshotManager.GetSnapshotCoordinatorAsync(checkpointName, Self.Path.Name);

        if (snapshot is null)
        {
            throw new SynchronisationException("error: checkpoint not found");
        }
        
        _timeLast = snapshot.TimeLast;
        _timeNext = snapshot.TimeNext;
        _eventList = snapshot.EventList;
    }
    
    private void HandleFinishedLoadCheckpoint(Simulation.FinishedLoadCheckpoint obj)
    {
        ChildrenLoadCheckpointCount += 1;
        if (ChildrenLoadCheckpointCount == _children.Count)
        {
            _parent.Tell(new Simulation.FinishedLoadCheckpoint(obj.Name));
        }
    }

    private void HandleFinishedSaveCheckpoint(Simulation.FinishedSaveCheckpoint obj)
    {
        if (!(obj.CurrentTime <= _timeNext))
        {
            throw new SynchronisationException("error: bad synchronization");
        }
        ChildrenSaveCheckpointCount += 1;
        if (ChildrenSaveCheckpointCount == _children.Count)
        {
            _parent.Tell(new Simulation.FinishedSaveCheckpoint(obj.Name, obj.CurrentTime));
        }
    }

    private async Task HandleSaveCheckpoint(Simulation.SaveCheckpoint obj)
    {
        if (!(obj.CurrentTime <= _timeNext))
        {
            throw new SynchronisationException("error: bad synchronization");
        }
        await SaveCheckpointAsync(obj.Name);
        
        ChildrenSaveCheckpointCount = 0;
        foreach (var child in _children)
        {
            child.Value.Tell(obj);
        }
    }

    private int ChildrenSaveCheckpointCount { get; set; }

    private async Task SaveCheckpointAsync(string checkpointName)
    {
        var snapshot = new CoordinatorSnapshotObject()
        {
            TimeLast =  _timeLast,
            TimeNext = _timeNext,
            EventList = _eventList,

        };
        
        await SnapshotManager.SaveSnapshotAsync(checkpointName, snapshot, Self.Path.Name);
    }

    private ActivitySource ActivitySource { get; set; }

    private void HandleComputedOutput(ComputeOutput.ComputedOutput obj)
    {
        // mark d as reporting
        var name = _children.FirstOrDefault(x => x.Value.Equals(Sender)).Key;
        _imminentChildren[name] = true;


        // add (yd, d) to mail
        _outputMailBag.Add(name, obj.Output);

        Log.Debug("Received output from children {Child}, with content {Bag}", name, obj.Output);

        // else if this the last d in IMM then -> check external coupling to form sub-bag of parent output
        if (_imminentChildren.Any(x => !x.Value))
        {
            // if this is not the last d in IMM then
            Log.Debug("Not all children have reported yet");
            return;
        }
        else
        {
            Log.Debug("All children have reported");
            _outputMessageBagParent = new Bag();
        }

        // prepare output bag for parent
        // all ports in bag that are not coupled to children are added to the output message bag
        foreach (var entry in _outputMailBag)
        {
            foreach (var input in entry.Value.Inputs)
            {
                if (_coupledModel.HasCouplingOut(input.Key, out var outPort))
                {
                    if (outPort != null)
                    {
                        _outputMessageBagParent.AddInput(outPort, input.Value);

                    }
                }
            }
        }

        // send y-message (yparent , t) to parent
        Log.Debug("Sending output to parent {Parent}, Bag {Bag}", _parent.Path.Name, _outputMessageBagParent);
        _parent.Tell(new ComputeOutput.ComputedOutput(_outputMessageBagParent, obj.CurrentTime)
        {
            ShardId = ActorHelper.GetShardId(Self, _parent)

        });


        // according to M S, here we should create bag yr, which contains all messages that can be sent to the children and execute their transition
        // this does not seem to be correct, since we don't know yet if the parent is sending anything to us
        // therefore we just create the bag for the children and that is it
        // parent coordinator will trigger either executeTransition or give us additional messages


        // line 54
        // for each child check if message can be sent to by its influencers
        _outputMessageBagChildren = CreateOutputMessageBagChildrenFromMail(_outputMailBag);
        _outputMailBag.Clear();
    }


    private Bag CreateOutputMessageBagChildrenFromMail(Dictionary<string, Bag> mail)
    {
        Bag outputMessageBagChildren = new Bag();

        // naming r_child, is so that it matches the book with single letter variable names
        foreach (var r_child in _children)
        {
            // for d such that d ∈ Ir do (=  receiver of the child)
            // we kept track of senders, therefore we can just check if the child is in the list

            foreach (var message in mail)
            {
                // if Z_d,_r(yd) is not empty (= if message can be sent from influencer to child)
                if (message.Value.IsEmpty) continue;

                foreach (var entry in message.Value.Inputs)
                {
                    if (_coupledModel.ChildrenAreCoupled(message.Key, entry.Key, r_child.Key))
                    {
                        outputMessageBagChildren.AddBag(message.Value);
                    }
                }
            }
        }

        return outputMessageBagChildren;
    }

    private void HandleFinishedExecuteTransition(ExecuteTransition.FinishedExecuteTransition obj)
    {
        // TODO: add save guards

        var name = _children.First(x => x.Value.Equals(Sender)).Key;

        _timeNextExecuteTransition.Add(name, obj);

        if (_timeNextExecuteTransition.Count == _timeNextExecuteTransitionCount)
        {
            Log.Debug("Received all responses  Self: {Sender}", Self.Path.Name);


            // update event list
            foreach (var timeUnit in _timeNextExecuteTransition)
            {
                var nameChild = timeUnit.Key;
                var timeNext = timeUnit.Value;

                if (_eventList.ContainsKey(nameChild))
                {
                    _eventList[nameChild] = new TimeEventTuple(_eventList[nameChild].TimeNext, timeNext.TimeNext);
                }
                else
                {
                    throw new SynchronisationException("Event list does not contain child");
                }
            }

            // received all responses
            _timeNext = _eventList.Values.Min(x => x.TimeNext);

            var result = new ExecuteTransition.FinishedExecuteTransition(_timeNext)
            {
                // merge all States to one
                ToStringState = _timeNextExecuteTransition.Values
                    .SelectMany(x => x.ToStringState ?? new Dictionary<string, Guid>())
                    .ToDictionary(x => x.Key,
                        x => x.Value),
                StopConditionReached = _timeNextExecuteTransition.Values.Any(x => x.StopConditionReached),
                ShardId = ActorHelper.GetShardId(Self, _parent)
            };

            _parent.Tell(result);
        }
    }

    private void HandleExecuteTransition(ExecuteTransition.StartExecuteTransition obj)
    {
        _parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);
        using var activity =
            ActivitySource.StartActivity("ExecuteTransition", ActivityKind.Internal, parentContext: _parentContext);
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _coupledModel.GetType().Name);
        activity?.SetTag("CurrentTime", obj.CurrentTime.ToString());
        activity?.SetTag("Input", obj.Input?.ToString() ?? "null");
        if (!(_timeLast <= obj.CurrentTime && obj.CurrentTime <= _timeNext))
        {
            // TODO: what does this mean? taken from the book
            throw new SynchronisationException(
                "error: bad synchronization consult external input coupling to get children influenced by the input");
        }

        // execute transition by using bagged messages in _outputMessageBagChildren
        // merge sent messages with the bagged messages

        if (obj.Input is { IsEmpty: false })
        {
            foreach (var entry in obj.Input.Value.Inputs)
            {
                _outputMessageBagChildren.AddInput(entry.Key, entry.Value);
            }
        }


        // We have Inports with messages _outputMessageBagChildren
        // each port can have multiple outPorts
        // each outPort can have a receiver

        // 2. send message to all children coupled to the input
        Dictionary<string, Bag> receivers = new Dictionary<string, Bag>();
        foreach (var bagChild in _outputMessageBagChildren.Inputs)
        {
            var outModelAndPort = _coupledModel.GetReceivers(bagChild.Key);
            foreach (var outModelAndPortEntry in outModelAndPort)
            {
                if (receivers.ContainsKey(outModelAndPortEntry.model))
                {
                    receivers[outModelAndPortEntry.model].AddInput(outModelAndPortEntry.port, bagChild.Value);
                }
                else
                {
                    receivers.Add(outModelAndPortEntry.model, new Bag((outModelAndPortEntry.port, bagChild.Value)));
                }
            }
        }


        // 3. send all imminent that are not receivers also a x-message with empty bag
        // list of children that are in the imminent list but not in the coupled list
        var imminentButNoReceiver = _imminentChildren
            .Where(x => receivers.All(r => r.Key != x.Key))
            .ToList();

        //  implicit response, line 40 is handled in the FinishedExecuteTransition method
        _timeNextExecuteTransition.Clear();
        _timeNextExecuteTransitionCount = imminentButNoReceiver.Count + receivers.Count;
        _timeLast = obj.CurrentTime;


        // trigger execute transition for all selected at the end, because otherwise there are potential race conditions

        foreach (var receiver in receivers)
        {
            var receiverActors = _children[receiver.Key];
            receiverActors.Tell(new ExecuteTransition.StartExecuteTransition(receiver.Value, obj.CurrentTime)
            {
                ShardId = ActorHelper.GetShardId(Self, receiverActors)
            });
        }

        foreach (var uncoupledChild in imminentButNoReceiver)
        {
            var actor = _children[uncoupledChild.Key];
            actor.Tell(new ExecuteTransition.StartExecuteTransition(Bag.Empty, obj.CurrentTime)
            {
                ShardId = ActorHelper.GetShardId(Self, actor)
            });
        }
    }

    private void HandleStartComputeOutput(ComputeOutput.StartComputeOutput obj)
    {
        _parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);
        using var activity = ActivitySource.StartActivity("ComputeOutput", ActivityKind.Internal, parentContext: _parentContext);
        if (!obj.CurrentTime.Equals(_timeNext))
        {
            throw new SynchronisationException("Current time does not match time next");
        }

        _imminentChildren = _eventList
            .Where(x => x.Value.TimeNext.Equals(_timeNext))
            .Select(x => (x.Key, false)) // at this point none have reported
            .ToDictionary(x => x.Key, x => x.Item2);

        foreach (var imminentChild in _imminentChildren)
        {
            var actor = _children[imminentChild.Key];
            actor.Tell(new ComputeOutput.StartComputeOutput(obj.CurrentTime)
            {
                ShardId = ActorHelper.GetShardId(Self, actor)
            });
        }
    }

    private void HandleInitializationCompleted(EngineMessages.InitializationCompleted obj)
    {
        if (_initializationCompleted)
        {
            throw new SynchronisationException("Initialization already completed");
        }

        // Get the sender name
        var name = _children.FirstOrDefault(x => x.Value.Equals(Sender)).Key;

        _eventList.Add(name, new TimeEventTuple(obj.TimeLast, obj.TimeNext));

        if (_eventList.Count == _children.Count)
        {
            _initializationCompleted = true;

            // TODO: why max ?
            _timeLast = _eventList.Values.Max(x => x.TimeLast);
            _timeNext = _eventList.Values.Min(x => x.TimeNext);

            // tell parent
            _parent.Tell(new EngineMessages.InitializationCompleted(_timeLast, _timeNext)
            {
                ShardId = ActorHelper.GetShardId(Self, _parent)
            });
        }
    }

    private void HandleInitialization(EngineMessages.StartInitialization obj)
    {
        _parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);
        using var activity =
            ActivitySource.StartActivity("Initialization", ActivityKind.Internal, parentContext: _parentContext);
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _coupledModel.GetType().Name);
        activity?.SetTag("CurrentTime", obj.CurrentTime.ToString());
        foreach (var child in _children)
        {
            activity?.SetTag("Child", child.Key);
            child.Value.Tell(new EngineMessages.StartInitialization(obj.CurrentTime)
            {
                ShardId = ActorHelper.GetShardId(Self, child.Value)
            });
        }
    }
}