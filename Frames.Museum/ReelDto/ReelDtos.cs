namespace Frames.Museum.ReelDto;

using System.Collections.Generic;

public record StatePropertyJson
{
    public required string Name { get; init; }
    public required string Type { get; init; }
    public required StatePropertyValueType Value { get; init; } // string | number | boolean | undefined
}

public record StateJson
{
    public required string Name { get; init; }
    public required List<string> States { get; init; }
    public required string InitialState { get; init; }
    public required List<StatePropertyJson> Properties { get; init; }
}

public record ExpressionJson
{
    public required string Expression { get; init; }
    public bool? IsAssignment { get; init; } // Indicates if this expression is an assignment

    public ExpressionValueType?
        ReturnType { get; init; } // The type of the expression, e.g., 'int', 'bool', 'string', etc.
}

public record OutputJson
{
    public required string Port { get; init; } // Name of the port
    public required ExpressionJson Value { get; init; }
}

public record TransitionJson
{
    public string? Name { get; init; }
    public required ExpressionJson TransitionCondition { get; init; }
    public required string TransitionNewStateTypeRef { get; init; }
    public required List<ExpressionJson> TransitionStateModifications { get; init; }
}

public record StateConfigurationJson
{
    public required string StateTypeRef { get; init; }
    public required ExpressionJson TimeAdvanceExpression { get; init; }
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
    public required string ValueType { get; init; } // 'bool' | 'int' | 'string' | Array<PortObjectMap>
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

public enum ExpressionValueType
{
    BooleanExpression,
    IntegerExpression,
    StringExpression,
    ObjectExpression
}
public enum StatePropertyValueType
{
    BooleanExpression,
    IntegerExpression,
    StringExpression,
}