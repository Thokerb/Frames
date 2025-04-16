using System.Timers;
using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Serilog;
using Timer = System.Timers.Timer;

namespace Frames.Engine;

/// <summary>
/// RootCoordinator class represents the root coordinator which is responsible for managing the execution of the whole model
/// Based on the RootCoordinator from Theory of M&S by Zeigler.
/// Merge of Basic Root Coordinator and Parallel Coordinator
/// </summary>
public class RootCoordinator : ReceiveActor, ILogReceive
{
    
    private IActorRef? _children;
    
    private bool _hasStopCondition = false;
    private bool _isCompleted = false;
    
    private TimeUnit _timeUntilShutdown = TimeUnit.Infinity;
    
    private TimeUnit _timeNext;
    
    private TimeUnit _currentTime = TimeUnit.Zero;
    
    private List<IActorRef> _waitingForCompletion = new List<IActorRef>();
    
    private TimeSpan _timeOut = TimeSpan.FromSeconds(30);
    private Timer _timer;
    
    public RootCoordinator()
    {
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
        
        // Send initialization to all children
        _children.Tell(new EngineMessages.StartInitialization(_currentTime));
    }

    private void HandleTimeout(object? sender, ElapsedEventArgs e)
    {
        Log.Error("[ROOT] Timeout reached, simulation will be interrupted");
        _timer.Stop();
        _isCompleted = true;
        throw new TimeoutException("Simulation timed out after " + _timeOut.TotalMilliseconds + " milliseconds");
    }


    private void ReceiveFinishedExecuteTransition(ExecuteTransition.FinishedExecuteTransition obj)
    {
        // update the timeNext for the child
        _timeNext = obj.TimeNext;
        
        RoundCompleted();
    }

    private void ReceiveComputationCompleted(ComputeOutput.ComputedOutput obj)
    {
        // update the timeNext for the child
        _currentTime = obj.CurrentTime;
        
        // _children.Tell(new ExecuteTransition.StartExecuteTransition(new Bag(), _currentTime));
        // there are 2 cases where we can get the computed output
        // a: child simulator sends the computed output
        // b: child coordinator sends the computed output that is not linked to a child of him
        
        // when it is send by child coordinator, then we dont want to send it back -> this would create wrong behavior
        // when it is send by child simulator, then we want to send it back -> this would start execute transition
        
        if(Sender.Path.Name.StartsWith("coordinator-"))
        {
            // do nothing
            return;
        }
        
        _children.Tell(new ExecuteTransition.StartExecuteTransition(obj.Output, _timeNext));
    }

    private void ReceiveInitializationCompleted(EngineMessages.InitializationCompleted obj)
    {
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
            Log.Information("[ROOT] Stop condition reached, simulation will be interrupted");
            _timer.Stop();
            _isCompleted = true;
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime)));
            return;
        }
        
        _children.Tell(new ComputeOutput.StartComputeOutput(_currentTime));
    }
}