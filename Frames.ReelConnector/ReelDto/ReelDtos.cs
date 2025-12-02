using System.Text.Json;
using Frames.Model.ValueTypes;
using Frames.ReelConnector.Converter;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Frames.ReelConnector.ReelDto;

public record StatePropertyJson
{
    public required string Name { get; init; }
    public required StatePropertyValueType Type { get; init; }
    
    public required bool IsArray { get; init; }

    [JsonIgnore]
    private object? _value;
    
    public required object? Value
    {
        get
        {
            if (this.IsArray)
            {
                return this.Type switch
                {
                    StatePropertyValueType.BooleanExpression => _value as List<bool>,
                    StatePropertyValueType.IntegerExpression =>_value as List<double>,
                    StatePropertyValueType.StringExpression => _value as List<string>,
                    StatePropertyValueType.VoidExpression => throw new NotSupportedException("Void type cannot be an array"),
                    _ => throw new ArgumentOutOfRangeException()
                };
            }
            
            
            return this.Type switch
            {
                StatePropertyValueType.BooleanExpression => _value is bool b ? b : null,
                StatePropertyValueType.IntegerExpression => _value is "Infinity" or TimeUnit ? _value : Convert.ToDouble(_value),
                StatePropertyValueType.StringExpression => _value as string,
                StatePropertyValueType.VoidExpression => null,
                _ => throw new ArgumentOutOfRangeException()
            };
        }
        init
        {
            if (IsArray)
            {
                if (value is JArray jArray)
                {
                    _value = Type switch
                    {
                        StatePropertyValueType.BooleanExpression  => jArray.ToObject<List<bool>>(),
                        StatePropertyValueType.IntegerExpression => jArray.ToObject<List<double>>(),
                        StatePropertyValueType.StringExpression => jArray.ToObject<List<string>>(),
                        StatePropertyValueType.VoidExpression => throw new NotSupportedException("Void type cannot be an array"),
                        _ => throw new ArgumentOutOfRangeException()
                    };
                    return;
                }
                _value = Type switch
                {
                    StatePropertyValueType.BooleanExpression  => value as List<bool>,
                    StatePropertyValueType.IntegerExpression => value as List<double>,
                    StatePropertyValueType.StringExpression => value as List<string>,
                    StatePropertyValueType.VoidExpression => throw new NotSupportedException("Void type cannot be an array"),
                    _ => throw new ArgumentOutOfRangeException()
                };
            }
            _value = value;
            
        }
    } // string | number | boolean | undefined

    public override string ToString()
    {
        return $"{Name}: {Value}";
    }
}

public record StateJson
{
    public required string Name { get; init; }
    public required List<string> States { get; init; }
    public required string InitialState { get; init; }
    
    [JsonConverter(typeof(PropertyArrayToDictionaryConverter))]
    public required Dictionary<string, StatePropertyJson> Properties { get; init; }

    public override string ToString()
    {
        var root = new Dictionary<string, object?>();
        
        foreach (var elem in Properties)
        {
            AddValue(root, elem.Value.Name.Split('.'), 0, elem.Value);
        }

        return JsonSerializer.Serialize(root, new JsonSerializerOptions
        {
            WriteIndented = false,
            Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        });
    }
    private static void AddValue(Dictionary<string, object?> node, string[] parts, int index, object? value)
    {
        string key = parts[index];

        if (index == parts.Length - 1)
        {
            var castValue = (StatePropertyJson)value;
            if (castValue is null)
            {
                return;
            }
            node[key] = castValue.Value;
            return;
        }

        if (!node.ContainsKey(key) || node[key] is not Dictionary<string, object?>)
        {
            node[key] = new Dictionary<string, object?>();
        }

        AddValue((Dictionary<string, object?>)node[key]!, parts, index + 1, value);
    }

    public StateJson DeepClone()
    {
        var serialized = JsonConvert.SerializeObject(this);
        return JsonConvert.DeserializeObject<StateJson>(serialized)!;
    }
}


public record OutputJson
{
    public required string Port { get; init; } // Name of the port
    public required List<OutputValueEntries> Value { get; init; }
}

public record OutputValueEntries
{
    
    public required string Key { get; init; }
    public required ExpressionTreeJson Value { get; init; } 
}

public record TransitionJson
{
    public string? Name { get; init; }
    public required ExpressionTreeJson TransitionCondition { get; init; }
    public required string TransitionNewStateTypeRef { get; init; }
    public required List<ExpressionTreeJson> TransitionStateModifications { get; init; }
}

public record StateConfigurationJson
{
    public required string StateTypeRef { get; init; }
    public required ExpressionTreeJson TimeAdvanceExpression { get; init; }
    public required List<OutputJson> Output { get; init; }
    public required List<TransitionJson> Transitions { get; init; }
}

public record ReelJson
{
    public required List<StateJson> States { get; init; }
    public required List<AtomicModelJson> AtomicModels { get; init; }
    public required List<CoupledModelJson> CoupledModels { get; init; }
}

public record CoupledModelJson
{
    public required string Name { get; init; }
    public required List<PortJson> Ports { get; init; }
    public required List<ModelReferenceJson> Models { get; init; }
    public required List<CouplingJson> Couplings { get; init; }
}

public record CouplingJson
{
    public required string SourceModel { get; init; } // 'this' or model name
    public required string SourcePort { get; init; } // Port name
    public required string TargetModel { get; init; } // 'this' or model name
    public required string TargetPort { get; init; } // Port name
    public PortValueType Type { get; init; } // Type of the port value
}

public record ModelReferenceJson
{
    public required string Name { get; init; }
    public bool IsAtomicModel { get; init; }
    public required string ModelRef { get; init; } // Reference to the atomic model or coupled model
    public List<StatePropertyJson>? ModelOverrides { get; init; } // Overrides for the model's state properties
    public string? InitialState { get; init; } // Initial state reference
}

public record PortJson
{
    public required string Name { get; init; }
    public required PortType Type { get; init; }
    public required object ValueType { get; init; } // 'bool' | 'int' | 'string' | Array<PortObjectMap>
}

public record PortObjectMap
{
    public required string Name { get; init; }
    public required string ValueType { get; init; } // 'bool' | 'int' | 'string'
}

public record AtomicModelJson
{
    public required string Name { get; init; }
    public required string StateRef { get; init; } // Reference to the state type
    public required List<PortJson> Ports { get; init; }
    public required List<StateConfigurationJson> States { get; init; }
    public required List<StatePropertyJson> StateDefinitions { get; init; } // Assuming state definitions are similar to states
    public string? InitialState { get; init; } // Optional initial state

    public AtomicModelJson DeepClone()
    {
        var serialized = JsonConvert.SerializeObject(this);
        return JsonConvert.DeserializeObject<AtomicModelJson>(serialized)!;
    }
}

public enum PortType
{
    InPort,
    OutPort
}

public enum PortValueType
{
    ObjectExpression,
    BooleanExpression,
    IntegerExpression,
    StringExpression,
    VoidExpression
}

public enum StatePropertyValueType
{
    ObjectExpression,
    BooleanExpression,
    IntegerExpression,
    StringExpression,
    VoidExpression
}


public enum Operator
{
    Literal,
    ArrayGet,
    ArrayAppend,
    ArrayPrepend,
    ArrayLength,
    ArrayRemove,
    Equal,          // ==
    NotEqual,       // !=
    LessThan,       // <
    LessThanOrEqual,// <=
    GreaterThan,    // >
    GreaterThanOrEqual, // >=
    Add,            // +
    Subtract,       // -
    Multiply,       // *
    Divide,         // /
    Modulo,         // %
    And,            // and
    Or,             // or
    Not,            // !
    Assign          // =
}

public enum PortAccessor
{
    First,
    Any,
    Index
}

public record ExpressionTreeJson
{
    
    // Literal value → can be string | number | bool | arrays of those.
    // Represented as object? so it can hold any of these.
    public object? Value { get; init; }

    public PortValueType ValueType { get; init; }

    public string? PortObjectPropertyName { get; init; }
    
    public PortAccessor? PortAccessor { get; init; }
    public int? PortAccessorIndex { get; init; }
    
    public string? VariableName { get; init; }

    [JsonConverter(typeof(OperatorConverter))]
    public Operator? Operator { get; init; }

    public bool? IsPort { get; init; }

    public ExpressionTreeJson? Left { get; init; }

    public ExpressionTreeJson? Right { get; init; }

    public bool? IsLeaf { get; init; }
}
