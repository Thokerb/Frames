using System.Text.Json;

namespace Frames.ReelConnector.ReelDto;

public record StatePropertyJson
{
    public required string Name { get; init; }
    public required StatePropertyValueType Type { get; init; }
    
    public required bool IsArray { get; init; }
    public required object Value { get; init; } // string | number | boolean  | Array<string> | Array<number> | Array<boolean> | undefined
    
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
            WriteIndented = true,
            Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        });
    }
    private static void AddValue(Dictionary<string, object?> node, string[] parts, int index, object? value)
    {
        string key = parts[index];

        if (index == parts.Length - 1)
        {
            node[key] = value;
            return;
        }

        if (!node.ContainsKey(key) || node[key] is not Dictionary<string, object?>)
        {
            node[key] = new Dictionary<string, object?>();
        }

        AddValue((Dictionary<string, object?>)node[key]!, parts, index + 1, value);
    }
}

// public record ExpressionJson
// {
//     public required string Expression { get; init; }
//     public bool? IsAssignment { get; init; } // Indicates if this expression is an assignment
//     public required List<string> Variables { get; init; }
//     public ExpressionValueType? ReturnType { get; init; } // The type of the expression, e.g., 'int', 'bool', 'string', etc.
// }

public record OutputJson
{
    public required string Port { get; init; } // Name of the port
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
    public ExpressionValueType Type { get; init; } // Type of the port value
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

    public required List<StatePropertyJson>
        StateDefinitions { get; init; } // Assuming state definitions are similar to states

    public string? InitialState { get; init; } // Optional initial state
}

public enum PortType
{
    InPort,
    OutPort
}


public enum StatePropertyValueType
{
    BooleanExpression,
    IntegerExpression,
    StringExpression,
}

public enum ExpressionValueType
{
    String,
    Number,
    Boolean,
    StringArray,
    NumberArray,
    BooleanArray
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

public record ExpressionTreeJson
{
    
    // Literal value → can be string | number | bool | arrays of those.
    // Represented as object? so it can hold any of these.
    public object? Value { get; init; }

    public ExpressionValueType? ValueType { get; init; }

    public string? VariableName { get; init; }

    public Operator? Operator { get; init; }

    public bool? IsPort { get; init; }

    public ExpressionTreeJson? Left { get; init; }

    public ExpressionTreeJson? Right { get; init; }

    public bool? IsLeaf { get; init; }
}
