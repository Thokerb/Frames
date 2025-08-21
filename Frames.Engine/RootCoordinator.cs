using System.Diagnostics;
using System.Text;
using System.Timers;
using Akka.Hosting;
using Akka.Streams;
using Akka.Streams.Dsl;
using Akka.Streams.Implementation;
using Frames.Engine.Dto;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Engine.Monitoring;
using Frames.Engine.Persistence;
using Frames.Engine.Tracing;
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

    private TimeUnit _timeNext;

    private TimeUnit _currentTime = TimeUnit.Zero;
    private TimeUnit? _lastTime = null;

    private readonly SortedList<TimeUnit, string> _checkpoints = new();

    private readonly List<IActorRef> _waitingForCompletion = new();

    // TODO: for debugging purposes only
    private readonly TimeSpan _timeOut = TimeSpan.FromSeconds(300);
    private Timer? _timer;
    private bool _isRunning;
    private bool _isLoadingCheckpoint = false;
    
    private CompletionType CompletionType {get; set; } = CompletionType.NotCompleted;
    
    private int? _timeUnitInMilliseconds = null;

    private Stopwatch _stopwatch = new Stopwatch();
    private bool _manualStop = false;
    private bool _manualPause = false;

    private ISnapshotManager SnapshotManager { get; }
    
    private Guid Id { get; set; }
    
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
        ReceiveAsync<Simulation.FinishedSaveCheckpoint>(ReceiveFinishedSaveCheckpointAsync);
        ReceiveAsync<Simulation.LoadCheckpoint>(ReceiveLoadCheckpointAsync);
        Receive<Simulation.FinishedLoadCheckpoint>(ReceiveFinishedLoadCheckpoint);
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
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime,CompletionType, Id)
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), x.Path.Name),
                
            }));
        });
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
                await actor.Ask(new EngineMessages.SetupSimulator(atomicModel, arg.Name, ActorHelper.RootCoordinatorIdentifier){
                    ShardId = ActorHelper.RootCoordinatorName(arg.Id),
                    RunId = arg.Id
                });
                break;
            case ICoupledModel coupledModel:
                actor = await ActorRegistry.For(Context.System).GetAsync<Coordinator>();
                await actor.Ask(new EngineMessages.SetupCoordinator(coupledModel, arg.Name, ActorHelper.RootCoordinatorIdentifier)
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

    private string ChildrenName { get; set; }

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

    private void  ReceiveSetSpeedControl(Simulation.SetSpeedControl obj)
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
            
            if(_children == null)
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
            throw new SimulatorException("Checkpoint time is in the past");
        }

        _checkpoints.Add(obj.Time, obj.Name);
        Log.Information("[ROOT] Checkpoint set at time {Time}", obj.Time);
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
            Sender.Tell(new Simulation.IsCompleted(_currentTime, CompletionType,Id)
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), Sender.Path.Name)
            });
        }
        else
        {
            _waitingForCompletion.Add(Sender);
        }
    }

    private void ReceiveSetStopAfterTime(Simulation.SetStopAfterTime obj)
    {
        _hasStopCondition = true;
        _timeUntilShutdown = obj.Time;
    }

    private async Task ReceiveSimulationStartAsync(Simulation.StartSimulation obj)
    {
        Log.Information("[ROOT] Starting simulation");
     
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
            throw new SimulatorException("Wrong actor type or naming, expected simulator or coordinator, got: " + _children.Path.Name);
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
        
        ActorRegistry.For(Context.System).Get<TracingActor>().Tell(new Messages.Tracing.StepBoundary(new List<Guid>(obj.ToStringState?.Values ?? Enumerable.Empty<Guid>()), _currentTime, obj.TimeNext));
        // string logState = PrintState(obj.ToStringState);
        // if (obj.ToStringState != null)
        // {
        //     Log.Information("State:\n{State}", logState);
        // }

        _timeNext = obj.TimeNext;

        await RoundCompleted();
    }

    private static string PrintState(Dictionary<string, Guid>? objToStringState)
    {
        if (objToStringState == null)
        {
            return string.Empty;
        }

        StringBuilder builder = new StringBuilder();
        foreach (var state in objToStringState.OrderBy(x => x.Key))
        {
            builder.AppendLine($"[{state.Key}] {state.Value}");
        }

        return builder.ToString();
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
            SimulationStep?.Dispose();
            SimulationRun?.Dispose();
            Log.Information("[ROOT] Stop condition reached, simulation will be interrupted");
            _timer?.Stop();
            _isCompleted = true;
            CompletionType = CompletionType.StopAfterCondition;
            _isRunning = false;
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime, CompletionType, Id)
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), x.Path.Name)
            }));
            return;
        }

        if (_timeUntilShutdown != TimeUnit.Undefined && _currentTime > _timeUntilShutdown)
        {
            SimulationStep?.Dispose();
            SimulationRun?.Dispose();
            Log.Information("[ROOT] Time Stop condition reached, simulation will be interrupted");
            _timer?.Stop();
            _isCompleted = true;
            CompletionType = CompletionType.StopAfterTime;
            _isRunning = false;
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime, CompletionType,Id)
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), x.Path.Name)
            }));
            return;
        }

        if (_manualStop)
        {
            Log.Information("[ROOT] Simulation stopped");
            SimulationStep?.Dispose();
            SimulationRun?.Dispose();
            _manualStop = false;
            _isCompleted = true;
            _isRunning = false;
            CompletionType = CompletionType.ManualStop;
            _timer?.Stop();
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime, CompletionType,Id)
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), x.Path.Name)
            }));
            return;
        }


        
        
        
        if (_manualPause)
        {
            Log.Information("[ROOT] Simulation paused");
            SimulationStep?.Dispose();
            SimulationRun?.Dispose();
            _isCompleted = true;
            _isRunning = false;
            CompletionType = CompletionType.ManualPause;
            _timer?.Stop();
            _stopwatch.Stop();
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime, CompletionType,Id)
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), x.Path.Name)
            }));
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
            var delay =  (_timeNext.Value - _currentTime.Value) * _timeUnitInMilliseconds.Value;
            var actualRunTime = _stopwatch.ElapsedMilliseconds;
            var delayTime = delay - actualRunTime;
            
            if (delayTime > 0)
            {
                Log.Information("[ROOT] Waiting for {Delay} milliseconds",delayTime);
                
                // cast delayTime to int or throw exception
                if (delayTime > int.MaxValue)
                {
                    throw new SimulatorException("Delay time is too long");
                }
                
                await Task.Delay((int)delayTime);
            }
            else
            {
                Log.Warning("[ROOT] Delay time is negative, actual run time is greater than delay time. This can happen when calculations of the next round take longer than actual clock time.");
            }
            _stopwatch.Restart();
        }

        if (_currentTime == _lastTime)
        {
            SimulationStep?.Dispose();
            SimulationRun?.Dispose(); 
            Log.Information("[ROOT] Simulation completed, no more time left");
            _timer?.Stop();
            _isCompleted = true;
            CompletionType = CompletionType.StopAfterTime;
            _isRunning = false;
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime, CompletionType,Id)
            {
                ShardId = ActorHelper.GetShardId(ActorHelper.RootCoordinatorName(Id), x.Path.Name)
            }));
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