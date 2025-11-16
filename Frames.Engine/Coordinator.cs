using System.Diagnostics;
using Akka.DependencyInjection;
using Akka.Hosting;
using Akka.Persistence;
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


// this is only set once at the start of the simulation, therefore we store it in its own class
public class CoordinatorBaseState
{
        
    public string Name {set; get; }

    public string ParentName { get; set; }
    
    public ICoupledModel _coupledModel;

    /// <summary>
    /// Build from coupledModel and Generator
    /// name is from model
    /// ActorRef is the address of the actor
    /// Is a 1:1 mapping
    /// </summary>
    public readonly Dictionary<string, IActorRef> _children = new();
    public Guid RunId { get; set; }
}

// this is changing during the simulation, therefore it is stored in its own class
public class CoordinatorState
{
    
    public TimeUnit _timeLast;

    public TimeUnit _timeNext;
    
    /// <summary>
    /// key - name of the child
    /// Can be mapped to address with the _children dictionary
    /// </summary>
    public IDictionary<string, TimeEventTuple> _eventList = new Dictionary<string, TimeEventTuple>();

    public Dictionary<string, ExecuteTransition.FinishedExecuteTransition> _timeNextExecuteTransition = new();
    public int _timeNextExecuteTransitionCount;
    
    /// <summary>
    /// Name of the children, can be mapped to address with the _children dictionary
    /// </summary>
    public Dictionary<string, bool> _imminentChildren = new();

    /// <summary>
    /// string - sender of the message
    /// Bag - message
    /// </summary>
    public Dictionary<string, Bag> _outputMailBag = new();

    public Bag _outputMessageBagParent = new Bag();

    /// <summary>
    /// Key - name of the child
    /// Can be mapped to address with the _children dictionary
    /// </summary>
    public Bag _outputMessageBagChildren = new();

    public bool _initializationCompleted;
    public int ChildrenLoadCheckpointCount { get; set; }
    
    public int ChildrenSaveCheckpointCount { get; set; }

}

public class CoordinatorStateSnapshot
{
    public required CoordinatorBaseState BaseState { get; init; }
    public required CoordinatorState State { get; init; }
}

/// <summary>
/// Coordinator class represents a coordinator which is responsible for managing the execution of the coupled model.
/// Based on the RootCoordinator from Theory of M S by Zeigler.
/// </summary>
public class Coordinator : ReceivePersistentActor, ILogReceive
{
    
    protected override SupervisorStrategy SupervisorStrategy()
    {
        return new OneForOneStrategy(
            maxNrOfRetries: 10,
            withinTimeMilliseconds: 30 * 1000,
            localOnlyDecider: ex =>
            {
                switch (ex)
                {
                    case SimulatorException:
                        return Directive.Escalate;
                    case SynchronisationException:
                        return Directive.Escalate;
                    default:
                        return Directive.Escalate;
                }
            },
            loggingEnabled: true
        );
    }
    
    private int CycleCounter { get; set; } = 0;
    
    private int CyclesUntilSnapshot { get; } = 100;
    
    private Instrumentation Instrumentation { get; }
    private IServiceProvider ServiceProvider { get; }
    public IActorRef _parent => _baseState.ParentName.StartsWith(ActorHelper.RootCoordinatorIdentifier) ?  ActorRegistry.For(Context.System)
        .Get<RootCoordinator>() : ActorRegistry.For(Context.System).Get<Coordinator>();
    
    private CoordinatorState _state = new ();
    private CoordinatorBaseState _baseState = new ();

    private async Task<Dictionary<string, IActorRef>> CreateChildrenAsync(Guid runId, string name)
    {
        // Create a new actor for each child
        var children = new Dictionary<string, IActorRef>();
        foreach (var child in _baseState._coupledModel.GetChildren())
        {
            IActorRef actor;
            switch (child.Item2)
            {
                // TODO: DI
                case IAtomicModelBase atomicModel:
                    // props = Props.Create(() => 
                    //     new Simulator(ServiceProvider)); //TODO Self, atomicModel,
                    
                    actor = await ActorRegistry.For(Context.System).GetAsync<Simulator>();
                    await actor.Ask(new EngineMessages.SetupSimulator(atomicModel,  child.Item1, name){
                        ShardId = name,  // Simulator should be in the same shard as the coordinator
                        RunId = runId,
                    });

                    break;
                case ICoupledModel coupledModel:
                    actor = await ActorRegistry.For(Context.System).GetAsync<Coordinator>();
                    await actor.Ask(new EngineMessages.SetupCoordinator(coupledModel, child.Item1, name)
                    {
                        RunId = runId,
                    });
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

             
            children.Add(child.Item1, actor);
        }

        return children;
    }

    private ISnapshotManager SnapshotManager { get; }

    
    public override string PersistenceId { get; }
    
    public Coordinator(string persistenceId, IServiceProvider serviceProvider)
    {
        PersistenceId = persistenceId;
        ServiceProvider = serviceProvider;
        SnapshotManager = ServiceProvider.GetRequiredService<ISnapshotManager>();
        Instrumentation = ServiceProvider.GetRequiredService<Instrumentation>();
        ActivitySource = Instrumentation.ActivitySource;


        Recover<SnapshotOffer>(offer =>
        {
            if (offer.Snapshot is CoordinatorStateSnapshot state)
            {
                _state = state.State;
                _baseState = state.BaseState;
            }
        });
        Command<SaveSnapshotSuccess>(success => {
            // soft-delete the journal up until the sequence # at
            // which the snapshot was taken
            DeleteMessages(success.Metadata.SequenceNr); 
        });
        
        Recover<CoordinatorState>(state =>
        {
            _state = state;
        });
        
        Recover<CoordinatorBaseState>(baseState =>
        {
            _baseState = baseState;
        });
        Command<DeleteMessagesSuccess>(success =>
        {
            Serilog.Log.Verbose("[{Name} - PERSISTENCE] Deleted messages up to sequence number {SequenceNr}", Self.Path.Name, success.ToSequenceNr);
        });
        // Simulation Messages
        Command<EngineMessages.StartInitialization>(HandleInitialization);
        Command<EngineMessages.InitializationCompleted>(HandleInitializationCompleted);
        CommandAsync<EngineMessages.SetupCoordinator>(async msg =>
        {
            // This is used to setup the simulator actor with the coordinator
            // It is not used in the coordinator itself, but in the simulator actor
            // Therefore we just ignore it here

            // _parent = msg.Parent;
            _baseState.ParentName = msg.ParentName;
            _baseState.Name = msg.Name;
            _baseState.RunId = msg.RunId;
            _baseState._coupledModel = msg.CoupledModel;
            var children = await CreateChildrenAsync(msg.RunId, msg.Name);

            foreach (var child in children)
            {
                _baseState._children.Add(child.Key, child.Value);
            }
            Persist(_baseState, st =>
            {
                _baseState = st;
            });
            Sender.Tell("done");
        });

        Command<ComputeOutput.StartComputeOutput>(HandleStartComputeOutput);
        Command<ComputeOutput.ComputedOutput>(HandleComputedOutput); // (y,t)
        Command<ExecuteTransition.StartExecuteTransition>(HandleExecuteTransition);
        Command<ExecuteTransition.FinishedExecuteTransition>(HandleFinishedExecuteTransition);

        CommandAsync<Simulation.HasStopCondition>((async _ =>
        {
            foreach (var child in _baseState._children)
            {
                var actor = child.Value;
                var resp = await actor.Ask<bool>(new Simulation.HasStopCondition()
                {
                    ShardId = ActorHelper.GetShardId(_baseState.Name, child.Key),
                    EntityName = child.Key,
                    RunId = _baseState.RunId,
                });
                if (resp)
                {
                    Sender.Tell(true);
                    break; // if one child has a stop condition, we can stop checking
                }
            }
            Sender.Tell(false); // if no child has a stop condition, we return false
            
        }));
        CommandAsync<Simulation.SaveCheckpoint>(HandleSaveCheckpoint);
        Command<Simulation.FinishedSaveCheckpoint>(HandleFinishedSaveCheckpoint);
        CommandAsync<Simulation.LoadCheckpoint>(HandleLoadCheckpoint);
        Command<Simulation.FinishedLoadCheckpoint>(HandleFinishedLoadCheckpoint);
    }


    
    private async Task HandleLoadCheckpoint(Simulation.LoadCheckpoint obj)
    {
        await LoadCheckpointAsync(obj.Name);
        
        _state.ChildrenLoadCheckpointCount = 0;
        foreach (var child in _baseState._children)
        {
            child.Value.Tell(obj with { EntityName = child.Key, ShardId = ActorHelper.GetShardId(_baseState.Name, child.Key) });
        }

        PersistState();
    }

    private void PersistState()
    {
        // lower consistency, much higher performance. Doesn't wait for the message to be persisted before processing the next message in the mailbox.
        // order in which those events are persisted will be preserved 
        // This means you probably have to modify your actor's in-memory state before
        // https://stackoverflow.com/questions/65918832/akka-net-with-persistence-dropping-messages-when-cpu-in-under-high-pressure
        PersistAsync(_state, st =>
        {
            
            _state = st;
            
            if(++CycleCounter >= CyclesUntilSnapshot)
            {
                CycleCounter = 0;
                SaveSnapshot(new CoordinatorStateSnapshot()
                {
                    BaseState = _baseState,
                    State = _state,
                });
            }
        });
    }
    
    private async Task LoadCheckpointAsync(string checkpointName)
    {
        var snapshot = await SnapshotManager.GetSnapshotCoordinatorAsync(checkpointName, Self.Path.Name);

        if (snapshot is null)
        {
            throw new SynchronisationException("error: checkpoint not found");
        }
        
        _state._timeLast = snapshot.TimeLast;
        _state._timeNext = snapshot.TimeNext;
        _state._eventList = snapshot.EventList;
    }
    
    private void HandleFinishedLoadCheckpoint(Simulation.FinishedLoadCheckpoint obj)
    {
        _state.ChildrenLoadCheckpointCount += 1;
        if (_state.ChildrenLoadCheckpointCount == _baseState._children.Count)
        {
            _parent.Tell(new Simulation.FinishedLoadCheckpoint(obj.Name)
            {
                ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.ParentName),
                EntityName = _baseState.ParentName,
                RunId = _baseState.RunId,
            });
        }
        PersistState();

        
    }

    private void HandleFinishedSaveCheckpoint(Simulation.FinishedSaveCheckpoint obj)
    {
        if (!(obj.CurrentTime <= _state._timeNext))
        {
            throw new SynchronisationException("error: bad synchronization");
        }
        _state.ChildrenSaveCheckpointCount += 1;
        if (_state.ChildrenSaveCheckpointCount == _baseState._children.Count)
        {
            _parent.Tell(new Simulation.FinishedSaveCheckpoint(obj.Name, obj.CurrentTime)
            {
                ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.ParentName),
                EntityName = _baseState.ParentName,
                RunId = _baseState.RunId,

            });
        }
        PersistState();

    }

    private async Task HandleSaveCheckpoint(Simulation.SaveCheckpoint obj)
    {
        if (!(obj.CurrentTime <= _state._timeNext))
        {
            throw new SynchronisationException("error: bad synchronization");
        }
        await SaveCheckpointAsync(obj.Name);
        
        _state.ChildrenSaveCheckpointCount = 0;
        foreach (var child in _baseState._children)
        {
            child.Value.Tell(obj with {EntityName = child.Key, ShardId = ActorHelper.GetShardId(_baseState.Name, child.Key)});
        }
        PersistState();

        
    }


    private async Task SaveCheckpointAsync(string checkpointName)
    {
        var snapshot = new CoordinatorSnapshotObject()
        {
            TimeLast =  _state._timeLast,
            TimeNext = _state._timeNext,
            EventList = _state._eventList,

        };
        
        await SnapshotManager.SaveSnapshotAsync(checkpointName, snapshot, Self.Path.Name);
    }

    private ActivitySource ActivitySource { get; set; }

    private void HandleComputedOutput(ComputeOutput.ComputedOutput obj)
    {
        // mark d as reporting
        var name = _baseState._children.FirstOrDefault(x => x.Key.Equals(ActorHelper.GetEntityNameFromSender(Sender))).Key;
        _state._imminentChildren[name] = true;


        // add (yd, d) to mail
        _state._outputMailBag.Add(name, obj.Output);

        Serilog.Log.Debug("Received output from children {Child}, with content {Bag}", name, obj.Output);

        // else if this the last d in IMM then -> check external coupling to form sub-bag of parent output
        if (_state._imminentChildren.Any(x => !x.Value))
        {
            // if this is not the last d in IMM then
            Serilog.Log.Debug("Not all children have reported yet");
            return;
        }

        Serilog.Log.Debug("All children have reported");
        _state._outputMessageBagParent = new Bag();

        // prepare output bag for parent
        // all ports in bag that are not coupled to children are added to the output message bag
        foreach (var entry in _state._outputMailBag)
        {
            foreach (var input in entry.Value.Inputs)
            {
                if (_baseState._coupledModel.HasCouplingOut(input.Key, out var outPort))
                {
                    if (outPort != null)
                    {
                        _state._outputMessageBagParent.AddInput(outPort, input.Value);

                    }
                }
            }
        }

        // send y-message (yparent , t) to parent
        Serilog.Log.Debug("Sending output to parent {Parent}, Bag {Bag}", _parent.Path.Name, _state._outputMessageBagParent);
        _parent.Tell(new ComputeOutput.ComputedOutput(_state._outputMessageBagParent, obj.CurrentTime)
        {
            ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.ParentName),
            EntityName = _baseState.ParentName,
            RunId = _baseState.RunId,
        });


        // according to M S, here we should create bag yr, which contains all messages that can be sent to the children and execute their transition
        // this does not seem to be correct, since we don't know yet if the parent is sending anything to us
        // therefore we just create the bag for the children and that is it
        // parent coordinator will trigger either executeTransition or give us additional messages


        // line 54
        // for each child check if message can be sent to by its influencers
        _state._outputMessageBagChildren = CreateOutputMessageBagChildrenFromMail(_state._outputMailBag);
        _state._outputMailBag.Clear();
        
        PersistState();

    }


    private Bag CreateOutputMessageBagChildrenFromMail(Dictionary<string, Bag> mail)
    {
        Bag outputMessageBagChildren = new Bag();

        // naming r_child, is so that it matches the book with single letter variable names
        foreach (var r_child in _baseState._children)
        {
            // for d such that d ∈ Ir do (=  receiver of the child)
            // we kept track of senders, therefore we can just check if the child is in the list

            foreach (var message in mail)
            {
                // if Z_d,_r(yd) is not empty (= if message can be sent from influencer to child)
                if (message.Value.IsEmpty) continue;

                foreach (var entry in message.Value.Inputs)
                {
                    if (_baseState._coupledModel.ChildrenAreCoupled(message.Key, entry.Key, r_child.Key))
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

        var name = _baseState._children.FirstOrDefault(x => x.Key.Equals(ActorHelper.GetEntityNameFromSender(Sender))).Key;

        _state._timeNextExecuteTransition.Add(name, obj);

        if (_state._timeNextExecuteTransition.Count == _state._timeNextExecuteTransitionCount)
        {
            Serilog.Log.Debug("Received all responses  Self: {Sender}", Self.Path.Name);


            // update event list
            foreach (var timeUnit in _state._timeNextExecuteTransition)
            {
                var nameChild = timeUnit.Key;
                var timeNext = timeUnit.Value;

                if (_state._eventList.ContainsKey(nameChild))
                {
                    _state._eventList[nameChild] = new TimeEventTuple(_state._eventList[nameChild].TimeNext, timeNext.TimeNext);
                }
                else
                {
                    throw new SynchronisationException("Event list does not contain child");
                }
            }

            // received all responses
            _state._timeNext = _state._eventList.Values.Min(x => x.TimeNext);

            var result = new ExecuteTransition.FinishedExecuteTransition(_state._timeNext)
            {
                // merge all States to one
                ToStringState = _state._timeNextExecuteTransition.Values
                    .SelectMany(x => x.ToStringState ?? []).ToList(),
                StopConditionReached = _state._timeNextExecuteTransition.Values.Any(x => x.StopConditionReached),
                ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.ParentName),
                EntityName = _baseState.ParentName,
                RunId = _baseState.RunId,
            };

            _parent.Tell(result);
        }
        PersistState();

        
    }

    private void HandleExecuteTransition(ExecuteTransition.StartExecuteTransition obj)
    {
        var parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);
        using var activity =
            ActivitySource.StartActivity("ExecuteTransition", ActivityKind.Internal, parentContext: parentContext);
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _baseState._coupledModel.GetType().Name);
        activity?.SetTag("CurrentTime", obj.CurrentTime.ToString());
        activity?.SetTag("Input", obj.Input?.ToString() ?? "null");
        activity?.WriteSharding(obj);
        if (!(_state._timeLast <= obj.CurrentTime && obj.CurrentTime <= _state._timeNext))
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
                _state._outputMessageBagChildren.AddInput(entry.Key, entry.Value);
            }
        }


        // We have Inports with messages _outputMessageBagChildren
        // each port can have multiple outPorts
        // each outPort can have a receiver

        // 2. send message to all children coupled to the input
        Dictionary<string, Bag> receivers = new Dictionary<string, Bag>();
        foreach (var bagChild in _state._outputMessageBagChildren.Inputs)
        {
            var outModelAndPort = _baseState._coupledModel.GetReceivers(bagChild.Key);
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
        var imminentButNoReceiver = _state._imminentChildren
            .Where(x => receivers.All(r => r.Key != x.Key))
            .ToList();

        //  implicit response, line 40 is handled in the FinishedExecuteTransition method
        _state._timeNextExecuteTransition.Clear();
        _state._timeNextExecuteTransitionCount = imminentButNoReceiver.Count + receivers.Count;
        _state._timeLast = obj.CurrentTime;


        // trigger execute transition for all selected at the end, because otherwise there are potential race conditions

        foreach (var receiver in receivers)
        {
            var receiverActors = _baseState._children[receiver.Key];
            receiverActors.Tell(new ExecuteTransition.StartExecuteTransition(receiver.Value, obj.CurrentTime, activity)
            {
                ShardId = ActorHelper.GetShardId(_baseState.Name, receiver.Key),
                EntityName = receiver.Key,
                RunId = _baseState.RunId,
            });
        }

        foreach (var uncoupledChild in imminentButNoReceiver)
        {
            var actor = _baseState._children[uncoupledChild.Key];
            actor.Tell(new ExecuteTransition.StartExecuteTransition(Bag.Empty, obj.CurrentTime, activity)
            {
                ShardId = ActorHelper.GetShardId(_baseState.Name,  uncoupledChild.Key),
                EntityName = uncoupledChild.Key,
                RunId = _baseState.RunId,
            });
        }
        
        PersistState();

        
    }

    private void HandleStartComputeOutput(ComputeOutput.StartComputeOutput obj)
    {
        var parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);
        using var activity = ActivitySource.StartActivity("ComputeOutput", ActivityKind.Internal, parentContext: parentContext);
        activity?.WriteSharding(obj);
        if (!obj.CurrentTime.Equals(_state._timeNext))
        {
            throw new SynchronisationException("Current time does not match time next");
        }

        _state._imminentChildren = _state._eventList
            .Where(x => x.Value.TimeNext.Equals(_state._timeNext))
            .Select(x => (x.Key, false)) // at this point none have reported
            .ToDictionary(x => x.Key, x => x.Item2);

        foreach (var imminentChild in _state._imminentChildren)
        {
            var actor = _baseState._children[imminentChild.Key];
            actor.Tell(new ComputeOutput.StartComputeOutput(obj.CurrentTime, activity)
            {
                ShardId = ActorHelper.GetShardId(_baseState.Name, imminentChild.Key),
                EntityName = imminentChild.Key,
                RunId =_baseState.RunId,
            });
        }
        
        PersistState();

        
    }

    private void HandleInitializationCompleted(EngineMessages.InitializationCompleted obj)
    {
        if (_state._initializationCompleted)
        {
            throw new SynchronisationException("Initialization already completed");
        }
        
        
        
            
        // Get the sender name
        var name = _baseState._children.FirstOrDefault(x => x.Key.Equals(ActorHelper.GetEntityNameFromSender(Sender))).Key;

        _state._eventList.Add(name, new TimeEventTuple(obj.TimeLast, obj.TimeNext));

        if (_state._eventList.Count == _baseState._children.Count)
        {
            _state._initializationCompleted = true;

            // TODO: why max ?
            _state._timeLast = _state._eventList.Values.Max(x => x.TimeLast);
            _state._timeNext = _state._eventList.Values.Min(x => x.TimeNext);

            // tell parent
            _parent.Tell(new EngineMessages.InitializationCompleted(_state._timeLast, _state._timeNext)
            {
                ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.ParentName),
                EntityName = _baseState.ParentName,
                RunId = _baseState.RunId
            });
        }
        
        PersistState();

        
    }

    private void HandleInitialization(EngineMessages.StartInitialization obj)
    {
        var parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);
        using var activity =
            ActivitySource.StartActivity("Initialization", ActivityKind.Internal, parentContext: parentContext);
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _baseState._coupledModel.GetType().Name);
        activity?.SetTag("CurrentTime", obj.CurrentTime.ToString());
        activity?.WriteSharding(obj);
        foreach (var child in _baseState._children)
        {
            child.Value.Tell(new EngineMessages.StartInitialization(obj.CurrentTime, activity)
            {
                ShardId = ActorHelper.GetShardId(_baseState.Name,  child.Key), 
                EntityName = child.Key,
                RunId = _baseState.RunId,
            });
        }
    }

}