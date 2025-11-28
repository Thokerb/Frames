using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

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