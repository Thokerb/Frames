using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;


public class ConditionalAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var left = Evaluate(tree.Left, stateJson,currentTime, bag);

        if (left is not bool b)
        {
            throw new InvalidOperationException($"Left operand of conditional must be boolean, got {left?.GetType().Name ?? "null"}");
        }

        if (b)
        {
            return Evaluate(tree.Right.Left, stateJson,currentTime, bag);
        }
        return Evaluate(tree.Right.Right, stateJson,currentTime, bag);
    }
}
