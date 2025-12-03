using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public interface IAstElement
{
    object? Evaluate(ExpressionTreeJson? tree, StateJson stateJson,TimeUnit currentTime, Bag? bag);    
}


public static class ExpressionTreeJsonExtension
{
    public static T? Evaluate<T>(this ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTimeUnit, Bag? bag = null)
    {
        var element = AstBuilder.Build(tree);
        var result = element.Evaluate(tree, stateJson,currentTimeUnit, bag);

        if (typeof(T) == typeof(TimeUnit))
        {
            
            var converted = result switch
            {
                double d => (d % 1) == 0 ? (TimeUnit)(double)d : throw new InvalidCastException($"Cannot convert non-integer double {d} to TimeUnit"),
                int i => (TimeUnit)(double)i,
                TimeUnit tu => tu,
                _ => throw new InvalidCastException($"Cannot convert {result.GetType()} to TimeUnit")
            };
            return (T)(object)converted;
        }

        return (T?) result ;

    }    
    
    public static void Evaluate(this ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag = null)
    {
        var element = AstBuilder.Build(tree);
        element.Evaluate(tree, stateJson,currentTime, bag);
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
    public object? Evaluate(ExpressionTreeJson? tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        if (tree == null)
            return null;

        var element = AstBuilder.Build(tree);

        return element.EvaluateImpl(tree, stateJson,currentTime, bag);
    }

    protected abstract object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag);
}