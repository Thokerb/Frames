using System.Reflection;
using DynamicExpresso;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector;

public class ReelState : IState
{
    // Define properties and methods for the ReelState here
    public StateJson StateJson { get; set; }
    public required string CurrentState { get; set; }
    public int CompareTo(object? obj)
    {
        if (obj is ReelState otherState)
        {
            // Implement comparison logic here, e.g., based on some property
            return string.Compare(StateJson.Name, otherState.StateJson.Name, StringComparison.Ordinal);
        }
        return 1; // or throw an exception if comparison is not valid
    }
}

public sealed class ReelAtomicModel : AtomicModel<ReelState>
{
    public ReelAtomicModel(AtomicModelJson jsonModel, StateJson state)
    {
        JsonModel = jsonModel;
        Name = jsonModel.Name;
        State = new ReelState()
        {
            StateJson = ReelHelper.OverwriteInitialStateValues(state, jsonModel.StateDefinitions),
            CurrentState = jsonModel.InitialState ?? state.InitialState
        };
    }

    public ReelAtomicModel(AtomicModelJson jsonModel, StateJson state, List<StatePropertyJson>? modelRefModelOverrides, string? modelRefInitialState)
    {
        JsonModel = jsonModel;
        State = new ReelState()
        {
            StateJson = ReelHelper.OverwriteInitialStateValues(ReelHelper.OverwriteInitialStateValues(state, jsonModel.StateDefinitions), modelRefModelOverrides),
            CurrentState = modelRefInitialState ?? jsonModel.InitialState ?? state.InitialState // TODO: document order of precedence
        };    
    }

    private AtomicModelJson JsonModel {get; init; }
    
    public override ReelState State { get; set; }
    public override TimeUnit TimeAdvance(ReelState state)
    {
        
        
        var currentState = JsonModel.States.FirstOrDefault(x => x.StateTypeRef == state.CurrentState);
        
        if (currentState == null)
        {
            throw new InvalidOperationException($"State '{state.CurrentState}' not found in model '{JsonModel.Name}'. Available states: {string.Join(", ", JsonModel.States.Select(s => s.StateTypeRef))}");
        }

        if (currentState.TimeAdvanceExpression.Expression == "Infinity")
        {
            return TimeUnit.Infinity;
        }
        
        var interpreter = new Interpreter();
        var parameters = currentState.TimeAdvanceExpression.Variables.Distinct().Select(x => ReelHelper.CreateParameter(x,State.StateJson.Properties)).ToList();
        
        int result = interpreter.Eval<int>(currentState.TimeAdvanceExpression.Expression, parameters.ToArray());
        
        return new TimeUnit(result);
    }

    public override ReelState ExternalTransition(ReelState state, Bag bag)
    {
        var currentState = JsonModel.States.First(x => x.StateTypeRef == state.CurrentState);

        var interpreter = new Interpreter();
        foreach (var transition in currentState.Transitions)
        {
            if (string.IsNullOrWhiteSpace(transition.TransitionCondition.Expression))
            {
                continue;
            }
            
            var applies = interpreter.Eval<bool>(transition.TransitionCondition.Expression.PrepareExpression(),
                transition.TransitionCondition.Variables.Distinct()
                    .Select(x => ReelHelper.CreateParameter(x, state.StateJson.Properties,JsonModel.Ports, bag)).ToArray());

            if (applies)
            {
                state.CurrentState = transition.TransitionNewStateTypeRef;
                state.StateJson = ReelHelper.UpdateState(state.StateJson, transition.TransitionStateModifications,JsonModel.Ports, bag);
                
                break;
            }
        }
        
        return state;
    }

    public override ReelState InternalTransition(ReelState state)
    {
        var currentState = JsonModel.States.First(x => x.StateTypeRef == State.CurrentState);

        var interpreter = new Interpreter();
        foreach (var transition in currentState.Transitions)
        {

            if(transition.TransitionCondition.Expression.Contains("PortIn") || transition.TransitionCondition.Expression.Contains("PortOut"))
            {
                // Internal transitions should not have PortIn or PortOut in the condition
                continue;
            }

            
            // empty condition means always applies
            var applies = string.IsNullOrWhiteSpace(transition.TransitionCondition.Expression) || interpreter.Eval<bool>(transition.TransitionCondition.Expression,
                transition.TransitionCondition.Variables.Distinct()
                    .Select(x => ReelHelper.CreateParameter(x, state.StateJson.Properties)).ToArray());

            if (applies)
            {
                state.CurrentState = transition.TransitionNewStateTypeRef;
                state.StateJson = ReelHelper.UpdateState(state.StateJson, transition.TransitionStateModifications);
                
                break;
            }
        }
        
        return state;
        
    }

    public override Bag Output(ReelState state)
    {
        var currentState = JsonModel.States.First(x => x.StateTypeRef == state.CurrentState);
        var bag = new Bag();
        
        var interpreter = new Interpreter();
        foreach (var output in currentState.Output)
        {
            var value = interpreter.Eval(output.Value.Expression.PrepareExpression(),
                output.Value.Variables.Distinct()
                    .Select(x => ReelHelper.CreateParameter(x, state.StateJson.Properties)).ToArray());
            
            bag.Inputs.Add(output.Port, value);
        }
        
        return bag;
    }
}