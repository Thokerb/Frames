using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public class AdditionAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson, bag);
        var right = Evaluate(tree.Right, stateJson, bag);

        return left switch
        {
            long l when right is long r => l + r,
            int l when right is int r => l + r,
            double l when right is double r => l + r,
            string l when right is string r => l + r,
            _ => throw new InvalidOperationException("Incompatible types for addition")
        };
    }
}

public class SubtractAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson, bag);
        var right = Evaluate(tree.Right, stateJson, bag);

        return left switch
        {
            long l when right is long r => l - r,
            int l when right is int r => l - r,
            double l when right is double r => l - r,
            _ => throw new InvalidOperationException("Incompatible types for subtraction")
        };
    }
}

public class MultiplyAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson, bag);
        var right = Evaluate(tree.Right, stateJson, bag);

        return left switch
        {
            long l when right is long r => l * r,
            int l when right is int r => l * r,
            double l when right is double r => l * r,
            _ => throw new InvalidOperationException("Incompatible types for multiplication")
        };
    }
}

public class DivideAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson, bag);
        var right = Evaluate(tree.Right, stateJson, bag);

        return left switch
        {
            long l when right is long r => l / r,
            int l when right is int r => l / r,
            double l when right is double r => l / r,
            _ => throw new InvalidOperationException("Incompatible types for multiplication")
        };
    }
}

public class ModuloAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var l = Convert.ToInt64(Evaluate(tree.Left, stateJson, bag));
        var r = Convert.ToInt64(Evaluate(tree.Right, stateJson, bag));
        return l % r;
    }
}
