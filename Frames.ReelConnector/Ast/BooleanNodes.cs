using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public class BooleanNodes
{
    public class AndAstElement : BaseAstElement
    {
        protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
        {
            var left = Evaluate(tree.Left, stateJson, bag);
            var right = Evaluate(tree.Right, stateJson, bag);

            if (left is not bool || right is not bool)
            {
                throw new InvalidOperationException("AND operation requires boolean operands.");
            }
            return (bool)left && (bool)right;
        }
    }

    public class OrAstElement : BaseAstElement
    {
        protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
        {
            var left = Evaluate(tree.Left, stateJson, bag);
            var right = Evaluate(tree.Right, stateJson, bag);

            if (left is not bool || right is not bool)
            {
                throw new InvalidOperationException("AND operation requires boolean operands.");
            }
            return (bool)left || (bool)right;
        }
    }

    public class NotAstElement : BaseAstElement
    {
        protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
        {
            var left = Evaluate(tree.Left, stateJson, bag);

            if (left is not bool)
            {
                throw new InvalidOperationException("AND operation requires boolean operands.");
            }
            return !(bool)left;
        }
    }

}