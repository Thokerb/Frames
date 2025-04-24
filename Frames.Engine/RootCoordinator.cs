using System.Diagnostics;
using System.Text;
using System.Timers;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Engine.Monitoring;
using Frames.Model.ValueTypes;
using Serilog;
using Timer = System.Timers.Timer;

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
    
    private readonly List<IActorRef> _waitingForCompletion = new();
    
    // TODO: for debugging purposes only
    private readonly TimeSpan _timeOut = TimeSpan.FromSeconds(300);
    private Timer? _timer;
    
    public RootCoordinator(Instrumentation instrumentation)
    {
        
        ActivitySource = instrumentation.ActivitySource;
        // Control Messages
        Receive<Simulation.StartSimulation>(ReceiveSimulationStart);
        Receive<Simulation.InterruptSimulation>(ReceiveSimulationInterrupt);
        Receive<Simulation.SetStopAfterTime>(ReceiveSetStopAfterTime);
        Receive<Simulation.QueryIsCompleted>(ReceiveIsCompleted);
        
        // Simulation Messages
        Receive<EngineMessages.InitializationCompleted>(ReceiveInitializationCompleted);
        Receive<ComputeOutput.ComputedOutput>(ReceiveComputationCompleted);
        Receive<ExecuteTransition.FinishedExecuteTransition>(ReceiveFinishedExecuteTransition);

    }
    
    private Activity SimulationRun { get; set; }
    private Activity SimulationStep { get; set; }

    private ActivitySource ActivitySource { get; set; }
    
    private Activity InitializationActivity { get; set; }
    private Activity ComputeOutputActivity { get; set; }
    private Activity ExecuteTransitionActivity { get; set; }
    

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

        
        if(!obj.Children.Path.Name.StartsWith("simulator-") && !obj.Children.Path.Name.StartsWith("coordinator-"))
        {
            throw new SimulatorException("Wrong actor type or naming, expected simulator or coordinator");
        }
        
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
        
        SimulationRun = ActivitySource.StartActivity("SimulationRun") ??
                        throw new InvalidOperationException("ActivitySource is null");
        SimulationStep = ActivitySource.StartActivity("SimulationStep", ActivityKind.Internal, parentContext: SimulationRun.Context) ?? 
                         throw new InvalidOperationException("ActivitySource is null");
        SimulationStep.SetTag("CurrentTime", _currentTime.Value);
        // Send initialization to all children
        InitializationActivity = ActivitySource.StartActivity("Initialization", ActivityKind.Client, parentContext: SimulationStep.Context) ??
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


    private void ReceiveFinishedExecuteTransition(ExecuteTransition.FinishedExecuteTransition obj)
    {
        ExecuteTransitionActivity.Dispose();
        // update the timeNext for the child
        
        
        Log.Information("================================================================");
        Log.Information("Round time: {TimeNow}", this._currentTime);
        Log.Information("Next time: {TimeNext}", obj.TimeNext);
        string logState = PrintState(obj.ToStringState);
        if (obj.ToStringState != null)
        {
            Log.Information("State:\n{State}",  logState);
        }
        
        _timeNext = obj.TimeNext;
        
        RoundCompleted();
    }

    private string PrintState(Dictionary<string, TraceInformation>? objToStringState)
    {
        if (objToStringState == null)
        {
            return string.Empty;
        }
        
        StringBuilder builder = new StringBuilder();
        foreach (var state in objToStringState)
        {
            builder.AppendLine($"[{state.Key}] {state.Value.State}");
        }
        
        return builder.ToString();
    }

    private void ReceiveComputationCompleted(ComputeOutput.ComputedOutput obj)
    {
        ComputeOutputActivity.Dispose();
        // update the timeNext for the child
        _currentTime = obj.CurrentTime;
        
        
        
        // _children.Tell(new ExecuteTransition.StartExecuteTransition(new Bag(), _currentTime));
        // there are 2 cases where we can get the computed output
        // a: child simulator sends the computed output
        // b: child coordinator sends the computed output that is not linked to a child of him
        
        
        // we are always sending the computed output to the children to initialize the execute transition
        
        // OUTDATED
        // when it is send by child coordinator, then we dont want to send it back -> this would create wrong behavior
        // when it is send by child simulator, then we want to send it back -> this would start execute transition
        Thread.Sleep(10);
        ExecuteTransitionActivity = ActivitySource.StartActivity("ExecuteTransition", ActivityKind.Client, parentContext: SimulationStep.Context) ?? throw new InvalidOperationException("ActivitySource is null");
        _children.Tell(new ExecuteTransition.StartExecuteTransition(obj.Output, _timeNext));
        
    }


    private void ReceiveInitializationCompleted(EngineMessages.InitializationCompleted obj)
    {
        InitializationActivity.Dispose();
        _timeNext = obj.TimeNext;
        RoundCompleted();
        
    }
    
    private void RoundCompleted()
    {
        
        // children is initialized/computed output
            
        // set the current time to the minimum of all children
        
        _currentTime = _timeNext;
        Log.Information("[ROOT] Round completed, next time: {TimeNext}", _timeNext);
     
        
        if (_timeUntilShutdown != TimeUnit.Undefined && _currentTime > _timeUntilShutdown)
        {
            SimulationStep.Dispose();
            SimulationRun.Dispose();
            Log.Information("[ROOT] Stop condition reached, simulation will be interrupted");
            _timer!.Stop();
            _isCompleted = true;
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime)));
            return;
        }
        SimulationStep.Dispose();
        SimulationStep = ActivitySource.StartActivity("SimulationStep") ??
                         throw new InvalidOperationException("ActivitySource is null");
        SimulationStep.SetTag("CurrentTime", _currentTime.Value);
        ComputeOutputActivity = ActivitySource.StartActivity("ComputeOutput", ActivityKind.Client, parentContext: SimulationStep.Context) ??
                                        throw new InvalidOperationException("ActivitySource is null");

        _children.Tell(new ComputeOutput.StartComputeOutput(_currentTime));
    }
}