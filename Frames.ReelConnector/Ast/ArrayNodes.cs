using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public class ArrayGetAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson, bag);
        var indexVal = Evaluate(tree.Right, stateJson, bag);

        if (arrVal is not List<object> arr)
            throw new InvalidOperationException("ArrayGet requires the left operand to be a List<object>.");

        if (indexVal is not int idx)
            throw new InvalidOperationException("ArrayGet requires the right operand to be an integer index.");

        if (idx < 0 || idx >= arr.Count)
            throw new IndexOutOfRangeException($"ArrayGet index {idx} is out of bounds for array length {arr.Count}.");

        return arr[idx];
    }
}

public class ArrayAppendAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson, bag);
        var value = Evaluate(tree.Right, stateJson, bag);

        if (arrVal is not List<object> arr)
        {
            throw new InvalidOperationException("ArrayAppend requires the left operand to be a List<object>.");

        }

        if (value is null)
        {
            throw new InvalidOperationException("ArrayAppend does not support appending null values.");
        }
        
        arr.Add(value);
        return arr;
    }
}

public class ArrayPrependAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson, bag);
        var value = Evaluate(tree.Right, stateJson, bag);

        if (arrVal is not List<object> arr)
            throw new InvalidOperationException("ArrayPrepend requires the left operand to be a List<object>.");

        if (value is null)
        {
            throw new InvalidOperationException("ArrayAppend does not support appending null values.");
        }
        arr.Insert(0, value);
        return arr;
    }
}

public class ArrayLengthAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson, bag);

        if (arrVal is not List<object> arr)
            throw new InvalidOperationException("ArrayLength requires the operand to be a List<object>.");

        return arr.Count;
    }
}

public class ArrayRemoveAstElement : BaseAstElement
{
    protected override object EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson, bag);
        var value = Evaluate(tree.Right, stateJson, bag);

        if (arrVal is not List<object> arr)
            throw new InvalidOperationException("ArrayRemove requires the left operand to be a List<object>.");

        if (value is not int idx)
        {
            throw new InvalidOperationException("ArrayAppend does not support appending null values.");
        }
        
        if (idx < 0 || idx >= arr.Count)
            throw new IndexOutOfRangeException($"ArrayRemove index {idx} is out of bounds for array length {arr.Count}.");

        
        
        arr.RemoveAt(idx);
        return arr;
    }
}
