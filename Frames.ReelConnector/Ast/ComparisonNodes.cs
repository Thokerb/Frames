using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public class EqualAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
        => Equals(Evaluate(tree.Left, stateJson, bag), Evaluate(tree.Right, stateJson, bag));
}

public class NotEqualAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
        => !Equals(Evaluate(tree.Left, stateJson, bag), Evaluate(tree.Right, stateJson, bag));
}

public class LessThanAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson, bag);
        var right = Evaluate(tree.Right, stateJson, bag);
        
        return left switch
        {
            long l when right is long r => l < r,
            int l when right is int r => l < r,
            double l when right is double r => l < r,
            _ => throw new InvalidOperationException("Incompatible types")
        };
    }
}

public class LessThanOrEqualAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson, bag);
        var right = Evaluate(tree.Right, stateJson, bag);
        
        return left switch
        {
            long l when right is long r => l <= r,
            int l when right is int r => l <= r,
            double l when right is double r => l <= r,
            _ => throw new InvalidOperationException("Incompatible types")
        };
    }
}

public class GreaterThanAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson, bag);
        var right = Evaluate(tree.Right, stateJson, bag);
        
        return left switch
        {
            long l when right is long r => l > r,
            int l when right is int r => l > r,
            double l when right is double r => l > r,
            _ => throw new InvalidOperationException("Incompatible types")
        };
    }
}

public class GreaterThanOrEqualAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson, bag);
        var right = Evaluate(tree.Right, stateJson, bag);
        
        return left switch
        {
            long l when right is long r => l >= r,
            int l when right is int r => l >= r,
            double l when right is double r => l >= r,
            _ => throw new InvalidOperationException("Incompatible types")
        };
    }
}
