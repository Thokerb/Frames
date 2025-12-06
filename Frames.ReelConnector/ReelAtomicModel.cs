using System.Text;
using DynamicExpresso;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.ReelConnector.Ast;
using Frames.ReelConnector.ReelDto;
using Newtonsoft.Json;

namespace Frames.ReelConnector;

public class ReelState : IState
{
    // Define properties and methods for the ReelState here
    public required StateJson StateJson { get; set; }
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
        return $"{{\"currentState\": \"{CurrentState}\", \"StateJson\": {StateJson}}}";
    }
}

public sealed class ReelAtomicModel : AtomicModel<ReelState>
{
    [JsonProperty]
    public string TransitionTaken { get; private set; } = string.Empty;

    public ReelAtomicModel(AtomicModelJson jsonModel, StateJson stateJson, List<StatePropertyJson>? modelRefModelOverrides = null,
        string? modelRefInitialState= null,ReelState? state = null)
    {
        JsonModel = jsonModel;

        if (state != null)
        {
            // this is for deserializing by akka, dont do this manually
            State = state;
        }
        else
        {
            State = new ReelState()
            {
                StateJson = ReelHelper.OverwriteInitialStateValues(
                    ReelHelper.OverwriteInitialStateValues(stateJson, jsonModel.StateDefinitions), modelRefModelOverrides),
                CurrentState =
                    modelRefInitialState ??
                    jsonModel.InitialState ?? stateJson.InitialState // TODO: document order of precedence
            };
        }
    }

    [JsonProperty]
    private AtomicModelJson JsonModel { get; init; }
    
    [JsonProperty]
    public override ReelState State { get; set; }

    public override TimeUnit TimeAdvance(ReelState state)
    {
        var currentState = JsonModel.States.FirstOrDefault(x => x.StateTypeRef == state.CurrentState);

        if (currentState == null)
        {
            throw new InvalidOperationException(
                $"State '{state.CurrentState}' not found in model '{JsonModel.Name}'. Available states: {string.Join(", ", JsonModel.States.Select(s => s.StateTypeRef))}");
        }

        var timeAdvance = currentState.TimeAdvanceExpression.Evaluate<TimeUnit>(State.StateJson, CurrentTime); // Validate expression

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

            bool applies = false;
            try
            {
                applies = transition.TransitionCondition.Evaluate<bool>(state.StateJson, CurrentTime, bag);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            if (applies)
            {
                state.CurrentState = transition.TransitionNewStateTypeRef;
                TransitionTaken = transition.Name ?? string.Empty;
                foreach (var transitionTransitionStateModification in transition.TransitionStateModifications)
                {
                    transitionTransitionStateModification.Evaluate(state.StateJson, CurrentTime, bag);
                }

                return state;
            }
        }
        TransitionTaken = "No External Transition";
        return state;
    }

    public override ReelState ConfluentTransition(ReelState state, Bag bag)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("ConfluentTransition: ");
        var internalTr = InternalTransition(state);
        sb.Append("Internal: ");
        sb.Append(TransitionTaken);
        sb.Append("> ");
        var external = ExternalTransition(internalTr, bag);
        sb.Append("External: ");
        sb.Append(TransitionTaken);
        
        TransitionTaken = sb.ToString();
        
        return external;
    }

    public override ReelState InternalTransition(ReelState state)
    {
        var currentState = JsonModel.States.First(x => x.StateTypeRef == State.CurrentState);

        foreach (var transition in currentState.Transitions)
        {
            if (transition.TransitionCondition.ContainsPort())
            {
                // Internal transitions should not have PortIn or PortOut in the condition
                continue;
            }

            bool applies = false;
            try
            {
                applies = transition.TransitionCondition.Evaluate<bool>(state.StateJson, CurrentTime);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }



            if (applies)
            {
                state.CurrentState = transition.TransitionNewStateTypeRef;
                TransitionTaken = transition.Name ?? string.Empty;
                foreach (var transitionTransitionStateModification in transition.TransitionStateModifications)
                {
                    transitionTransitionStateModification.Evaluate(state.StateJson, CurrentTime);
                }

                return state;
            }
        }        
        TransitionTaken = "No Internal Transition";

        return state;
    }

    public override Bag Output(ReelState state)
    {
        var currentState = JsonModel.States.First(x => x.StateTypeRef == state.CurrentState);
        var bag = new Bag();

        foreach (var output in currentState.Output)
        {
            // todo: make this a complete expression with assignment


            ReelPortObject result = new ReelPortObject()
            {
                Properties = output.Value.Select(x => new ReelPortObjectProperty()
                {
                    Key = x.Key,
                    Value = x.Value.Evaluate<object>(state.StateJson, CurrentTime, bag)
                }).ToList()
            };
            bag.AddInput(output.Port, result);
        }

        return bag;
    }
}


public record ReelPortObject
{
    public required List<ReelPortObjectProperty> Properties { get; init; } 
}

public record ReelPortObjectProperty
{
    public required string Key { get; init; }
    public required object Value { get; init; }
}