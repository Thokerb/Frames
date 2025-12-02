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

            if (left is not bool leftBool)
            {
                throw new InvalidOperationException("AND operation requires boolean operands.");
            }

            if (!leftBool)
            {
                return false; // Short-circuit evaluation
            }


            var right = Evaluate(tree.Right, stateJson, bag);

            if (right is not bool rightBool)
            {
                throw new InvalidOperationException("AND operation requires boolean operands.");
            }

            return leftBool && rightBool;
        }
    }

    public class OrAstElement : BaseAstElement
    {
        protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
        {
            var left = Evaluate(tree.Left, stateJson, bag);
            
            if (left is not bool leftBool)
            {
                throw new InvalidOperationException("AND operation requires boolean operands.");
            }

            if (leftBool)
            {
                return true; // Short-circuit evaluation
            }
            
            var right = Evaluate(tree.Right, stateJson, bag);
            if (right is not bool rightBool)
            {
                throw new InvalidOperationException("AND operation requires boolean operands.");
            }
            return leftBool || rightBool;
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