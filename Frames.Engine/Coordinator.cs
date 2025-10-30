using System.Diagnostics;
using Akka.DependencyInjection;
using Akka.Hosting;
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

    private ICoupledModel _coupledModel;

    private IActorRef _parent => ParentName.StartsWith(ActorHelper.RootCoordinatorIdentifier) ?  ActorRegistry.For(Context.System)
        .Get<RootCoordinator>() : ActorRegistry.For(Context.System).Get<Coordinator>();

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

    private async Task CreateChildrenAsync(Guid runId)
    {
        // Create a new actor for each child
        foreach (var child in _coupledModel.GetChildren())
        {
            IActorRef actor;
            switch (child.Item2)
            {
                // TODO: DI
                case IAtomicModelBase atomicModel:
                    // props = Props.Create(() => 
                    //     new Simulator(ServiceProvider)); //TODO Self, atomicModel,
                    
                    actor = await ActorRegistry.For(Context.System).GetAsync<Simulator>();
                    await actor.Ask(new EngineMessages.SetupSimulator(atomicModel,  child.Item1, Name){
                        ShardId = Name,  // Simulator should be in the same shard as the coordinator
                        RunId = RunId,
                    });

                    break;
                case ICoupledModel coupledModel:
                    actor = await ActorRegistry.For(Context.System).GetAsync<Coordinator>();
                    await actor.Ask(new EngineMessages.SetupCoordinator(coupledModel, child.Item1, Name)
                    {
                        RunId = RunId,
                    });
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            _children.Add(child.Item1, actor);
        }
    }
    public string Name {private set; get; }

    private ISnapshotManager SnapshotManager { get; }

    private string ParentName { get; set; }
    
    public Coordinator(IServiceProvider serviceProvider)
    {
        ServiceProvider = serviceProvider;
        SnapshotManager = ServiceProvider.GetRequiredService<ISnapshotManager>();
        Instrumentation = ServiceProvider.GetRequiredService<Instrumentation>();
        ActivitySource = Instrumentation.ActivitySource;


        // Simulation Messages
        Receive<EngineMessages.StartInitialization>(HandleInitialization);
        Receive<EngineMessages.InitializationCompleted>(HandleInitializationCompleted);
        ReceiveAsync<EngineMessages.SetupCoordinator>(async msg =>
        {
            // This is used to setup the simulator actor with the coordinator
            // It is not used in the coordinator itself, but in the simulator actor
            // Therefore we just ignore it here
            ParentName = msg.ParentName;
            Name = msg.Name;
            RunId = msg.RunId;
            _coupledModel = msg.CoupledModel;
            // _parent = msg.Parent;
            await CreateChildrenAsync(msg.RunId);
            Sender.Tell("done");
        });
        Receive<ComputeOutput.StartComputeOutput>(HandleStartComputeOutput);
        Receive<ComputeOutput.ComputedOutput>(HandleComputedOutput); // (y,t)
        Receive<ExecuteTransition.StartExecuteTransition>(HandleExecuteTransition);
        Receive<ExecuteTransition.FinishedExecuteTransition>(HandleFinishedExecuteTransition);

        ReceiveAsync<Simulation.HasStopCondition>((async _ =>
        {
            foreach (var child in _children)
            {
                var actor = child.Value;
                var resp = await actor.Ask<bool>(new Simulation.HasStopCondition()
                {
                    ShardId = ActorHelper.GetShardId(Name, child.Key),
                    EntityName = child.Key,
                    RunId = RunId,
                });
                if (resp)
                {
                    Sender.Tell(true);
                    break; // if one child has a stop condition, we can stop checking
                }
            }
            Sender.Tell(false); // if no child has a stop condition, we return false
            
        }));
        ReceiveAsync<Simulation.SaveCheckpoint>(HandleSaveCheckpoint);
        Receive<Simulation.FinishedSaveCheckpoint>(HandleFinishedSaveCheckpoint);
        ReceiveAsync<Simulation.LoadCheckpoint>(HandleLoadCheckpoint);
        Receive<Simulation.FinishedLoadCheckpoint>(HandleFinishedLoadCheckpoint);
    }

    private Guid RunId { get; set; }

    private int ChildrenLoadCheckpointCount { get; set; }
    
    private async Task HandleLoadCheckpoint(Simulation.LoadCheckpoint obj)
    {
        await LoadCheckpointAsync(obj.Name);
        
        ChildrenLoadCheckpointCount = 0;
        foreach (var child in _children)
        {
            child.Value.Tell(obj with { EntityName = child.Key, ShardId = ActorHelper.GetShardId(Name, child.Key) });
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
            _parent.Tell(new Simulation.FinishedLoadCheckpoint(obj.Name)
            {
                ShardId = ActorHelper.GetShardId(Name, ParentName),
                EntityName = ParentName,
                RunId = RunId,
            });
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
            _parent.Tell(new Simulation.FinishedSaveCheckpoint(obj.Name, obj.CurrentTime)
            {
                ShardId = ActorHelper.GetShardId(Name, ParentName),
                EntityName = ParentName,
                RunId = RunId,

            });
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
            child.Value.Tell(obj with {EntityName = child.Key, ShardId = ActorHelper.GetShardId(Name, child.Key)});
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
        var name = _children.FirstOrDefault(x => x.Key.Equals(ActorHelper.GetEntityNameFromSender(Sender))).Key;
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

        Log.Debug("All children have reported");
        _outputMessageBagParent = new Bag();

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
            ShardId = ActorHelper.GetShardId(Name, ParentName),
            EntityName = ParentName,
            RunId = RunId,
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

        var name = _children.FirstOrDefault(x => x.Key.Equals(ActorHelper.GetEntityNameFromSender(Sender))).Key;

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
                    .SelectMany(x => x.ToStringState ?? []).ToList(),
                StopConditionReached = _timeNextExecuteTransition.Values.Any(x => x.StopConditionReached),
                ShardId = ActorHelper.GetShardId(Name, ParentName),
                EntityName = ParentName,
                RunId = RunId,
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
        activity?.WriteSharding(obj);
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
            receiverActors.Tell(new ExecuteTransition.StartExecuteTransition(receiver.Value, obj.CurrentTime, activity)
            {
                ShardId = ActorHelper.GetShardId(Name, receiver.Key),
                EntityName = receiver.Key,
                RunId = RunId,
            });
        }

        foreach (var uncoupledChild in imminentButNoReceiver)
        {
            var actor = _children[uncoupledChild.Key];
            actor.Tell(new ExecuteTransition.StartExecuteTransition(Bag.Empty, obj.CurrentTime, activity)
            {
                ShardId = ActorHelper.GetShardId(Name,  uncoupledChild.Key),
                EntityName = uncoupledChild.Key,
                RunId = RunId,
            });
        }
    }

    private void HandleStartComputeOutput(ComputeOutput.StartComputeOutput obj)
    {
        _parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);
        using var activity = ActivitySource.StartActivity("ComputeOutput", ActivityKind.Internal, parentContext: _parentContext);
        activity?.WriteSharding(obj);
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
            actor.Tell(new ComputeOutput.StartComputeOutput(obj.CurrentTime, activity)
            {
                ShardId = ActorHelper.GetShardId(Name, imminentChild.Key),
                EntityName = imminentChild.Key,
                RunId = RunId,
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
        var name = _children.FirstOrDefault(x => x.Key.Equals(ActorHelper.GetEntityNameFromSender(Sender))).Key;

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
                ShardId = ActorHelper.GetShardId(Name, ParentName),
                EntityName = ParentName,
                RunId = RunId
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
        activity?.WriteSharding(obj);
        foreach (var child in _children)
        {
            child.Value.Tell(new EngineMessages.StartInitialization(obj.CurrentTime, activity)
            {
                ShardId = ActorHelper.GetShardId(Name,  child.Key), 
                EntityName = child.Key,
                RunId = RunId,
            });
        }
    }
}