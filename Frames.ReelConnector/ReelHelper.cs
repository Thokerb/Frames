using DynamicExpresso;
using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;
using Newtonsoft.Json.Linq;

namespace Frames.ReelConnector;

public static class ReelHelper
{
    public static StateJson OverwriteInitialStateValues(StateJson state, List<StatePropertyJson>? overrides)
    {
        if (overrides == null || overrides.Count == 0)
        {
            return state;
        }
        
        foreach (var overrideProp in overrides)
        {
            if (!state.Properties.ContainsKey(overrideProp.Name))
            {
                throw new ArgumentException($"Override property '{overrideProp.Name}' does not exist in the state.");
            }

            if (overrideProp.Value == null)
            {
                continue;
            }
            
            state.Properties[overrideProp.Name] = state.Properties[overrideProp.Name] with { Value = overrideProp.Value };
        }
        
        return state;
    }

    private static Func<StatePropertyJson, StatePropertyJson> OverrideIfExists(List<StatePropertyJson> overrides)
    {
        return property =>
        {
            var overrideProperty = overrides.FirstOrDefault(o => o.Name == property.Name);
            if (overrideProperty != null)
            {
                return property with { Value = overrideProperty.Value };
            }

            return property;
        };
    }


    private static Type GetTypeFromStateProperty(StatePropertyJson property)
    {
        return property.Type switch
        {
            StatePropertyValueType.BooleanExpression => typeof(bool),
            StatePropertyValueType.IntegerExpression => typeof(long),
            StatePropertyValueType.StringExpression => typeof(string),
            _ => throw new ArgumentOutOfRangeException()
        };
    }



    public static void UpdateState(StateJson stateStateJson, string key, object? value)
    {
        var elem = stateStateJson.Properties[key];
        stateStateJson.Properties[key] = elem with { Value = value };
    }
}