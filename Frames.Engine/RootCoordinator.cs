using System.Diagnostics;
using System.Timers;
using Akka.Cluster.Tools.PublishSubscribe;
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
using Microsoft.Extensions.DependencyInjection;
using Timer = System.Timers.Timer;

// ReSharper disable ExplicitCallerInfoArgument

namespace Frames.Engine;


public sealed record Timeout()
{
    
}


public class RootCoordinatorBaseState
{
    public Guid RunId { get; set; }
    public IActorRef _child;
    public string ChildName { get; set; }

}

public class RootCoordinatorState
{

    public bool _hasStopCondition;
    public bool _isCompleted;

    public TimeUnit _timeUntilShutdown = TimeUnit.Infinity;

    public TimeUnit _timeNext;

    public TimeUnit _currentTime = TimeUnit.Zero;
    public TimeUnit? _lastTime;

    public int? _timeUnitInMilliseconds;
    public bool _isRunning;
    public bool _isLoadingCheckpoint;
    public bool _manualStop;
    public bool _manualPause;
    public bool StopConditionReached { get; set; }
    public string? RestoredCheckpointName { get; set; }
    public readonly SortedList<TimeUnit, string> _checkpoints = new();
    public CompletionType CompletionType { get; set; } = CompletionType.NotCompleted;
}

public class AkkaRootCoordinatorSnapshot
{
    public required RootCoordinatorState State { get; init; }
    public required RootCoordinatorBaseState BaseState { get; init; } 
}


/// <summary>
/// RootCoordinator class represents the root coordinator which is responsible for managing the execution of the whole model
/// Based on the RootCoordinator from Theory of M S by Zeigler.
/// Merge of Basic Root Coordinator and Parallel Coordinator
/// </summary>
// ReSharper disable once ClassNeverInstantiated.Global
public class RootCoordinator : ReceivePersistentActor, ILogReceive, IWithTimers
{
    private IServiceProvider ServiceProvider { get; }



    public const string TopicName = "CompletionTopic";
    

    // TODO: for debugging purposes only

    private RootCoordinatorState _state = new();
    private RootCoordinatorBaseState _baseState = new();


    private Stopwatch _stopwatch = new();


    private ISnapshotManager SnapshotManager { get; }


    public override string PersistenceId { get; }

    public RootCoordinator(string persistenceId, IServiceProvider serviceProvider)
    {
        PersistenceId = persistenceId;
        ServiceProvider = serviceProvider;
        Instrumentation = ServiceProvider.GetRequiredService<Instrumentation>();
        SnapshotManager = ServiceProvider.GetRequiredService<ISnapshotManager>();
        ActivitySource = Instrumentation.ActivitySource;
        // Control Messages
        CommandAsync<Simulation.StartSimulation>(ReceiveSimulationStartAsync);
        Command<Simulation.SetStopAfterTime>(ReceiveSetStopAfterTime);
        Command<Simulation.QueryIsCompleted>(ReceiveIsCompleted);
        Command<Simulation.SetCheckpoint>(ReceiveSetCheckpoint);
        Command<Simulation.RemoveCheckpoint>(ReceiveRemoveCheckpoint);
        CommandAsync<Simulation.FinishedSaveCheckpoint>(ReceiveFinishedSaveCheckpointAsync);
        CommandAsync<Simulation.LoadCheckpoint>(ReceiveLoadCheckpointAsync);
        Command<Simulation.FinishedLoadCheckpoint>(ReceiveFinishedLoadCheckpoint);
        Command<Simulation.GetStatus>(_ =>
        {
            var status = new SimulationStatus()
            {
                Checkpoints = _state._checkpoints,
                CurrentTime = _state._currentTime,
                TimeNext = _state._timeNext,
                IsRunning = _state._isRunning,
                IsCompleted = _state._isCompleted,
                CompletionType = _state.CompletionType,
                TimeUntilShutdown = _state._timeUntilShutdown,
                IsLoadingCheckpoint = _state._isLoadingCheckpoint,
                ManualPause = _state._manualPause,
                ManualStop = _state._manualStop,
                TimeUnitInMilliseconds = _state._timeUnitInMilliseconds,
                ChildrenName = _baseState.ChildName,
                Id = _baseState.RunId,
                LastTime = _state._lastTime,
                StopConditionReached = _state.StopConditionReached,
                CheckpointName = _state.RestoredCheckpointName,
            };
            Sender.Tell(status);
        });
        Command<Simulation.SetSpeedControl>(ReceiveSetSpeedControl);
        Command<Simulation.PauseSimulation>(ReceivePauseSimulation);
        Command<Simulation.StopSimulation>(ReceiveStopSimulation);
        CommandAsync<Simulation.ResumeSimulation>(ReceiveResumeSimulationAsync);

        CommandAsync<Simulation.CreateModel>(ReceiveCreateModelAsync);

        
        // Persistance
        
        Recover<SnapshotOffer>(offer =>
        {
            if (offer.Snapshot is AkkaRootCoordinatorSnapshot state)
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
        
        Recover<RootCoordinatorState>(state =>
        {
            _state = state;
        });
        
        Recover<RootCoordinatorBaseState>(baseState =>
        {
            _baseState = baseState;
        });
        Command<DeleteMessagesSuccess>(success =>
        {
            Serilog.Log.Verbose("[{Name} - PERSISTENCE] Deleted messages up to sequence number {SequenceNr}", Self.Path.Name, success.ToSequenceNr);
        });
        
        // Simulation Messages
        CommandAsync<EngineMessages.InitializationCompleted>(ReceiveInitializationCompleted);
        Command<ComputeOutput.ComputedOutput>(ReceiveComputationCompleted);
        CommandAsync<ExecuteTransition.FinishedExecuteTransition>(ReceiveFinishedExecuteTransition);
        Command<PoisonPill>(msg =>
        {
            PersistState(true);
        });
        Command<Stop>(msg =>
        {
            PersistState(true);
            Context.Stop(Self);
        });
        Command<DeleteSnapshotsSuccess>(msg =>
        {
            Serilog.Log.Verbose("[{Name} - PERSISTENCE] Deleted snapshots up to sequence number {SequenceNr}", Self.Path.Name, msg.Criteria.MaxSequenceNr);
        });

        Command<Exception>(ex =>
        {
            Log.Error(ex, "[ROOT] Exception in RootCoordinator");
            Timers?.Cancel(TimeoutKey);
            _state._isCompleted = true;
            _state.CompletionType = CompletionType.Error;
            _benchmarkStopwatch.Stop();

            PersistState();
            
            var mediator = Context.System.Settings.HasCluster ? DistributedPubSub.Get(Context.System).Mediator : ActorRegistry.For(Context.System).Get<DistributedPubSubMediator>();
            if (mediator == null)
            {
                Log.Error("[ROOT] Mediator is null or terminated, cannot publish completion message");
                return;
            }
            mediator.Tell(new Publish(RootCoordinator.TopicName,new Simulation.IsCompleted(_state._currentTime, _state.CompletionType, _baseState.RunId, _benchmarkStopwatch.ElapsedMilliseconds) ));
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
                SaveSnapshot(new AkkaRootCoordinatorSnapshot()
                {
                    // base state never changes but we need it in the snapshot
                    BaseState = _baseState,
                    State = _state,
                });
            }
        });
    }
    
    private void HaltExecution(CompletionType completionType)
    {
        _benchmarkStopwatch.Stop();
        SimulationStep?.Dispose();
        SimulationRun?.Dispose();
        Timers.Cancel(TimeoutKey);
        _stopwatch.Stop();
        _state._isCompleted = true;
        _state.CompletionType = completionType;
        _state._isRunning = false;

        PersistState();
        
        DeleteMessages(LastSequenceNr);
        
        DeleteSnapshots(SnapshotSelectionCriteria.Latest);

        // this is the total cleanup, which should not happen on manual pause or stop
        if (completionType is CompletionType.StopAfterTime or CompletionType.StopAfterCondition)
        {
            _baseState._child.Tell(new Simulation.Cleanup()
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(_baseState.RunId), _baseState.ChildName),
                EntityName = _baseState.ChildName,
                RunId = _baseState.RunId,
            });
        }
        
        var mediator = Context.System.Settings.HasCluster ? DistributedPubSub.Get(Context.System).Mediator : ActorRegistry.For(Context.System).Get<DistributedPubSubMediator>();
        if (mediator == null )
        {
            Log.Error("[ROOT] Mediator is null or terminated, cannot publish completion message");
            return;
        }
        mediator.Tell(new Publish(RootCoordinator.TopicName,new Simulation.IsCompleted(_state._currentTime, _state.CompletionType, _baseState.RunId, _benchmarkStopwatch.ElapsedMilliseconds) ));
    }

    private async Task ReceiveCreateModelAsync(Simulation.CreateModel arg)
    {
        IActorRef actor;
        _baseState.RunId = arg.Id;
        switch (arg.Model)
        {
            // TODO: DI
            case IAtomicModelBase atomicModel:
                actor = await ActorRegistry.For(Context.System).GetAsync<Simulator>();
                await actor.Ask(
                    new EngineMessages.SetupSimulator(atomicModel, arg.Name, ActorHelper.RootCoordinatorIdentifier)
                    {
                        ShardId = ActorHelper.RootCoordinatorName(arg.Id),
                        RunId = arg.Id
                    });
                break;
            case ICoupledModel coupledModel:
                actor = await ActorRegistry.For(Context.System).GetAsync<Coordinator>();
                await actor.Ask(
                    new EngineMessages.SetupCoordinator(coupledModel, arg.Name, ActorHelper.RootCoordinatorIdentifier)
                    {
                        RunId = arg.Id
                    });
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        _baseState.ChildName = arg.Name;
        _baseState._child = actor;

        Persist(_baseState, st =>
        {
            _baseState = st;
        });
        
        Sender.Tell(_baseState.RunId);
    }


    private async Task ReceiveResumeSimulationAsync(Simulation.ResumeSimulation obj)
    {
        Serilog.Log.Information("[ROOT] Simulation resumed");
        if (!_state._manualPause)
        {
            throw new SimulatorException("Simulation is not paused");
        }

        Timers.StartSingleTimer(TimeoutKey, new Timeout(), _timeOut);
        _state._manualPause = false;
        _state._isRunning = true;
        _state._isCompleted = false;
        _stopwatch.Start();
        await RoundCompleted();
    }

    private const string TimeoutKey = "Timeout";

    private TimeSpan _timeOut { get; set; } = TimeSpan.FromMinutes(5);

    private void ReceiveStopSimulation(Simulation.StopSimulation obj)
    {
        Serilog.Log.Information("[ROOT] Simulation stopped");
        
        Timers.Cancel(TimeoutKey);
        _state._manualStop = true;
        PersistState();
    }

    private void ReceivePauseSimulation(Simulation.PauseSimulation obj)
    {
        Serilog.Log.Information("[ROOT] Received Simulation paused");
        Timers.Cancel(TimeoutKey);
        _state._manualPause = true;
        PersistState();
    }

    private void ReceiveSetSpeedControl(Simulation.SetSpeedControl obj)
    {
        if (obj.AsFastAsPossible)
        {
            _state._timeUnitInMilliseconds = null;
            return;
        }

        if (obj.TimeUnitInMilliseconds <= 0)
        {
            throw new SimulatorException("Time unit must be greater than 0");
        }

        _state._timeUnitInMilliseconds = obj.TimeUnitInMilliseconds;
        PersistState();
    }

    private Instrumentation Instrumentation { get; set; }

    private void ReceiveFinishedLoadCheckpoint(Simulation.FinishedLoadCheckpoint obj)
    {
        Log.Debug("[ROOT] Checkpoint loaded");
        _state.RestoredCheckpointName = obj.Name;
        _state._isLoadingCheckpoint = false;

        if (StartSimulationAfterLoadingCheckpoint)
        {
            StartSimulationAfterLoadingCheckpoint = false;

            if (_baseState._child == null)
            {
                throw new SimulatorException("Simulation was not setup properly");
            }
            Self.Tell(new Simulation.StartSimulation(_baseState.RunId, _state.RestoredCheckpointName));
        }
        PersistState();
    }


    private async Task ReceiveLoadCheckpointAsync(Simulation.LoadCheckpoint arg)
    {
        // check if simulation is running
        if (_state._isRunning)
        {
            throw new SimulatorException("Simulation is already running");
        }

        if (_state._isLoadingCheckpoint)
        {
            throw new SimulatorException("Checkpoint is already loading");
        }

        var state = await SnapshotManager.GetSnapshotCoordinatorAsync(arg.Name, Self.Path.Name);

        if (state == null)
        {
            throw new SimulatorException("Checkpoint not found");
        }

        _state._currentTime = state.TimeLast;
        _state._timeNext = state.TimeNext;

        _state._isLoadingCheckpoint = true;
        Log.Debug("[ROOT] Loading checkpoint {Checkpoint}", arg.Name);
        _baseState._child.Tell(new Simulation.LoadCheckpoint(arg.Name)
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(_baseState.RunId), _baseState.ChildName),
            EntityName = _baseState.ChildName,
            RunId = _baseState.RunId
        });
        PersistState();
    }

    private async Task ReceiveFinishedSaveCheckpointAsync(Simulation.FinishedSaveCheckpoint obj)
    {
        Log.Debug("[ROOT] Checkpoint saved at time {Time}", obj.CurrentTime);

        await RoundCompleted();
    }

    private void ReceiveSetCheckpoint(Simulation.SetCheckpoint obj)
    {
        if (_state._currentTime > obj.Time)
        {
            Sender.Tell(new ActionResponse(false, "Checkpoint time can not be in the past"));
            return;
        }

        if (_state._checkpoints.ContainsValue(obj.Name))
        {
            Sender.Tell(new ActionResponse(false, "Checkpoint with this name already exists"));
            return;
        }

        _state._checkpoints.Add(obj.Time, obj.Name);
        Serilog.Log.Information("[ROOT] Checkpoint set at time {Time}", obj.Time);
        Sender.Tell(new ActionResponse(true, "Checkpoint set successfully"));
        PersistState();
    }

    private void ReceiveRemoveCheckpoint(Simulation.RemoveCheckpoint obj)
    {
        var checkpoint = _state._checkpoints.FirstOrDefault(x => x.Value == obj.Name);
        if (checkpoint.Equals(default(KeyValuePair<TimeUnit, string>)))
        {
            Sender.Tell(new ActionResponse(false, "Checkpoint with this name does not exist"));
            return;
        }

        _state._checkpoints.Remove(checkpoint.Key);
        Serilog.Log.Information("[ROOT] Checkpoint {Checkpoint} removed", obj.Name);
        PersistState();
        Sender.Tell(new ActionResponse(true, "Checkpoint removed successfully"));
    }

    private Activity? SimulationRun { get; set; }
    private Activity? SimulationStep { get; set; }

    private ActivitySource ActivitySource { get; set; }

    private Activity? InitializationActivity { get; set; }
    private Activity? ComputeOutputActivity { get; set; }
    private Activity? ExecuteTransitionActivity { get; set; }

    private void ReceiveIsCompleted(Simulation.QueryIsCompleted obj)
    {
        if (_state._isCompleted)
        {
            _benchmarkStopwatch.Stop();
            Sender.Tell(new Simulation.IsCompleted(_state._currentTime, _state.CompletionType, _baseState.RunId,
                _benchmarkStopwatch.ElapsedMilliseconds));
        }
        else
        {
            Sender.Tell(new Simulation.IsCompleted(_state._currentTime, CompletionType.NotCompleted, _baseState.RunId,
                _benchmarkStopwatch.ElapsedMilliseconds));
        }
    }

    private void ReceiveSetStopAfterTime(Simulation.SetStopAfterTime obj)
    {
        _state._hasStopCondition = true;
        _state._timeUntilShutdown = obj.Time;
        PersistState();
    }

    private Stopwatch _benchmarkStopwatch = new ();

    private async Task ReceiveSimulationStartAsync(Simulation.StartSimulation obj)
    {
        Serilog.Log.Information("[ROOT] Starting simulation");
        _benchmarkStopwatch.Restart();

        _state._isCompleted = false;


        if (obj.CheckpointName is not null && obj.CheckpointName != _state.RestoredCheckpointName)
        {
            if (_state._isLoadingCheckpoint)
            {
                StartSimulationAfterLoadingCheckpoint = true;
                Serilog.Log.Information("[ROOT] Simulation will start after loading checkpoint");
                return;
            }

            throw new SimulatorException("Checkpoint name is not the same as the restored checkpoint name");
        }


        if (!ActorHelper.IsSimulator(_baseState.ChildName) && !ActorHelper.IsCoordinator(_baseState.ChildName))
        {
            throw new SimulatorException("Wrong actor type or naming, expected simulator or coordinator, got: " +
                                         _baseState._child.Path.Name);
        }

        _state._hasStopCondition = _state._hasStopCondition || _baseState._child.Ask<bool>(new Simulation.HasStopCondition
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(_baseState.RunId), _baseState.ChildName),
            EntityName = _baseState.ChildName,
            RunId = _baseState.RunId
        }).Result;

        if (!_state._hasStopCondition)
        {
            throw new NoStopConditionException();
        }

        // Assumption, all children are set
        // Assumption, children are not dynamically added or removed

        // initialize _timeNext with children and null

        // Set timeout
        Timers.StartSingleTimer(TimeoutKey, new Timeout(), _timeOut);
        
        SimulationRun = ActivitySource.StartActivity(name: "SimulationRun");
        SimulationStep =
            ActivitySource.StartActivity("SimulationStep", ActivityKind.Internal,
                parentContext: SimulationRun?.Context ?? new ActivityContext());
        SimulationStep?.SetTag("CurrentTime", _state._currentTime.Value);
        // Send initialization to all children
        InitializationActivity =
            ActivitySource.StartActivity("Initialization", ActivityKind.Client,
                parentContext: SimulationStep?.Context ?? new ActivityContext());


        if (obj.CheckpointName is not null && obj.CheckpointName == _state.RestoredCheckpointName && !_state._isRunning)
        {
            Serilog.Log.Information("[ROOT] Simulation starts from checkpoint {Checkpoint}", obj.CheckpointName);
            _state._isRunning = true;
            _state.RestoredCheckpointName = string.Empty;
            await RoundCompleted();
            return;
        }

        // reset coordinator
        _state._timeNext = TimeUnit.Zero;
        _state._currentTime = TimeUnit.Zero;

        _state._isRunning = true;
        _state.RestoredCheckpointName = string.Empty;

        PersistState();
        
        if (_state._timeUnitInMilliseconds.HasValue)
        {
            _stopwatch.Start();
        }

        _baseState._child.Tell(new EngineMessages.StartInitialization(_state._currentTime, InitializationActivity)
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(obj.Id), _baseState.ChildName),
            EntityName = _baseState.ChildName,
            RunId = obj.Id
        });
    }

    private bool StartSimulationAfterLoadingCheckpoint { get; set; }


    private void HandleTimeout(object? sender, ElapsedEventArgs e)
    {
        Log.Error("[ROOT] Timeout reached, simulation will be interrupted");
        Timers.Cancel(TimeoutKey);
        _state._isCompleted = true;
        _state.CompletionType = CompletionType.Timeout;
        PersistState();
        throw new TimeoutException("Simulation timed out after " + _timeOut.TotalMilliseconds + " milliseconds");
    }


    private async Task ReceiveFinishedExecuteTransition(ExecuteTransition.FinishedExecuteTransition obj)
    {
        ExecuteTransitionActivity?.Dispose();
        // update the timeNext for the child

        _state.StopConditionReached = obj.StopConditionReached;

        Serilog.Log.Information("================================================================");
        Serilog.Log.Information("Round time: {TimeNow}", this._state._currentTime);
        Serilog.Log.Information("Next time: {TimeNext}", obj.TimeNext.IsInfinity ? "Infinity" : obj.TimeNext.ToString());

        ActorRegistry.For(Context.System).Get<TracingActor>().Tell(
            new Messages.Tracing.StepBoundary(new List<Guid>(obj.ToStringState ?? Enumerable.Empty<Guid>()),
                _state._currentTime, obj.TimeNext));

        _state._timeNext = obj.TimeNext;

        await RoundCompleted();
    }

    private void ReceiveComputationCompleted(ComputeOutput.ComputedOutput obj)
    {
        ComputeOutputActivity?.Dispose();
        // update the timeNext for the child
        _state._currentTime = obj.CurrentTime;
        PersistState();
        ExecuteTransitionActivity = ActivitySource.StartActivity("ExecuteTransition", ActivityKind.Client,
            parentContext: SimulationStep?.Context ?? new ActivityContext());
        _baseState._child.Tell(new ExecuteTransition.StartExecuteTransition(Bag.Empty, _state._timeNext, ExecuteTransitionActivity)
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(_baseState.RunId), _baseState.ChildName),
            EntityName = _baseState.ChildName,
            RunId = _baseState.RunId
        });
    }


    private async Task ReceiveInitializationCompleted(EngineMessages.InitializationCompleted obj)
    {
        InitializationActivity?.Dispose();
        _state._timeNext = obj.TimeNext;
        await RoundCompleted();
    }

    private async Task RoundCompleted()
    {
        // reset timeout
        Timers.StartSingleTimer(TimeoutKey, new Timeout(), _timeOut);
        var checkpoint = _state._checkpoints.FirstOrDefault();


        if (_state._currentTime >= checkpoint.Key && checkpoint.Value != null)
        {
            Log.Debug("[ROOT] Checkpoint reached at time {Time}", _state._currentTime);
            _state._checkpoints.Remove(checkpoint.Key);
            _baseState._child.Tell(new Simulation.SaveCheckpoint(checkpoint.Value, checkpoint.Key)
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(_baseState.RunId), _baseState.ChildName),
                EntityName = _baseState.ChildName,
                RunId = _baseState.RunId,
            });
            await SaveCheckpoint(checkpoint.Value, checkpoint.Key);
            // RoundCompleted will be called again when the checkpoint is saved
            PersistState();
            return;
        }

        // children are initialized/computed output

        // set the current time to the minimum of all children


        if (_state.StopConditionReached)
        {
            HaltExecution(CompletionType.StopAfterCondition);
            return;
        }

        if (_state._timeUntilShutdown != TimeUnit.Undefined && _state._currentTime > _state._timeUntilShutdown)
        {
            HaltExecution(CompletionType.StopAfterTime);
            return;
        }

        if (_state._manualStop)
        {
            _state._manualStop = false;
            HaltExecution(CompletionType.ManualStop);
            return;
        }


        if (_state._manualPause)
        {
            HaltExecution(CompletionType.ManualPause);
            return;
        }

        Serilog.Log.Information("[ROOT] Round completed, next time: {TimeNext}", _state._timeNext);

        // speed control section
        if (_state._timeUnitInMilliseconds.HasValue && !_state._timeNext.IsInfinity)
        {
            // either we wait
            // a) before we start the next round
            // b) after we start the next round

            // here we wait before we start the next round
            var delay = (_state._timeNext.Value - _state._currentTime.Value) * _state._timeUnitInMilliseconds.Value;
            var actualRunTime = _stopwatch.ElapsedMilliseconds;
            var delayTime = delay - actualRunTime;

            if (delayTime > 0)
            {
                Serilog.Log.Information("[ROOT] Waiting for {Delay} milliseconds", delayTime);

                // cast delayTime to int or throw exception
                if (delayTime > int.MaxValue)
                {
                    throw new SimulatorException("Delay time is too long");
                }

                await Task.Delay((int)delayTime);
            }
            else
            {
                Log.Warning(
                    "[ROOT] Delay time is negative, actual run time is greater than delay time. This can happen when calculations of the next round take longer than actual clock time.");
            }

            _stopwatch.Restart();
        }

        // if (_state._currentTime == _state._lastTime)
        // {
        //     HaltExecution(CompletionType.StopAfterTime);
        //     return;
        // }

        _state._lastTime = _state._currentTime;


        SimulationStep?.Dispose();
        SimulationStep = ActivitySource.StartActivity("SimulationStep");
        SimulationStep?.SetTag("CurrentTime", _state._currentTime.Value);
        ComputeOutputActivity = ActivitySource.StartActivity("ComputeOutput", ActivityKind.Client,
            parentContext: SimulationStep?.Context ?? new ActivityContext());


        _state._currentTime = _state._timeNext;
        _baseState._child.Tell(new ComputeOutput.StartComputeOutput(_state._currentTime, ComputeOutputActivity)
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(_baseState.RunId), _baseState.ChildName),
            EntityName = _baseState.ChildName,
            RunId = _baseState.RunId
        });
        
        PersistState();
    }

    private async Task SaveCheckpoint(string checkpoint, TimeUnit timeUnit)
    {
        Log.Debug("[ROOT] Saving checkpoint {Checkpoint} at time {Time}", checkpoint, timeUnit);
        await SnapshotManager.SaveSnapshotAsync(checkpoint, new CoordinatorSnapshotObject()
        {
            TimeLast = _state._currentTime,
            TimeNext = _state._timeNext,
            EventList = new Dictionary<string, TimeEventTuple>()
        }, Self.Path.Name);
    }

    public ITimerScheduler Timers { get; set; }
}

public record SimulationStatus
{
    public SortedList<TimeUnit, string> Checkpoints { get; set; }
    public TimeUnit CurrentTime { get; set; }
    public bool IsRunning { get; set; }
    public CompletionType CompletionType { get; set; }
    public bool ManualStop { get; set; }
    public bool StopConditionReached { get; set; }
    public string? ChildrenName { get; set; }
    public bool IsCompleted { get; set; }
    public int? TimeUnitInMilliseconds { get; set; }
    public TimeUnit TimeUntilShutdown { get; set; }
    public bool IsLoadingCheckpoint { get; set; }
    public bool ManualPause { get; set; }
    public TimeUnit TimeNext { get; set; }
    public Guid Id { get; set; }
    public TimeUnit? LastTime { get; set; }
    public string? CheckpointName { get; set; }
}

public record ActionResponse(bool Success, string? Message);