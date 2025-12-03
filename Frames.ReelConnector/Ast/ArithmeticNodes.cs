using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public class AdditionAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson,currentTime, bag);
        var right = Evaluate(tree.Right, stateJson,currentTime, bag);
        if (left is TimeUnit tu)
        {
            left = Convert.ToDouble(tu.Value);
        }

        if (right is TimeUnit tu2)
        {
            right = Convert.ToDouble(tu2.Value);
        }
        return left switch
        {
            double l when right is double r => l + r,
            int l when right is int r => l + r,
            double l when right is double r => l + r,
            string l when right is string r => l + r,
            _ => throw new InvalidOperationException("Incompatible types for addition")
        };
    }
}

public class SubtractAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson,currentTime, bag);
        var right = Evaluate(tree.Right, stateJson,currentTime, bag);

        if (left is TimeUnit tu)
        {
            left = Convert.ToDouble(tu.Value);
        }

        if (right is TimeUnit tu2)
        {
            right = Convert.ToDouble(tu2.Value);
        }
        
        return left switch
        {
            double l when right is double r => l - r,
            int l when right is int r => l - r,
            double l when right is double r => l - r,
            TimeUnit t when right is TimeUnit u => t - u,
            _ => throw new InvalidOperationException("Incompatible types for subtraction")
        };
    }
}

public class MultiplyAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson,currentTime, bag);
        var right = Evaluate(tree.Right, stateJson,currentTime, bag);
        if (left is TimeUnit tu)
        {
            left = Convert.ToDouble(tu.Value);
        }

        if (right is TimeUnit tu2)
        {
            right = Convert.ToDouble(tu2.Value);
        }
        return left switch
        {
            double l when right is double r => l * r,
            int l when right is int r => l * r,
            double l when right is double r => l * r,
            _ => throw new InvalidOperationException("Incompatible types for multiplication")
        };
    }
}

public class DivideAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson,currentTime, bag);
        var right = Evaluate(tree.Right, stateJson,currentTime, bag);
        if (left is TimeUnit tu)
        {
            left = Convert.ToDouble(tu.Value);
        }

        if (right is TimeUnit tu2)
        {
            right = Convert.ToDouble(tu2.Value);
        }
        return left switch
        {
            double l when right is double r => l / r,
            int l when right is int r => l / r,
            double l when right is double r => l / r,
            _ => throw new InvalidOperationException("Incompatible types for multiplication")
        };
    }
}

public class ModuloAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var l = Convert.ToInt32(Evaluate(tree.Left, stateJson,currentTime, bag));
        var r = Convert.ToInt32(Evaluate(tree.Right, stateJson,currentTime, bag));
        return l % r;
    }
}
