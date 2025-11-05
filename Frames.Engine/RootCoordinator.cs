using System.Diagnostics;
using System.Timers;
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
using Timer = System.Timers.Timer;

// ReSharper disable ExplicitCallerInfoArgument

namespace Frames.Engine;

/// <summary>
/// RootCoordinator class represents the root coordinator which is responsible for managing the execution of the whole model
/// Based on the RootCoordinator from Theory of M S by Zeigler.
/// Merge of Basic Root Coordinator and Parallel Coordinator
/// </summary>
// ReSharper disable once ClassNeverInstantiated.Global
public class RootCoordinator : ReceiveActor, ILogReceive
{
    private IServiceProvider ServiceProvider { get; }
    private IActorRef _children;

    private bool _hasStopCondition;
    private bool _isCompleted;

    private TimeUnit _timeUntilShutdown = TimeUnit.Infinity;

    public TimeUnit _timeNext;

    public TimeUnit _currentTime = TimeUnit.Zero;
    private TimeUnit? _lastTime;

    private readonly SortedList<TimeUnit, string> _checkpoints = new();


    // TODO: for debugging purposes only
    private readonly TimeSpan _timeOut = TimeSpan.FromSeconds(300);
    private Timer? _timer;
    private bool _isRunning;
    private bool _isLoadingCheckpoint;

    private CompletionType CompletionType { get; set; } = CompletionType.NotCompleted;

    private int? _timeUnitInMilliseconds;

    private Stopwatch _stopwatch = new();
    private bool _manualStop;
    private bool _manualPause;

    private ISnapshotManager SnapshotManager { get; }

    public Guid Id { get; set; }

    public RootCoordinator(IServiceProvider serviceProvider)
    {
        ServiceProvider = serviceProvider;
        Instrumentation = ServiceProvider.GetRequiredService<Instrumentation>();
        SnapshotManager = ServiceProvider.GetRequiredService<ISnapshotManager>();
        ActivitySource = Instrumentation.ActivitySource;
        // Control Messages
        ReceiveAsync<Simulation.StartSimulation>(ReceiveSimulationStartAsync);
        Receive<Simulation.SetStopAfterTime>(ReceiveSetStopAfterTime);
        Receive<Simulation.QueryIsCompleted>(ReceiveIsCompleted);
        Receive<Simulation.SetCheckpoint>(ReceiveSetCheckpoint);
        Receive<Simulation.RemoveCheckpoint>(ReceiveRemoveCheckpoint);
        ReceiveAsync<Simulation.FinishedSaveCheckpoint>(ReceiveFinishedSaveCheckpointAsync);
        ReceiveAsync<Simulation.LoadCheckpoint>(ReceiveLoadCheckpointAsync);
        Receive<Simulation.FinishedLoadCheckpoint>(ReceiveFinishedLoadCheckpoint);
        Receive<Simulation.GetStatus>(_ =>
        {
            var status = new SimulationStatus()
            {
                Checkpoints = _checkpoints,
                CurrentTime = _currentTime,
                TimeNext = _timeNext,
                IsRunning = _isRunning,
                IsCompleted = _isCompleted,
                CompletionType = CompletionType,
                TimeUntilShutdown = _timeUntilShutdown,
                IsLoadingCheckpoint = _isLoadingCheckpoint,
                ManualPause = _manualPause,
                ManualStop = _manualStop,
                TimeUnitInMilliseconds = _timeUnitInMilliseconds,
                ChildrenName = ChildrenName,
                Id = Id,
                LastTime = _lastTime,
                StopConditionReached = StopConditionReached,
                CheckpointName = RestoredCheckpointName,
            };
            Sender.Tell(status);
        });
        Receive<Simulation.SetSpeedControl>(ReceiveSetSpeedControl);
        Receive<Simulation.PauseSimulation>(ReceivePauseSimulation);
        Receive<Simulation.StopSimulation>(ReceiveStopSimulation);
        ReceiveAsync<Simulation.ResumeSimulation>(ReceiveResumeSimulationAsync);

        ReceiveAsync<Simulation.CreateModel>(ReceiveCreateModelAsync);

        // Simulation Messages
        ReceiveAsync<EngineMessages.InitializationCompleted>(ReceiveInitializationCompleted);
        Receive<ComputeOutput.ComputedOutput>(ReceiveComputationCompleted);
        ReceiveAsync<ExecuteTransition.FinishedExecuteTransition>(ReceiveFinishedExecuteTransition);


        Receive<Exception>(ex =>
        {
            Log.Error(ex, "[ROOT] Exception in RootCoordinator");
            _timer?.Stop();
            _isCompleted = true;
            this.CompletionType = CompletionType.Error;
            // TODO: send this to the correct actors with correct ShardId and entity name, currently it is sent to root coordinator ????
            _benchmarkStopwatch.Stop();

            Context.System.EventStream.Publish(
                new Simulation.IsCompleted(_currentTime, CompletionType, Id, _benchmarkStopwatch.ElapsedMilliseconds)
                {
                });
        });
    }


    private void HaltExecution(CompletionType completionType)
    {
        _benchmarkStopwatch.Stop();
        SimulationStep?.Dispose();
        SimulationRun?.Dispose();
        _timer?.Stop();
        _stopwatch.Stop();
        _isCompleted = true;
        CompletionType = completionType;
        _isRunning = false;

        Context.System.EventStream.Publish(new Simulation.IsCompleted(_currentTime, CompletionType, Id,
            _benchmarkStopwatch.ElapsedMilliseconds));
    }

    private async Task ReceiveCreateModelAsync(Simulation.CreateModel arg)
    {
        IActorRef actor;
        Id = arg.Id;
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

        ChildrenName = arg.Name;
        _children = actor;

        Sender.Tell(Id);
    }

    public string ChildrenName { get; set; }

    private async Task ReceiveResumeSimulationAsync(Simulation.ResumeSimulation obj)
    {
        Log.Information("[ROOT] Simulation resumed");
        if (!_manualPause)
        {
            throw new SimulatorException("Simulation is not paused");
        }

        _timer?.Start();
        _manualPause = false;
        _isRunning = true;
        _isCompleted = false;
        _stopwatch.Start();
        await RoundCompleted();
    }

    private void ReceiveStopSimulation(Simulation.StopSimulation obj)
    {
        Log.Information("[ROOT] Simulation stopped");
        _timer?.Stop();
        _manualStop = true;
    }

    private void ReceivePauseSimulation(Simulation.PauseSimulation obj)
    {
        Log.Information("[ROOT] Received Simulation paused");
        _timer?.Stop();
        _manualPause = true;
    }

    private void ReceiveSetSpeedControl(Simulation.SetSpeedControl obj)
    {
        if (obj.AsFastAsPossible)
        {
            _timeUnitInMilliseconds = null;
            return;
        }

        if (obj.TimeUnitInMilliseconds <= 0)
        {
            throw new SimulatorException("Time unit must be greater than 0");
        }

        _timeUnitInMilliseconds = obj.TimeUnitInMilliseconds;
    }

    private Instrumentation Instrumentation { get; set; }

    private void ReceiveFinishedLoadCheckpoint(Simulation.FinishedLoadCheckpoint obj)
    {
        Log.Debug("[ROOT] Checkpoint loaded");
        RestoredCheckpointName = obj.Name;
        _isLoadingCheckpoint = false;

        if (StartSimulationAfterLoadingCheckpoint)
        {
            StartSimulationAfterLoadingCheckpoint = false;

            if (_children == null)
            {
                throw new SimulatorException("Simulation was not setup properly");
            }

            Self.Tell(new Simulation.StartSimulation(Id, RestoredCheckpointName)
            );
        }
    }

    private string? RestoredCheckpointName { get; set; }

    private async Task ReceiveLoadCheckpointAsync(Simulation.LoadCheckpoint arg)
    {
        // check if simulation is running
        if (_isRunning)
        {
            throw new SimulatorException("Simulation is already running");
        }

        if (_isLoadingCheckpoint)
        {
            throw new SimulatorException("Checkpoint is already loading");
        }

        var state = await SnapshotManager.GetSnapshotCoordinatorAsync(arg.Name, Self.Path.Name);

        if (state == null)
        {
            throw new SimulatorException("Checkpoint not found");
        }

        _currentTime = state.TimeLast;
        _timeNext = state.TimeNext;

        _isLoadingCheckpoint = true;
        Log.Debug("[ROOT] Loading checkpoint {Checkpoint}", arg.Name);
        _children.Tell(new Simulation.LoadCheckpoint(arg.Name)
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), ChildrenName),
            EntityName = ChildrenName,
            RunId = Id
        });
    }

    private async Task ReceiveFinishedSaveCheckpointAsync(Simulation.FinishedSaveCheckpoint obj)
    {
        Log.Debug("[ROOT] Checkpoint saved at time {Time}", obj.CurrentTime);

        await RoundCompleted();
    }

    private void ReceiveSetCheckpoint(Simulation.SetCheckpoint obj)
    {
        if (_currentTime > obj.Time)
        {
            Sender.Tell(new ActionResponse(false, "Checkpoint time can not be in the past"));
            return;
        }

        if (_checkpoints.ContainsValue(obj.Name))
        {
            Sender.Tell(new ActionResponse(false, "Checkpoint with this name already exists"));
            return;
        }

        _checkpoints.Add(obj.Time, obj.Name);
        Log.Information("[ROOT] Checkpoint set at time {Time}", obj.Time);
        Sender.Tell(new ActionResponse(true, "Checkpoint set successfully"));
    }

    private void ReceiveRemoveCheckpoint(Simulation.RemoveCheckpoint obj)
    {
        var checkpoint = _checkpoints.FirstOrDefault(x => x.Value == obj.Name);
        if (checkpoint.Equals(default(KeyValuePair<TimeUnit, string>)))
        {
            Sender.Tell(new ActionResponse(false, "Checkpoint with this name does not exist"));
            return;
        }

        _checkpoints.Remove(checkpoint.Key);
        Log.Information("[ROOT] Checkpoint {Checkpoint} removed", obj.Name);
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
        if (_isCompleted)
        {
            _benchmarkStopwatch.Stop();
            Sender.Tell(new Simulation.IsCompleted(_currentTime, CompletionType, Id,
                _benchmarkStopwatch.ElapsedMilliseconds)
            {
            });
        }
        else
        {
            Sender.Tell(new Simulation.IsCompleted(_currentTime, CompletionType.NotCompleted, Id,
                _benchmarkStopwatch.ElapsedMilliseconds));
        }
    }

    private void ReceiveSetStopAfterTime(Simulation.SetStopAfterTime obj)
    {
        _hasStopCondition = true;
        _timeUntilShutdown = obj.Time;
    }

    private Stopwatch _benchmarkStopwatch = new Stopwatch();

    private async Task ReceiveSimulationStartAsync(Simulation.StartSimulation obj)
    {
        Log.Information("[ROOT] Starting simulation");
        _benchmarkStopwatch.Restart();

        _isCompleted = false;


        if (obj.CheckpointName is not null && obj.CheckpointName != RestoredCheckpointName)
        {
            if (_isLoadingCheckpoint)
            {
                StartSimulationAfterLoadingCheckpoint = true;
                Log.Information("[ROOT] Simulation will start after loading checkpoint");
                return;
            }

            throw new SimulatorException("Checkpoint name is not the same as the restored checkpoint name");
        }


        if (!ActorHelper.IsSimulator(ChildrenName) && !ActorHelper.IsCoordinator(ChildrenName))
        {
            throw new SimulatorException("Wrong actor type or naming, expected simulator or coordinator, got: " +
                                         _children.Path.Name);
        }

        _hasStopCondition = _hasStopCondition || _children.Ask<bool>(new Simulation.HasStopCondition
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), ChildrenName),
            EntityName = ChildrenName,
            RunId = Id
        }).Result;

        if (!_hasStopCondition)
        {
            throw new NoStopConditionException();
        }

        // Assumption, all children are set
        // Assumption, children are not dynamically added or removed

        // initialize _timeNext with children and null

        // Set timeout
        _timer = new Timer(_timeOut.TotalMilliseconds);
        _timer.Elapsed += HandleTimeout;
        _timer.AutoReset = false;
        _timer.Enabled = true;
        _timer.Start();

        SimulationRun = ActivitySource.StartActivity(name: "SimulationRun");
        SimulationStep =
            ActivitySource.StartActivity("SimulationStep", ActivityKind.Internal,
                parentContext: SimulationRun?.Context ?? new ActivityContext());
        SimulationStep?.SetTag("CurrentTime", _currentTime.Value);
        // Send initialization to all children
        InitializationActivity =
            ActivitySource.StartActivity("Initialization", ActivityKind.Client,
                parentContext: SimulationStep?.Context ?? new ActivityContext());


        if (obj.CheckpointName is not null && obj.CheckpointName == RestoredCheckpointName && !_isRunning)
        {
            Log.Information("[ROOT] Simulation starts from checkpoint {Checkpoint}", obj.CheckpointName);
            _isRunning = true;
            RestoredCheckpointName = string.Empty;
            await RoundCompleted();
            return;
        }

        // reset coordinator
        _timeNext = TimeUnit.Zero;
        _currentTime = TimeUnit.Zero;

        _isRunning = true;
        RestoredCheckpointName = string.Empty;

        if (_timeUnitInMilliseconds.HasValue)
        {
            _stopwatch.Start();
        }

        _children.Tell(new EngineMessages.StartInitialization(_currentTime, InitializationActivity)
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(obj.Id), ChildrenName),
            EntityName = ChildrenName,
            RunId = obj.Id
        });
    }

    private bool StartSimulationAfterLoadingCheckpoint { get; set; }


    private void HandleTimeout(object? sender, ElapsedEventArgs e)
    {
        Log.Error("[ROOT] Timeout reached, simulation will be interrupted");
        _timer!.Stop();
        _isCompleted = true;
        CompletionType = CompletionType.Timeout;
        throw new TimeoutException("Simulation timed out after " + _timeOut.TotalMilliseconds + " milliseconds");
    }


    private async Task ReceiveFinishedExecuteTransition(ExecuteTransition.FinishedExecuteTransition obj)
    {
        ExecuteTransitionActivity?.Dispose();
        // update the timeNext for the child

        StopConditionReached = obj.StopConditionReached;

        Log.Information("================================================================");
        Log.Information("Round time: {TimeNow}", this._currentTime);
        Log.Information("Next time: {TimeNext}", obj.TimeNext.IsInfinity ? "Infinity" : obj.TimeNext.ToString());

        ActorRegistry.For(Context.System).Get<TracingActor>().Tell(
            new Messages.Tracing.StepBoundary(new List<Guid>(obj.ToStringState ?? Enumerable.Empty<Guid>()),
                _currentTime, obj.TimeNext));

        _timeNext = obj.TimeNext;

        await RoundCompleted();
    }

    private void ReceiveComputationCompleted(ComputeOutput.ComputedOutput obj)
    {
        ComputeOutputActivity?.Dispose();
        // update the timeNext for the child
        _currentTime = obj.CurrentTime;

        Thread.Sleep(10);
        ExecuteTransitionActivity = ActivitySource.StartActivity("ExecuteTransition", ActivityKind.Client,
            parentContext: SimulationStep?.Context ?? new ActivityContext());
        _children.Tell(new ExecuteTransition.StartExecuteTransition(Bag.Empty, _timeNext, ExecuteTransitionActivity)
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), ChildrenName),
            EntityName = ChildrenName,
            RunId = Id
        });
    }


    private async Task ReceiveInitializationCompleted(EngineMessages.InitializationCompleted obj)
    {
        InitializationActivity?.Dispose();
        _timeNext = obj.TimeNext;
        await RoundCompleted();
    }

    private async Task RoundCompleted()
    {
        var checkpoint = _checkpoints.FirstOrDefault();


        if (_currentTime >= checkpoint.Key && checkpoint.Value != null)
        {
            Log.Debug("[ROOT] Checkpoint reached at time {Time}", _currentTime);
            _checkpoints.Remove(checkpoint.Key);
            _children.Tell(new Simulation.SaveCheckpoint(checkpoint.Value, checkpoint.Key)
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), ChildrenName),
                EntityName = ChildrenName,
                RunId = Id,
            });
            await SaveCheckpoint(checkpoint.Value, checkpoint.Key);
            // RoundCompleted will be called again when the checkpoint is saved
            return;
        }

        // children are initialized/computed output

        // set the current time to the minimum of all children


        if (StopConditionReached)
        {
            HaltExecution(CompletionType.StopAfterCondition);
            return;
        }

        if (_timeUntilShutdown != TimeUnit.Undefined && _currentTime > _timeUntilShutdown)
        {
            HaltExecution(CompletionType.StopAfterTime);
            return;
        }

        if (_manualStop)
        {
            _manualStop = false;
            HaltExecution(CompletionType.ManualStop);
            return;
        }


        if (_manualPause)
        {
            HaltExecution(CompletionType.ManualPause);
            return;
        }

        Log.Information("[ROOT] Round completed, next time: {TimeNext}", _timeNext);

        // speed control section
        if (_timeUnitInMilliseconds.HasValue && !_timeNext.IsInfinity)
        {
            // either we wait
            // a) before we start the next round
            // b) after we start the next round

            // here we wait before we start the next round
            var delay = (_timeNext.Value - _currentTime.Value) * _timeUnitInMilliseconds.Value;
            var actualRunTime = _stopwatch.ElapsedMilliseconds;
            var delayTime = delay - actualRunTime;

            if (delayTime > 0)
            {
                Log.Information("[ROOT] Waiting for {Delay} milliseconds", delayTime);

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

        if (_currentTime == _lastTime)
        {
            HaltExecution(CompletionType.StopAfterTime);
            return;
        }

        _lastTime = _currentTime;


        SimulationStep?.Dispose();
        SimulationStep = ActivitySource.StartActivity("SimulationStep");
        SimulationStep?.SetTag("CurrentTime", _currentTime.Value);
        ComputeOutputActivity = ActivitySource.StartActivity("ComputeOutput", ActivityKind.Client,
            parentContext: SimulationStep?.Context ?? new ActivityContext());


        _currentTime = _timeNext;
        _children.Tell(new ComputeOutput.StartComputeOutput(_currentTime, ComputeOutputActivity)
        {
            ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), ChildrenName),
            EntityName = ChildrenName,
            RunId = Id
        });
    }

    private async Task SaveCheckpoint(string checkpoint, TimeUnit timeUnit)
    {
        Log.Debug("[ROOT] Saving checkpoint {Checkpoint} at time {Time}", checkpoint, timeUnit);
        await SnapshotManager.SaveSnapshotAsync(checkpoint, new CoordinatorSnapshotObject()
        {
            TimeLast = _currentTime,
            TimeNext = _timeNext,
            EventList = new Dictionary<string, TimeEventTuple>()
        }, Self.Path.Name);
    }

    private bool StopConditionReached { get; set; }
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