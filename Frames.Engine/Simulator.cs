using Frames.Engine.Exceptions;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Serilog;

namespace Frames.Engine;

/// <summary>
/// Simulator class represents a simulator which is responsible for managing the execution of an atomic model.
/// Based on the Simulator from Theory of M&S by Zeigler.
/// </summary>
public class Simulator : ReceiveActor, ILogReceive
{
    private readonly IActorRef _coordinator;
    
    public Simulator(IActorRef coordinator, IAtomicModelBase atomicModel)
    {
        _coordinator = coordinator;
        _atomicModel = atomicModel;
        
        Receive<EngineMessages.StartInitialization>(HandleInitialization);
        Receive<ComputeOutput.StartComputeOutput>(HandleComputeOutput);
        Receive<ExecuteTransition.StartExecuteTransition>(HandleExecuteTransition);
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
        Log.Information("[{Name} - INTERNAL] Old state: {OldState}", Self.Path.Name ,state);
        var newState = _atomicModel.InternalTransition(state);
        Log.Information("[{Name} - INTERNAL] New state: {NewState}", Self.Path.Name, newState);
        _atomicModel.State = newState;

    }
    
    private void RunExternalState(IState state, Bag input)
    {
        // Log Bag
        Log.Debug("[External] Bag: {Bag}", input);
        Log.Information("[{Name} - EXTERNAL ]Old state: {OldState}", Self.Path.Name, state);
        var newState = _atomicModel.ExternalTransition(state, input);
        Log.Information("[{Name} - EXTERNAL ]New state: {NewState}", Self.Path.Name, newState);
        _atomicModel.State = newState;
    }
    
    private void RunConfluentState(IState state, Bag input)
    {
        // Log Bag
        Log.Debug("[CONFLUENT] Bag: {Bag}", input);
        Log.Information("[{Name} - CONFLUENT]Old state: {OldState}", Self.Path.Name, state);
        var newState = _atomicModel.ConfluentTransition(state, input);
        Log.Information("[{Name} - CONFLUENT]New state: {NewState}", Self.Path.Name, newState);
        _atomicModel.State = newState;
    }
    
    private TimeUnit RunTimeAdvance(IState state)
    {
        var timeAdvance = _atomicModel.TimeAdvance(state);
        Log.Information("[TIME ADVANCE] Time advance: {TimeAdvance}", timeAdvance);
        
        // check if atomicState equals oldState
        if(!state.Equals(_atomicModel.State))
        {
            throw new IllegalStateModificationException("TimeAdvance");
        }
        
        return timeAdvance;
    }

    private Bag RunOutput(IState state)
    {
        var output = _atomicModel.Output(state);
        if(!state.Equals(_atomicModel.State))
        {
            throw new IllegalStateModificationException("RunOutput");
        }
        Log.Information("[OUTPUT] Output: {Output}", output);
        return output;
    }
    
    private void HandleExecuteTransition(ExecuteTransition.StartExecuteTransition obj)
    {
        if(obj.Input.IsEmpty && obj.CurrentTime == _timeNext)
        {
            // Internal transition
            RunInternalState(_atomicModel.State);
        }
        else if(!obj.Input.IsEmpty && obj.CurrentTime == _timeNext)
        {
            // Confluent transition
            RunConfluentState(_atomicModel.State, obj.Input);
        }
        else if(!obj.Input.IsEmpty && (_timeLast <= obj.CurrentTime && obj.CurrentTime <= _timeNext))
        {
            // External transition
            _timeElapsed = obj.CurrentTime - _timeLast;
            RunExternalState(_atomicModel.State, obj.Input);
        }
        _timeLast = obj.CurrentTime;
        _timeNext = _timeLast + RunTimeAdvance(_atomicModel.State);
        
        // Send the finished execute transition message to the coordinator
        _coordinator.Tell(new ExecuteTransition.FinishedExecuteTransition(_timeNext));
    }

    /**
     * 12: if t = tn then
     *      13: y = λ(s)
     *      14: send y-message (y, t) to parent coordinator
     * 15: end if
     */
    private void HandleComputeOutput(ComputeOutput.StartComputeOutput obj)
    {
        // Check if the current time is equal to the next time
        if (obj.CurrentTime == _timeNext)
        {
            // Compute the output
            _outputBag = RunOutput(_atomicModel.State);
            
            // Send the output message to the coordinator
            _coordinator.Tell(new ComputeOutput.ComputedOutput(_outputBag, obj.CurrentTime));
        }
        else
        {
            Log.Error("Possible sync error");
            // TODO: is this a sync error and should we throw an exception?
        }

    }

    private void HandleInitialization(EngineMessages.StartInitialization msg)
    {
        // tl = t −e
        _timeLast = msg.CurrentTime - _timeElapsed;
        // tn = tl + ta(s)
        _timeNext = _timeLast + RunTimeAdvance(_atomicModel.State);
        
        // Send the initialization completed message to the coordinator
        _coordinator.Tell(new EngineMessages.InitializationCompleted(_timeLast, _timeNext));
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
    private readonly IAtomicModelBase _atomicModel;
    
    /// <summary>
    /// Output message bag
    /// </summary>
    private Bag _outputBag = new Bag();

    protected override void PreStart()
    {
        // Initialization logic
        base.PreStart();
    }

    protected override void PostStop()
    {
        // Cleanup logic
        base.PostStop();
    }
    


}