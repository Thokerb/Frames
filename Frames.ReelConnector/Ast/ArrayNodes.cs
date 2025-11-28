using System.Collections;
using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public class ArrayGetAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
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
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson, bag);
        var value = Evaluate(tree.Right, stateJson, bag);


        // pattern match arr val List<string> or List<double> or List<bool>

        
        
        IList updated = arrVal switch
        {
            List<string> strList =>
                value is string strValue
                    ? (strList.Append(strValue).ToList()) // Use Append and ToList to return a new list/object
                    : throw new InvalidOperationException("ArrayAppend requires a string list and a string value but received " + (value?.GetType().Name ?? "null") + "."),

            List<double> doubleList =>
                value is double doubleValue
                    ? (doubleList.Append(doubleValue).ToList())
                    : throw new InvalidOperationException("ArrayAppend requires a double list and a double value but received " + (value?.GetType().Name ?? "null") + "."),

            List<bool> boolList =>
                value is bool boolValue
                    ? (boolList.Append(boolValue).ToList())
                    : throw new InvalidOperationException("ArrayAppend requires a boolean list and a boolean value but received " + (value?.GetType().Name ?? "null") + "."),

            _ => throw new InvalidOperationException($"ArrayAppend requires a supported list type, but received {arrVal?.GetType().Name ?? "null"}."),
        };
        
        stateJson.Properties[tree.Left.VariableName] = stateJson.Properties[tree.Left.VariableName] with { Value = updated };
        return updated;
        
    }
}

public class ArrayPrependAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson, bag);
        var value = Evaluate(tree.Right, stateJson, bag);

        if (arrVal is not IList arr)
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
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson, bag);

        if (arrVal is not IList arr)
            throw new InvalidOperationException("ArrayLength requires the operand to be a List<object>.");

        return (double)arr.Count;
    }
}

public class ArrayRemoveAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson, bag);
        var value = Evaluate(tree.Right, stateJson, bag);

        if (arrVal is not IList arr)
            throw new InvalidOperationException("ArrayRemove requires the left operand to be a List<object>.");

        
        var idx = value switch
        {
            double d => (d % 1) == 0 ? (int)d : throw new InvalidOperationException("ArrayRemove requires the right operand to be an integer index."),
            int i => i,
            _ => throw new InvalidOperationException("ArrayRemove requires the right operand to be an integer index.")
        };
        
        if (idx < 0 || idx >= arr.Count)
            throw new IndexOutOfRangeException($"ArrayRemove index {idx} is out of bounds for array length {arr.Count}.");

        
        
        arr.RemoveAt((int)idx);
        return arr;
    }
}
