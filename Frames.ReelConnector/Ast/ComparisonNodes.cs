using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public class EqualAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
        => Equals(Evaluate(tree.Left, stateJson,currentTime, bag), Evaluate(tree.Right, stateJson,currentTime, bag));
}

public class NotEqualAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
        => !Equals(Evaluate(tree.Left, stateJson,currentTime, bag), Evaluate(tree.Right, stateJson,currentTime, bag));
}

public class LessThanAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson,currentTime, bag);
        var right = Evaluate(tree.Right, stateJson,currentTime, bag);
        
        return left switch
        {
            double l when right is double r => l < r,
            int l when right is int r => l < r,
            double l when right is double r => l < r,
            _ => throw new InvalidOperationException($"Incompatible types {left.GetType()} and {right.GetType()}")
        };
    }
}

public class LessThanOrEqualAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson,currentTime, bag);
        var right = Evaluate(tree.Right, stateJson,currentTime, bag);
        
        return left switch
        {
            double l when right is double r => l <= r,
            int l when right is int r => l <= r,
            double l when right is double r => l <= r,
            _ => throw new InvalidOperationException($"Incompatible types {left.GetType()} and {right.GetType()}")
        };
    }
}

public class GreaterThanAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson,currentTime, bag);
        var right = Evaluate(tree.Right, stateJson,currentTime, bag);
        
        return left switch
        {
            double l when right is double r => l > r,
            int l when right is int r => l > r,
            double l when right is double r => l > r,
            _ => throw new InvalidOperationException($"Incompatible types {left.GetType()} and {right.GetType()}")
        };
    }
}

public class GreaterThanOrEqualAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson,currentTime, bag);
        var right = Evaluate(tree.Right, stateJson,currentTime, bag);
        
        return left switch
        {
            double l when right is double r => l >= r,
            int l when right is int r => l >= r,
            double l when right is double r => l >= r,
            _ => throw new InvalidOperationException($"Incompatible types {left.GetType()} and {right.GetType()}")
        };
    }
}
