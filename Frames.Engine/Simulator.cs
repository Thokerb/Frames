using System.Diagnostics;
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
/// Simulator class represents a simulator which is responsible for managing the execution of an atomic model.
/// Based on the Simulator from Theory of M S by Zeigler.
/// </summary>
public class Simulator : ReceiveActor, ILogReceive
{
    private IServiceProvider ServiceProvider { get; init; }
    private ISnapshotManager SnapshotManager { get; }

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

    public IActorRef _coordinator => CoordinatorName.StartsWith(ActorHelper.RootCoordinatorIdentifier) ?  ActorRegistry.For(Context.System)
        .Get<RootCoordinator>() : ActorRegistry.For(Context.System)
        .Get<Coordinator>();
    private string Name { set; get; }
    
    private string CoordinatorName { get; set; }

    private ActivityContext _parentContext;

    public Simulator(IServiceProvider serviceProvider)
    {
        ServiceProvider = serviceProvider;
        SnapshotManager = ServiceProvider.GetRequiredService<ISnapshotManager>();
        ActivitySource = ServiceProvider.GetRequiredService<Instrumentation>().ActivitySource;


        Receive<EngineMessages.StartInitialization>(HandleInitialization);
        Receive<ComputeOutput.StartComputeOutput>(HandleComputeOutput);
        Receive<ExecuteTransition.StartExecuteTransition>(HandleExecuteTransition);
        Receive<Simulation.HasStopCondition>((_ => Sender.Tell(_atomicModel?.HasStopCondition ?? false)));
        Receive<EngineMessages.SetupSimulator>(msg =>
        {
            CoordinatorName = msg.CoordinatorName;
            Name = msg.Name;
            RunId = msg.RunId;
            _atomicModel = msg.AtomicModel;
            // _coordinator = msg.Coordinator;
            Log.Information("[{Name} - SETUP] Simulator setup with model: {Model}", Self.Path.Name, _atomicModel.GetType().Name);
            Sender.Tell("done");
        });
        ReceiveAsync<Simulation.SaveCheckpoint>(HandleSaveCheckpointAsync);
        ReceiveAsync<Simulation.LoadCheckpoint>(HandleLoadCheckpointAsync);
    }

    private Guid RunId { get; set; }

    private IActorRef TracingStreamActor => ActorRegistry.For(Context.System).Get<TracingActor>();

    private async Task HandleSaveCheckpointAsync(Simulation.SaveCheckpoint obj)
    {
        if (!(obj.CurrentTime <= _timeNext))
        {
            Log.Error("Checkpoint time is not in the range of last and next time for {Name}: {CheckpointTime} not in [{TimeLast}, {TimeNext}]", 
                Self.Path.Name, obj.CurrentTime, _timeLast, _timeNext);
            throw new SynchronisationException("Checkpoint time is not in the range of last and next time");
        }

        // save the checkpoint n 
        await SnapshotManager.SaveSnapshotAsync(obj.Name, new SimulatorSnapshotObject()
        {
            OutputBag = _outputBag,
            TimeElapsed = _timeElapsed,
            TimeLast = _timeLast,
            TimeNext = _timeNext,
            AtomicModelState = _atomicModel.StateInternal,
        }, Self.Path.Name, _atomicModel.GetStateType());

        Log.Debug("[{Name} - CHECKPOINT] Checkpoint saved: {Checkpoint}", Self.Path.Name, obj.Name);
        _coordinator.Tell(new Simulation.FinishedSaveCheckpoint(obj.Name, obj.CurrentTime)
        {
            ShardId = ActorHelper.GetShardId(Name, CoordinatorName),
            EntityName = CoordinatorName,
            RunId = RunId
        });
    }

    private async Task HandleLoadCheckpointAsync(Simulation.LoadCheckpoint obj)
    {
        // load the checkpoint n 
        var snapshot = await SnapshotManager.GetSnapshotSimulatorAsync(obj.Name, Self.Path.Name, _atomicModel.GetStateType());
        if (snapshot == null)
        {
            Log.Error("[{Name} - CHECKPOINT] Checkpoint not found: {Checkpoint}", Self.Path.Name, obj.Name);
            throw new SynchronisationException("Checkpoint not found");
        }

        _atomicModel.StateInternal = snapshot.AtomicModelState;
        _timeElapsed = snapshot.TimeElapsed;
        _timeLast = snapshot.TimeLast;
        _timeNext = snapshot.TimeNext;
        _outputBag = snapshot.OutputBag;

        Log.Debug("[{Name} - CHECKPOINT] Checkpoint loaded: {Checkpoint}", Self.Path.Name, obj.Name);

        _coordinator.Tell(new Simulation.FinishedLoadCheckpoint(obj.Name)
        {
            ShardId = ActorHelper.GetShardId(Name, CoordinatorName),
            EntityName = CoordinatorName,
            RunId = RunId
        });
    }

    private ActivitySource ActivitySource { get; set; }

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
        Log.Debug("[{Name} - INTERNAL] Old state: {OldState}", Self.Path.Name, state);
        var newState = _atomicModel.InternalTransition(state);
        Log.Debug("[{Name} - INTERNAL] New state: {NewState}", Self.Path.Name, newState);
        _atomicModel.StateInternal = newState;
    }

    private void RunExternalState(IState state, Bag input)
    {
        // Log Bag
        Log.Debug("[External] Bag: {Bag}", input);
        Log.Debug("[{Name} - EXTERNAL ]Old state: {OldState}", Self.Path.Name, state);
        var newState = _atomicModel.ExternalTransition(state, input);
        Log.Debug("[{Name} - EXTERNAL ]New state: {NewState}", Self.Path.Name, newState);
        _atomicModel.StateInternal = newState;
    }

    private void RunConfluentState(IState state, Bag input)
    {
        // Log Bag
        Log.Debug("[CONFLUENT] Bag: {Bag}", input);
        Log.Debug("[{Name} - CONFLUENT]Old state: {OldState}", Self.Path.Name, state);
        var newState = _atomicModel.ConfluentTransition(state, input);
        Log.Debug("[{Name} - CONFLUENT]New state: {NewState}", Self.Path.Name, newState);
        _atomicModel.StateInternal = newState;
    }

    private TimeUnit RunTimeAdvance(IState state)
    {
        var timeAdvance = _atomicModel.TimeAdvance(state);
        Log.Debug("[TIME ADVANCE] Time advance: {TimeAdvance}", timeAdvance);

        // check if atomicState equals oldState
        if (!state.Equals(_atomicModel.StateInternal))
        {
            throw new IllegalStateModificationException("TimeAdvance");
        }

        return timeAdvance;
    }

    private Bag RunOutput(IState state)
    {
        var output = _atomicModel.Output(state);
        if (!state.Equals(_atomicModel.StateInternal))
        {
            throw new IllegalStateModificationException("RunOutput");
        }

        Log.Debug("[OUTPUT] Output: {Output}", output);
        return output;
    }

    private void HandleExecuteTransition(ExecuteTransition.StartExecuteTransition obj)
    {
        _parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);

        using var activity =
            ActivitySource.StartActivity("RunExecuteTransition", ActivityKind.Internal, _parentContext);
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _atomicModel.GetType().Name);
        activity?.SetTag("OldState", _atomicModel.StateInternal.ToString());
        activity?.SetTag("CurrentTime", obj.CurrentTime.ToString());
        activity?.SetTag("Input", obj.Input?.ToString() ?? "null");
        activity?.WriteSharding(obj);
        var bagIsEmpty = obj.Input?.IsEmpty ?? true;

        if (bagIsEmpty && obj.CurrentTime == _timeNext)
        {
            activity?.SetTag("Transition", "Internal");
            // Internal transition
            RunInternalState(_atomicModel.StateInternal);
        }
        else if (!bagIsEmpty && obj.CurrentTime == _timeNext)
        {
            activity?.SetTag("Transition", "Confluent");
            // Confluent transition
            RunConfluentState(_atomicModel.StateInternal, obj.Input ?? Bag.Empty);
        }
        else if (!bagIsEmpty && (_timeLast <= obj.CurrentTime && obj.CurrentTime <= _timeNext))
        {
            activity?.SetTag("Transition", "External");
            // External transition
            _timeElapsed = obj.CurrentTime - _timeLast;
            RunExternalState(_atomicModel.StateInternal, obj.Input ?? Bag.Empty);
        }

        activity?.SetTag("NewState", _atomicModel.StateInternal.ToString());
        _timeLast = obj.CurrentTime;
        _timeNext = _timeLast + RunTimeAdvance(_atomicModel.StateInternal);
        activity?.SetTag("TimeNext", _timeNext.ToString());
        // Send the finished execute transition message to the coordinator
        
        var msgId = Guid.NewGuid();
        
        TracingStreamActor.Tell(new Messages.Tracing.MessageWithId(this._atomicModel.StateInternal.ToString() ?? string.Empty,msgId));
        _coordinator.Tell(new ExecuteTransition.FinishedExecuteTransition(_timeNext)
        {
            StopConditionReached = _atomicModel.StopConditionCheck(_atomicModel.StateInternal,
                obj.Input ?? Bag.Empty),
            ToStringState = [msgId],
            ShardId = ActorHelper.GetShardId(Name, CoordinatorName),
            EntityName = CoordinatorName,
            RunId = RunId
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
        _parentContext = new ActivityContext(obj.TraceId, obj.SpanId, ActivityTraceFlags.Recorded);
        using var activity = ActivitySource.StartActivity("RunComputeOutput", ActivityKind.Internal, _parentContext);
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _atomicModel.GetType().Name);
        activity?.SetTag("CurrentTime", obj.CurrentTime.ToString());
        activity?.WriteSharding(obj);

        // Check if the current time is equal to the next time
        if (obj.CurrentTime == _timeNext)
        {
            // Compute the output
            _outputBag = RunOutput(_atomicModel.StateInternal);

            activity?.SetTag("Output", _outputBag.ToString());

            // Send the output message to the coordinator
            _coordinator.Tell(new ComputeOutput.ComputedOutput(_outputBag, obj.CurrentTime)
            {
                 ShardId = ActorHelper.GetShardId(Name, CoordinatorName),
                 EntityName = CoordinatorName,
                 RunId = RunId
            });
        }
        else
        {
            Log.Error("Possible sync error");
            // TODO: is this a sync error and should we throw an exception?
        }
    }

    private void HandleInitialization(EngineMessages.StartInitialization msg)
    {
        _parentContext = new ActivityContext(msg.TraceId, msg.SpanId, ActivityTraceFlags.Recorded);
        using var activity = ActivitySource.StartActivity("RunInitialization", ActivityKind.Internal, _parentContext);
        activity?.SetTag("Name", Self.Path.Name);
        activity?.SetTag("Model", _atomicModel.GetType().Name);
        activity?.SetTag("CurrentTime", msg.CurrentTime.ToString());
        activity?.WriteSharding(msg);

        // tl = t −e
        _timeLast = msg.CurrentTime - _timeElapsed;
        // tn = tl + ta(s)
        _timeNext = _timeLast + RunTimeAdvance(_atomicModel.StateInternal);

        activity?.SetTag("TimeNext", _timeNext.ToString());
        activity?.SetTag("TimeLast", _timeLast.ToString());

        // Send the initialization completed message to the coordinator
        _coordinator.Tell(new EngineMessages.InitializationCompleted(_timeLast, _timeNext)
        {
            ShardId = ActorHelper.GetShardId(Name, CoordinatorName),
            EntityName = CoordinatorName,
            RunId = RunId
        });
    }

    /// <summary>
    /// Null when the simulator is not initialized.
    /// </summary>
    private TimeUnit _timeNext = TimeUnit.Zero;

    /// <summary>
    /// Null when the simulator is not initialized.
    /// </summary>
    private TimeUnit _timeLast = TimeUnit.Zero;

    /// <summary>
    /// Elapsed time since the last initialization, which is 0 when the simulator is not initialized.
    /// </summary>
    private TimeUnit _timeElapsed = TimeUnit.Zero;

    /// <summary>
    /// Underlying atomic model.
    /// </summary>
    private IAtomicModelBase _atomicModel;

    /// <summary>
    /// Output message bag
    /// </summary>
    private Bag _outputBag = new Bag();
}