using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Serilog;

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
    
    private TimeSpan _timeOut = TimeSpan.FromSeconds(3);
    
    public RootCoordinator()
    {
        // Control Messages
        Receive<Simulation.StartSimulation>(ReceiveSimulationStart);
        Receive<Simulation.InterruptSimulation>(ReceiveSimulationInterrupt);
        Receive<Simulation.SetStopAfterTime>(ReceiveSetStopAfterTime);
        Receive<Simulation.QueryIsCompleted>(ReceiveIsCompleted);
        
        // Simulation Messages
        Receive<Initialization.InitializationCompleted>(ReceiveInitializationCompleted);
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

        if (!_hasStopCondition)
        {
            throw new NoStopConditionException();
        }
        
        _children = obj.Children;

        // Assumption, all children are set
        // Assumption, children are not dynamically added or removed
        
        // initialize _timeNext with children and null

        // Send initialization to all children
        _children.Tell(new Initialization.StartInitialization(_currentTime));
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
        _children.Tell(new ExecuteTransition.StartExecuteTransition(obj.Output, _timeNext));
    }

    private void ReceiveInitializationCompleted(Initialization.InitializationCompleted obj)
    {
        _timeNext = obj.TimeNext;
        RoundCompleted();
        
    }
    
    private void RoundCompleted()
    {
        if (_timeUntilShutdown != TimeUnit.Undefined && _currentTime > _timeUntilShutdown)
        {
            _isCompleted = true;
            _waitingForCompletion.ForEach(x => x.Tell(new Simulation.IsCompleted(_currentTime)));
            return;
        }
        
        // children is initialized/computed output
            
        // set the current time to the minimum of all children
        _currentTime = _timeNext;
        Log.Information("[ROOT] Round completed, next time: {TimeNext}", _timeNext);
     
        if(_timeNext == TimeUnit.Infinity)
        {
            throw new SimulatorException("TimeNext is infinity");
        }
        
        
        _children.Tell(new ComputeOutput.StartComputeOutput(_currentTime));
    }
}