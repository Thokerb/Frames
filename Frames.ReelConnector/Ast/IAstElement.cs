using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public interface IAstElement
{
    object? Evaluate(ExpressionTreeJson? tree, StateJson stateJson, Bag? bag);    
}


public static class ExpressionTreeJsonExtension
{
    public static T Evaluate<T>(this ExpressionTreeJson tree, StateJson stateJson, Bag? bag = null)
    {
        var element = AstBuilder.Build(tree);
        var result = element.Evaluate(tree, stateJson, bag);
        return result is T ? (T)result : throw new InvalidCastException($"Cannot cast result to type {typeof(T).Name}");

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

    protected abstract object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag);
}

public class LiteralAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        if (tree.VariableName is not null)
        {
            if (tree.IsPort.HasValue && tree.IsPort.Value)
            {
                var variableFromBag = bag?.Inputs.GetValueOrDefault(tree.VariableName);
                if(variableFromBag is not null && (string)variableFromBag == "Infinity")
                {
                    return TimeUnit.Infinity;
                }
                return variableFromBag;
            }
            
            var variable =  stateJson.Properties[tree.VariableName].Value;
            if((string)variable == "Infinity")
            {
                return TimeUnit.Infinity;
            }
        }
        if (tree.Value is not null)
        {
            if((string)tree.Value == "Infinity")
            {
                return TimeUnit.Infinity;
            }
            
            return tree.Value;
        }
        throw new InvalidOperationException("Leaf node must have either VariableName or Value.");
    }
}

public class AssignAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        if (tree.VariableName == null)
            throw new InvalidOperationException("Assign must have a VariableName");

        var value = Evaluate(tree.Right, stateJson, bag);

        if (tree.IsPort.HasValue && tree.IsPort.Value && bag.HasValue)
        {
            bag.Value.Inputs[tree.VariableName] = value;
            return value;
        }
        
        ReelHelper.UpdateState(stateJson, tree.VariableName, value);
        return value;
    }
}

