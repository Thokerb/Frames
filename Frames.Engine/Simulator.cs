using System.Diagnostics;
using Akka.Cluster.Sharding;
using Akka.Dispatch.SysMsg;
using Akka.Hosting;
using Akka.Persistence;
using Frames.Engine.Akka.Persistence;
using Frames.Engine.Dto;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Engine.Monitoring;
using Frames.Engine.Persistence;
using Frames.Engine.Util;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.ReelConnector;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace Frames.Engine;


public class SimulatorBaseState
{
    /// <summary>
    /// Underlying atomic model.
    /// </summary>
    public IAtomicModelBase _atomicModel;
    
    public string Name { set; get; }
    public string CoordinatorName { get; set; }
    public Guid RunId { get; set; }
}

public class SimulatorState
{
    
    /// <summary>
    /// Null when the simulator is not initialized.
    /// </summary>
    public TimeUnit _timeNext = TimeUnit.Zero;

    /// <summary>
    /// Null when the simulator is not initialized.
    /// </summary>
    public TimeUnit _timeLast = TimeUnit.Zero;

    /// <summary>
    /// Elapsed time since the last initialization, which is 0 when the simulator is not initialized.
    /// </summary>
    public TimeUnit _timeElapsed = TimeUnit.Zero;
}

public class AkkaSimulatorSnapshotObject
{
    public required SimulatorBaseState BaseState { get; init; }
    public required SimulatorState State { get; init; }
}

/// <summary>
/// Simulator class represents a simulator which is responsible for managing the execution of an atomic model.
/// Based on the Simulator from Theory of M S by Zeigler.
/// </summary>
public class Simulator : ReceivePersistentActor, ILogReceive
{
    private IServiceProvider ServiceProvider { get; init; }
    private ISnapshotManager SnapshotManager { get; }
    private ActivitySource ActivitySource { get;  }

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

    public IActorRef _coordinator => _baseState.CoordinatorName.StartsWith(ActorHelper.RootCoordinatorIdentifier) ?  ActorRegistry.For(Context.System)
        .Get<RootCoordinator>() : ActorRegistry.For(Context.System)
        .Get<Coordinator>();
    private IActorRef TracingStreamActor => ActorRegistry.For(Context.System).Get<TracingActor>();

    private SimulatorState _state = new ();
    private SimulatorBaseState _baseState = new ();

    public override string PersistenceId { get; }


    public Simulator(string persistenceId, IServiceProvider serviceProvider)
    {
        PersistenceId = persistenceId;
        ServiceProvider = serviceProvider;
        SnapshotManager = ServiceProvider.GetRequiredService<ISnapshotManager>();
        ActivitySource = ServiceProvider.GetRequiredService<Instrumentation>().ActivitySource;

        
        Recover<SnapshotOffer>(offer =>
        {
            if (offer.Snapshot is AkkaSimulatorSnapshotObject state)
            {
                _state = state.State;
                _baseState = state.BaseState;
            }
        });
        Command<SaveSnapshotSuccess>(success => {
            // soft-delete the journal up until the sequence # at
            // which the snapshot was taken
            // DeleteMessages(success.Metadata.SequenceNr); 
        });
        
        Recover<SimulatorState>(state =>
        {
            _state = state;
        });
        
        Recover<SimulatorBaseState>(baseState =>
        {
            _baseState = baseState;
        });
        
        Command<DeleteMessagesSuccess>(success =>
        {
            Serilog.Log.Verbose("[{Name} - PERSISTENCE] Deleted messages up to sequence number {SequenceNr}", Self.Path.Name, success.ToSequenceNr);
        });
        

        Command<EngineMessages.StartInitialization>(HandleInitialization);
        Command<ComputeOutput.StartComputeOutput>(HandleComputeOutput);
        Command<ExecuteTransition.StartExecuteTransition>(HandleExecuteTransition);
        Command<Simulation.HasStopCondition>((_ => Sender.Tell(_baseState._atomicModel?.HasStopCondition ?? false)));
        Command<EngineMessages.SetupSimulator>(msg =>
        {
            _baseState.CoordinatorName = msg.CoordinatorName;
            _baseState.Name = msg.Name;
            _baseState.RunId = msg.RunId;
            _baseState._atomicModel = msg.AtomicModel;
            Persist(_baseState, st =>
            {
                _baseState = st;
            });
            

            // _coordinator = msg.Coordinator;
            Serilog.Log.Information("[{Name} - SETUP] Simulator setup with model: {Model}", Self.Path.Name, _baseState._atomicModel.GetType().Name);
            Sender.Tell("done");
        });
        CommandAsync<Simulation.SaveCheckpoint>(HandleSaveCheckpointAsync);
        CommandAsync<Simulation.LoadCheckpoint>(HandleLoadCheckpointAsync);
        Command<DeleteSnapshotsSuccess>(msg =>
        {
            Serilog.Log.Verbose("[{Name} - PERSISTENCE] Deleted snapshots up to sequence number {SequenceNr}", Self.Path.Name, msg.Criteria.MaxSequenceNr);
        });

        Command<Simulation.Cleanup>(msg =>
        {
            DeleteSnapshots(SnapshotSelectionCriteria.Latest);
            Context.Parent.Tell(new Passivate(PoisonPill.Instance));
        });
        Command<PoisonPill>(msg =>
        {
            PersistState(true);
            Context.Stop(Self);
        });
        Command<Stop>(msg =>
        {
            PersistState(true);
            Context.Stop(Self);
        });
    }

    private int CycleCounter = 0;
    
    private void PersistState(bool fromPoisonPill = false)
    {
        if (!fromPoisonPill)
        {
            // we only want to persist state if we are stopping the actor, otherwise there are just too many messages
            return;
        }
        // lower consistency, much higher performance. Doesn't wait for the message to be persisted before processing the next message in the mailbox.
        // order in which those events are persisted will be preserved 
        // This means you probably have to modify your actor's in-memory state before
        // https://stackoverflow.com/questions/65918832/akka-net-with-persistence-dropping-messages-when-cpu-in-under-high-pressure
        PersistAsync(_state, st =>
        {
            if(++CycleCounter >= PersistenceConfiguration.CyclesUntilSnapshot)
            {
                CycleCounter = 0;
                SaveSnapshot(new AkkaSimulatorSnapshotObject()
                {
                    // base state never changes but we need it in the snapshot
                    BaseState = _baseState,
                    State = _state,
                });
            }
        });
    }

    private async Task HandleSaveCheckpointAsync(Simulation.SaveCheckpoint obj)
    {
        if (!(obj.CurrentTime <= _state._timeNext))
        {
            Serilog.Log.Error("Checkpoint time is not in the range of last and next time for {Name}: {CheckpointTime} not in [{TimeLast}, {TimeNext}]", 
                Self.Path.Name, obj.CurrentTime, _state._timeLast, _state._timeNext);
            throw new SynchronisationException("Checkpoint time is not in the range of last and next time");
        }

        // save the checkpoint n 
        await SnapshotManager.SaveSnapshotAsync(obj.Name, new SimulatorSnapshotObject()
        {
            TimeElapsed = _state._timeElapsed,
            TimeLast = _state._timeLast,
            TimeNext = _state._timeNext,
            AtomicModelState = _baseState._atomicModel.StateInternal,
        }, Self.Path.Name, _baseState._atomicModel.GetStateType());

        Serilog.Log.Debug("[{Name} - CHECKPOINT] Checkpoint saved: {Checkpoint}", Self.Path.Name, obj.Name);
        _coordinator.Tell(new Simulation.FinishedSaveCheckpoint(obj.Name, obj.CurrentTime)
        {
            ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.CoordinatorName),
            EntityName = _baseState.CoordinatorName,
            RunId = _baseState.RunId
        });
    }

    private async Task HandleLoadCheckpointAsync(Simulation.LoadCheckpoint obj)
    {
        // load the checkpoint n 
        var snapshot = await SnapshotManager.GetSnapshotSimulatorAsync(obj.Name, Self.Path.Name, _baseState._atomicModel.GetStateType());
        if (snapshot == null)
        {
            Serilog.Log.Error("[{Name} - CHECKPOINT] Checkpoint not found: {Checkpoint}", Self.Path.Name, obj.Name);
            throw new SynchronisationException("Checkpoint not found");
        }

        _baseState._atomicModel.StateInternal = snapshot.AtomicModelState;
        _state._timeElapsed = snapshot.TimeElapsed;
        _state._timeLast = snapshot.TimeLast;
        _state._timeNext = snapshot.TimeNext;

        PersistState();
        Serilog.Log.Debug("[{Name} - CHECKPOINT] Checkpoint loaded: {Checkpoint}", Self.Path.Name, obj.Name);

        _coordinator.Tell(new Simulation.FinishedLoadCheckpoint(obj.Name)
        {
            ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.CoordinatorName),
            EntityName = _baseState.CoordinatorName,
            RunId = _baseState.RunId
        });
    }


    /**
     *  17: if x = EMPTY and t = tn then
        18:     s = δint(s)
        19: else if x = EMPTY and t = tn then
        20:     s = δcon(s)
        21: else if x = EMPTY and (t l ≤ t ≤ tn) then
        22:     e = t −tl
        23:     s = δext(s, e, x)
        24: end if
        25: tl = t
        26: tn = tl +ta(s)
     */
    private void RunInternalState(IState state)
    {
        Serilog.Log.Debug("[{Name} - INTERNAL] Old state: {OldState}", Self.Path.Name, state);
        var newState = _baseState._atomicModel.InternalTransition(state);
        Serilog.Log.Debug("[{Name} - INTERNAL] New state: {NewState}", Self.Path.Name, newState);
        _baseState._atomicModel.StateInternal = newState;
    }

    private void RunExternalState(IState state, Bag input)
    {
        // Log Bag
        Serilog.Log.Debug("[External] Bag: {Bag}", input);
        Serilog.Log.Debug("[{Name} - EXTERNAL ]Old state: {OldState}", Self.Path.Name, state);
        var newState = _baseState._atomicModel.ExternalTransition(state, input);
        Serilog.Log.Debug("[{Name} - EXTERNAL ]New state: {NewState}", Self.Path.Name, newState);
        _baseState._atomicModel.StateInternal = newState;
    }

    private void RunConfluentState(IState state, Bag input)
    {
        // Log Bag
        Serilog.Log.Debug("[CONFLUENT] Bag: {Bag}", input);
        Serilog.Log.Debug("[{Name} - CONFLUENT]Old state: {OldState}", Self.Path.Name, state);
        var newState = _baseState._atomicModel.ConfluentTransition(state, input);
        Serilog.Log.Debug("[{Name} - CONFLUENT]New state: {NewState}", Self.Path.Name, newState);
        _baseState._atomicModel.StateInternal = newState;
    }

    private TimeUnit RunTimeAdvance(IState state)
    {
        var timeAdvance = _baseState._atomicModel.TimeAdvance(state);
        Serilog.Log.Debug("[TIME ADVANCE] Time advance: {TimeAdvance}", timeAdvance);

        // check if atomicState equals oldState
        if (!state.Equals(_baseState._atomicModel.StateInternal))
        {
            throw new IllegalStateModificationException("TimeAdvance");
        }

        return timeAdvance;
    }

    private Bag RunOutput(IState state)
    {
        var output = _baseState._atomicModel.Output(state);
        if (!state.Equals(_baseState._atomicModel.StateInternal))
        {
            throw new IllegalStateModificationException("RunOutput");
        }

        Serilog.Log.Debug("[OUTPUT] Output: {Output}", output);
        return output;
    }

    private void HandleExecuteTransition(ExecuteTransition.StartExecuteTransition obj)
    {
        _baseState._atomicModel.CurrentTime = obj.CurrentTime;
        var parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);

        using var activity =
            ActivitySource.StartActivity("RunExecuteTransition", ActivityKind.Internal, parentContext);
        var oldState = _baseState._atomicModel.StateInternal.ToString();
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _baseState._atomicModel.GetType().Name);
        activity?.SetTag("OldState", oldState);
        activity?.SetTag("CurrentTime", obj.CurrentTime.ToString());
        activity?.SetTag("Input", obj.Input?.ToString() ?? "null");
        activity?.WriteSharding(obj);
        var bagIsEmpty = obj.Input?.IsEmpty ?? true;

        if (bagIsEmpty && obj.CurrentTime == _state._timeNext)
        {
            activity?.SetTag("Transition", "Internal");
            // Internal transition
            RunInternalState(_baseState._atomicModel.StateInternal);
        }
        else if (!bagIsEmpty && obj.CurrentTime == _state._timeNext)
        {
            activity?.SetTag("Transition", "Confluent");
            // Confluent transition
            RunConfluentState(_baseState._atomicModel.StateInternal, obj.Input ?? Bag.Empty);
        }
        else if (!bagIsEmpty && (_state._timeLast <= obj.CurrentTime && obj.CurrentTime <= _state._timeNext))
        {
            activity?.SetTag("Transition", "External");
            // External transition
            _state._timeElapsed = obj.CurrentTime - _state._timeLast;
            RunExternalState(_baseState._atomicModel.StateInternal, obj.Input ?? Bag.Empty);
        }

        activity?.SetTag("NewState", _baseState._atomicModel.StateInternal.ToString());
        _state._timeLast = obj.CurrentTime;
        _state._timeNext = _state._timeLast + RunTimeAdvance(_baseState._atomicModel.StateInternal);
        activity?.SetTag("TimeNext", _state._timeNext.ToString());
        // Send the finished execute transition message to the coordinator
        
        var msgId = Guid.NewGuid();
        
        string transitionTaken = string.Empty;
        if(_baseState._atomicModel is ReelAtomicModel reelAtomicModel)
        {
            transitionTaken = reelAtomicModel.TransitionTaken;
            activity?.SetTag("ReelState", reelAtomicModel.State.CurrentState);
            activity?.SetTag("Transition", reelAtomicModel.TransitionTaken);
        }
        
        var json =
            "{" +
            (transitionTaken != string.Empty ? $"  \"TransitionTaken\": \"{transitionTaken}\"," : "") +
            $"  \"Name\": \"{_baseState._atomicModel.Name}\"," +
            $"  \"PreviousState\": {oldState}," +
            $"  \"NewState\": {_baseState._atomicModel.StateInternal}" +
            $"  \"Bag\": {obj.Input?.ToString() ?? "null"}" +
            "}";
        
        TracingStreamActor.Tell(new Messages.Tracing.MessageWithId(json,msgId));

        PersistState();
        
        _coordinator.Tell(new ExecuteTransition.FinishedExecuteTransition(_state._timeNext)
        {
            StopConditionReached = _baseState._atomicModel.StopConditionCheck(_baseState._atomicModel.StateInternal,
                obj.Input ?? Bag.Empty),
            ToStringState = [msgId],
            ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.CoordinatorName),
            EntityName = _baseState.CoordinatorName,
            RunId = _baseState.RunId
        });
    }

    /**
     * 12: if t = tn then
     *      13: y = λ(s)
     *      14: send y-message (y, t) to parent coordinator
     * 15: end if
     */
    private void HandleComputeOutput(ComputeOutput.StartComputeOutput obj)
    {
        var parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);
        using var activity = ActivitySource.StartActivity("RunComputeOutput", ActivityKind.Internal, parentContext);
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _baseState._atomicModel.GetType().Name);
        activity?.SetTag("CurrentTime", obj.CurrentTime.ToString());
        activity?.WriteSharding(obj);
        _baseState._atomicModel.CurrentTime = obj.CurrentTime;

        // Check if the current time is equal to the next time
        if (obj.CurrentTime == _state._timeNext)
        {
            // Compute the output
            var outputBag = RunOutput(_baseState._atomicModel.StateInternal);

            activity?.SetTag("Output",outputBag.ToString());

            // Send the output message to the coordinator
            _coordinator.Tell(new ComputeOutput.ComputedOutput(outputBag, obj.CurrentTime)
            {
                 ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.CoordinatorName),
                 EntityName = _baseState.CoordinatorName,
                 RunId = _baseState.RunId
            });
            PersistState();
        }
        else
        {
            Serilog.Log.Error("Possible sync error");
            // TODO: is this a sync error and should we throw an exception?
        }
    }

    private void HandleInitialization(EngineMessages.StartInitialization msg)
    {
        var parentContext = new ActivityContext(msg.TraceId, msg.SpanId, ActivityTraceFlags.Recorded);
        using var activity = ActivitySource.StartActivity("RunInitialization", ActivityKind.Internal, parentContext);
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _baseState._atomicModel.GetType().Name);
        activity?.SetTag("CurrentTime", msg.CurrentTime.ToString());
        activity?.WriteSharding(msg);

        // tl = t −e
        _state._timeLast = msg.CurrentTime - _state._timeElapsed;
        // tn = tl + ta(s)
        _state._timeNext = _state._timeLast + RunTimeAdvance(_baseState._atomicModel.StateInternal);

        activity?.SetTag("TimeNext", _state._timeNext.ToString());
        activity?.SetTag("TimeLast", _state._timeLast.ToString());

        PersistState();
        
        // Send the initialization completed message to the coordinator
        _coordinator.Tell(new EngineMessages.InitializationCompleted(_state._timeLast, _state._timeNext)
        {
            ShardId = ActorHelper.GetShardId(_baseState.Name, _baseState.CoordinatorName),
            EntityName = _baseState.CoordinatorName,
            RunId = _baseState.RunId
        });
    }

}