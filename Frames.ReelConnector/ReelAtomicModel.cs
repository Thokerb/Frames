using DynamicExpresso;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.ReelConnector.Ast;
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

    public override string ToString()
    {
        return $"| {CurrentState} | StateJson = {StateJson}";
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

        var timeAdvance = currentState.TimeAdvanceExpression.Evaluate<TimeUnit>(State.StateJson); // Validate expression

        return new TimeUnit(timeAdvance);
    }

    public override ReelState ExternalTransition(ReelState state, Bag bag)
    {
        var currentState = JsonModel.States.First(x => x.StateTypeRef == state.CurrentState);

        foreach (var transition in currentState.Transitions)
        {
            if (!transition.TransitionCondition.ContainsPort())
            {
                continue;
            }

            var applies = transition.TransitionCondition.Evaluate<bool>(state.StateJson, bag);

            if (applies)
            {
                state.CurrentState = transition.TransitionNewStateTypeRef;
                foreach (var transitionTransitionStateModification in transition.TransitionStateModifications)
                {
                    transitionTransitionStateModification.Evaluate(state.StateJson, bag);
                }
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

            if(transition.TransitionCondition.ContainsPort())
            {
                // Internal transitions should not have PortIn or PortOut in the condition
                continue;
            }

            
            var applies = transition.TransitionCondition.Evaluate<bool>(state.StateJson);


            if (applies)
            {
                state.CurrentState = transition.TransitionNewStateTypeRef;
                foreach (var transitionTransitionStateModification in transition.TransitionStateModifications)
                {
                    transitionTransitionStateModification.Evaluate(state.StateJson);
                }                
                break;
            }
        }
        
        return state;
        
    }

    public override Bag Output(ReelState state)
    {
        var currentState = JsonModel.States.First(x => x.StateTypeRef == state.CurrentState);
        var bag = new Bag();
        
        foreach (var output in currentState.Output)
        {
            output.Value.Evaluate(state.StateJson,bag);
        }
        
        return bag;
    }
}