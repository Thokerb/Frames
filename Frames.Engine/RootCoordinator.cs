using System.Diagnostics;
using System.Text;
using System.Timers;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Engine.Monitoring;
using Frames.Engine.Persistence;
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
    private IActorRef? _children;

    private bool _hasStopCondition;
    private bool _isCompleted;

    private TimeUnit _timeUntilShutdown = TimeUnit.Infinity;

    private TimeUnit _timeNext;

    private TimeUnit _currentTime = TimeUnit.Zero;

    private readonly SortedList<TimeUnit, string> _checkpoints = new();

    private readonly List<IActorRef> _waitingForCompletion = new();

    // TODO: for debugging purposes only
    private readonly TimeSpan _timeOut = TimeSpan.FromSeconds(300);
    private Timer? _timer;

    private ISnapshotManager SnapshotManager { get; }
    
    public RootCoordinator(IServiceProvider serviceProvider)
    {
        var instrumentation = serviceProvider.GetRequiredService<Instrumentation>();
        SnapshotManager = serviceProvider.GetRequiredService<ISnapshotManager>();
        ActivitySource = instrumentation.ActivitySource;
        // Control Messages
        Receive<Simulation.StartSimulation>(ReceiveSimulationStart);
        Receive<Simulation.InterruptSimulation>(ReceiveSimulationInterrupt);
        Receive<Simulation.SetStopAfterTime>(ReceiveSetStopAfterTime);
        Receive<Simulation.QueryIsCompleted>(ReceiveIsCompleted);
        Receive<Simulation.SetCheckpoint>(ReceiveSetCheckpoint);
        ReceiveAsync<Simulation.FinishedSaveCheckpoint>(ReceiveFinishedSaveCheckpoint);

        // Simulation Messages
        ReceiveAsync<EngineMessages.InitializationCompleted>(ReceiveInitializationCompleted);
        Receive<ComputeOutput.ComputedOutput>(ReceiveComputationCompleted);
        ReceiveAsync<ExecuteTransition.FinishedExecuteTransition>(ReceiveFinishedExecuteTransition);


        Receive<Exception>(ex =>
        {
            Log.Error(ex, "[ROOT] Exception in RootCoordinator");
            _timer?.Stop();
            _isCompleted = true;
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime)));
        });
    }

    private async Task ReceiveFinishedSaveCheckpoint(Simulation.FinishedSaveCheckpoint obj)
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
            Sender.Tell(new Simulation.IsCompleted(_currentTime));
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

    private void ReceiveSimulationInterrupt(Simulation.InterruptSimulation obj)
    {
        throw new NotImplementedException();
    }

    private void ReceiveSimulationStart(Simulation.StartSimulation obj)
    {
        Log.Information("[ROOT] Starting simulation");


        if (!obj.Children.Path.Name.StartsWith("simulator-") && !obj.Children.Path.Name.StartsWith("coordinator-"))
        {
            throw new SimulatorException("Wrong actor type or naming, expected simulator or coordinator");
        }

        _hasStopCondition = _hasStopCondition || obj.Children.Ask<bool>(new Simulation.HasStopCondition()).Result;

        if (!_hasStopCondition)
        {
            throw new NoStopConditionException();
        }

        _children = obj.Children;

        // Assumption, all children are set
        // Assumption, children are not dynamically added or removed

        // initialize _timeNext with children and null

        // Set timeout
        _timer = new Timer(_timeOut.TotalMilliseconds);
        _timer.Elapsed += HandleTimeout;
        _timer.AutoReset = false;
        _timer.Enabled = true;
        _timer.Start();

        SimulationRun = ActivitySource.StartActivity(name: "SimulationRun") ??
                        throw new InvalidOperationException("ActivitySource is null");
        SimulationStep =
            ActivitySource.StartActivity("SimulationStep", ActivityKind.Internal,
                parentContext: SimulationRun.Context) ??
            throw new InvalidOperationException("ActivitySource is null");
        SimulationStep.SetTag("CurrentTime", _currentTime.Value);
        // Send initialization to all children
        InitializationActivity =
            ActivitySource.StartActivity("Initialization", ActivityKind.Client,
                parentContext: SimulationStep.Context) ??
            throw new InvalidOperationException("ActivitySource is null");
        _children.Tell(new EngineMessages.StartInitialization(_currentTime));
    }


    private void HandleTimeout(object? sender, ElapsedEventArgs e)
    {
        Log.Error("[ROOT] Timeout reached, simulation will be interrupted");
        _timer!.Stop();
        _isCompleted = true;
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
        string logState = PrintState(obj.ToStringState);
        if (obj.ToStringState != null)
        {
            Log.Information("State:\n{State}", logState);
        }

        _timeNext = obj.TimeNext;

        await RoundCompleted();
    }

    private string PrintState(Dictionary<string, TraceInformation>? objToStringState)
    {
        if (objToStringState == null)
        {
            return string.Empty;
        }

        StringBuilder builder = new StringBuilder();
        foreach (var state in objToStringState.OrderBy(x => x.Key))
        {
            builder.AppendLine($"[{state.Key}] {state.Value.State}");
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
        _children.Tell(new ExecuteTransition.StartExecuteTransition(Bag.Empty, _timeNext));
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
            _children.Tell(new Simulation.SaveCheckpoint(checkpoint.Value, checkpoint.Key));
            await SaveCheckpoint(checkpoint.Value, checkpoint.Key);
            // RoundCompleted will be called again when the checkpoint is saved
            return;
        }

        // children are initialized/computed output

        // set the current time to the minimum of all children

        _currentTime = _timeNext;
        Log.Debug("[ROOT] Round completed, next time: {TimeNext}", _timeNext);


        if ((_timeUntilShutdown != TimeUnit.Undefined && _currentTime > _timeUntilShutdown) || StopConditionReached)
        {
            SimulationStep?.Dispose();
            SimulationRun?.Dispose();
            Log.Information("[ROOT] Stop condition reached, simulation will be interrupted");
            _timer!.Stop();
            _isCompleted = true;
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime)));
            return;
        }

        SimulationStep?.Dispose();
        SimulationStep = ActivitySource.StartActivity("SimulationStep");
        SimulationStep?.SetTag("CurrentTime", _currentTime.Value);
        ComputeOutputActivity = ActivitySource.StartActivity("ComputeOutput", ActivityKind.Client,
            parentContext: SimulationStep?.Context ?? new ActivityContext());

        _children.Tell(new ComputeOutput.StartComputeOutput(_currentTime));
    }

    private async Task SaveCheckpoint(string checkpoint, TimeUnit timeUnit)
    {
        Log.Debug("[ROOT] Saving checkpoint {Checkpoint} at time {Time}", checkpoint, timeUnit);
        await SnapshotManager.SaveSnapshotAsync(checkpoint, new CoordinatorSnapshotObject()
        {
            TimeLast = _currentTime,
            TimeNext = _timeNext,
            EventList = new Dictionary<string, (TimeUnit timeLast, TimeUnit timeNext)>()
        }, Self.Path.Name);
    }

    private bool StopConditionReached { get; set; }
}