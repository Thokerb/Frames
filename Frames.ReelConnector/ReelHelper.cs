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
        
        var newState = state with { Properties = state.Properties.Select(OverrideIfExists(overrides)).ToList() };
        return newState;
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

    public static StateJson UpdateState(StateJson stateStateJson,
        List<ExpressionJson> transitionTransitionStateModifications, List<PortJson> ports, Bag bag)
    {
        var state = stateStateJson;
        var interpreter = new Interpreter();
        foreach (var expressionJson in transitionTransitionStateModifications)
        {
            var parameters = expressionJson.Variables.Select(p => CreateParameter(p, state.Properties, ports, bag))
                .ToList();
            var result = interpreter.Eval(expressionJson.Expression.PrepareExpression(), parameters.ToArray());
            var assignmentPropertyName = expressionJson.Expression.PrepareExpression().Split("=")[0].Trim();
            state = state with
            {
                Properties = state.Properties
                    .Select(OverrideIfExists(assignmentPropertyName, result)).ToList()
            };
        }
        return state;
    }

    private static Func<StatePropertyJson, StatePropertyJson> OverrideIfExists(string name, object value)
    {
        return property =>
        {
            if (property.Name == name)
            {
                return property with { Value = value };
            }

            return property;
        };
    }

    public static StateJson UpdateState(StateJson stateStateJson, List<ExpressionJson> transitionTransitionStateModifications)
    {
        var state = stateStateJson;
        var interpreter = new Interpreter();
        foreach (var expressionJson in transitionTransitionStateModifications)
        {
            var assignmentPropertyName = expressionJson.Expression.Split("=")[0].Trim();
            
            var parameters = expressionJson.Variables.Distinct().Select(p => CreateParameter(p, state.Properties))
                .ToList();
            var result = interpreter.Eval(expressionJson.Expression, parameters.ToArray());
            state = state with
            {
                Properties = state.Properties
                    .Select(OverrideIfExists(assignmentPropertyName, result)).ToList()
            };
        }
        return state;    
    }
    
    public static string PrepareExpression(this string expression)
    {
        // Remove whitespace and ensure the expression is ready for evaluation
        return expression
            .Replace("InPort", "")
            .Replace("OutPort", "")
            .Replace(" and ", " && ")
            .Replace(" or ", " || ");
    }
}