using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public interface IAstElement
{
    object? Evaluate(ExpressionTreeJson? tree, StateJson stateJson, Bag? bag);    
}


public static class ExpressionTreeJsonExtension
{
    public static T? Evaluate<T>(this ExpressionTreeJson tree, StateJson stateJson, Bag? bag = null)
    {
        var element = AstBuilder.Build(tree);
        var result = element.Evaluate(tree, stateJson, bag);

        if (typeof(T) == typeof(TimeUnit))
        {
            
            var converted = result switch
            {
                long l => (TimeUnit)l,
                int i => (TimeUnit)(long)i,
                TimeUnit tu => tu,
                _ => throw new InvalidCastException($"Cannot convert {result.GetType()} to TimeUnit")
            };
            return (T)(object)converted;
        }

        return (T) result ;

    }    
    
    public static void Evaluate(this ExpressionTreeJson tree, StateJson stateJson, Bag? bag = null)
    {
        var element = AstBuilder.Build(tree);
        element.Evaluate(tree, stateJson, bag);
    }

    public static bool ContainsPort(this ExpressionTreeJson tree)
    {
        if (tree.IsPort.HasValue && tree.IsPort.Value)
        {
            return true;
        }

        if (tree.IsLeaf.HasValue && tree.IsLeaf.Value)
        {
            return tree.IsPort.HasValue && tree.IsPort.Value;
        }
        
        return (tree.Left?.ContainsPort() ?? false) || (tree.Right?.ContainsPort() ?? false);
    }
}

public abstract class BaseAstElement : IAstElement
{
    public object? Evaluate(ExpressionTreeJson? tree, StateJson stateJson, Bag? bag)
    {
        if (tree == null)
            return null;

        var element = AstBuilder.Build(tree);

        return element.EvaluateImpl(tree, stateJson, bag);
    }

    protected abstract object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag);
}

public class LiteralAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        object? result = null;
        bool resultSet = false;
        if (tree.VariableName is not null)
        {
            resultSet = true;
            if (tree.IsPort.HasValue && tree.IsPort.Value)
            {
                var variableFromBag = bag?.Inputs.GetValueOrDefault(tree.VariableName);
                result = variableFromBag;
            }
            else
            {
                var prop =  stateJson.Properties[tree.VariableName];
                
                if(prop.IsArray )
                {
                    if (prop.Value is null)
                    {
                        result = prop.Type switch
                        {
                            StatePropertyValueType.BooleanExpression => new List<bool>(),
                            StatePropertyValueType.IntegerExpression => new List<long>(),
                            StatePropertyValueType.StringExpression => new List<string>(),
                            StatePropertyValueType.VoidExpression => throw new NotSupportedException("Void type cannot be an array"),
                        };
                        return result;
                    }

                    return prop.Type switch
                    {
                        StatePropertyValueType.BooleanExpression => prop.Value as List<bool>,
                        StatePropertyValueType.IntegerExpression => prop.Value as List<long>,
                        StatePropertyValueType.StringExpression => prop.Value as List<string>,
                        StatePropertyValueType.VoidExpression => throw new NotSupportedException("Void type cannot be an array"),
                    };


                }
                result = prop.Value;
                
                
            }

        }
        if (tree.Value is not null)
        {
            resultSet = true;
            result = tree.Value;
        }

        if (!resultSet)
        {
            throw new InvalidOperationException("Literal must have either a Value or a VariableName");
        }
        
        if (result is null)
        {
            return null;
        }

        if(result is "Infinity")
        {
            return TimeUnit.Infinity;
        }
        
        return tree.ValueType switch
        {
            StatePropertyValueType.BooleanExpression => result is bool b ? b : Convert.ToBoolean(result),
            StatePropertyValueType.IntegerExpression => result is long l ? l : Convert.ToInt64(result), // using long to cover both int and long
            StatePropertyValueType.StringExpression => result.ToString(),
            StatePropertyValueType.VoidExpression => null,
            _ => throw new ArgumentOutOfRangeException()
        };

    }
}

public class AssignAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {

        var key = tree.Left.VariableName;

        var value = Evaluate(tree.Right, stateJson, bag);

        if (tree.Left.IsPort.HasValue && tree.Left.IsPort.Value && bag.HasValue)
        {
            bag.Value.Inputs[key] = value;
            return value;
        }
        
        ReelHelper.UpdateState(stateJson, key, value);
        return value;
    }
}

