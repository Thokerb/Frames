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

    public static Parameter CreateParameter(string variableName, List<StatePropertyJson> stateJsonProperties)
    {
        var variable = stateJsonProperties.FirstOrDefault(p => p.Name == variableName);
        if (variable == null)
        {
            throw new ArgumentException($"Variable '{variableName}' not found in state properties.");
        }

        return new Parameter(variableName, GetTypeFromStateProperty(variable), variable.Value);
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

    public static Parameter CreateParameter(string variableName, List<StatePropertyJson> stateJsonProperties,
        List<PortJson> jsonModelPorts, Bag bag)
    {
        if (bag.Inputs.ContainsKey(variableName))
        {
            var port = jsonModelPorts.First(p => p.Name == variableName);

            return new Parameter(variableName, GetTypeFromPortValueType(port.ValueType, variableName),
                bag.Inputs[variableName]);
        }
        else
        {
            return CreateParameter(variableName, stateJsonProperties);
        }
    }

    public static Type GetTypeFromPortValueType(object portValueType, string variableName)
    {
        if (portValueType is JArray array)
        {
            var elem = array.First(x => x.Value<string>("name") == variableName);
            var valueType = elem.Value<string>("valueType");
            return valueType switch
            {
                "bool" => typeof(bool),
                "int" => typeof(long),
                "string" => typeof(string),
                _ => throw new ArgumentOutOfRangeException(nameof(portValueType),
                    $"Unknown port value type: {valueType}")
            };
        }

        return (portValueType as string) switch
        {
            "bool" => typeof(bool),
            "int" => typeof(long),
            "string" => typeof(string),
            _ => throw new ArgumentOutOfRangeException(nameof(portValueType),
                $"Unknown port value type: {portValueType}")
        };
    }

    public static void UpdateState(StateJson stateStateJson, string key, object? value)
    {
        var state = stateStateJson;
        var elem = state.Properties[key];
        state.Properties[key] = elem with { Value = value };
    }
}