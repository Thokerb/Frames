using System.Collections;
using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public class ArrayGetAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson,currentTime, bag);
        var indexVal = Evaluate(tree.Right, stateJson,currentTime, bag);
        
        int idx = indexVal switch
        {
            double d => (d % 1) == 0 ? (int)d : throw new InvalidOperationException("ArrayGet requires the right operand to be an integer index."),
            int i => i,
            _ => throw new InvalidOperationException("ArrayGet requires the right operand to be an integer index.")
        };

        object elem = arrVal switch
        {
            List<string> strList => strList[idx],
            List<double> doubleList => doubleList[idx],
            List<bool> boolList => boolList[idx],
            _ => throw new InvalidOperationException("ArrayGet requires the left operand to be a List<object>.")
        };
        
        return elem;
    }
}

public class ArrayAppendAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson,currentTime, bag);
        var value = Evaluate(tree.Right, stateJson,currentTime, bag);


        // pattern match arr val List<string> or List<double> or List<bool>

        IList updated;
        if (value is IList list)
        {
            updated = arrVal switch
            {
                List<string> strList =>
                    value is List<string> strValue
                        ? (strList.Concat(strValue).ToList()) // Use Concat and ToList to return a new list/object
                        : throw new InvalidOperationException("ArrayAppend requires a string list and a string value but received " + (value?.GetType().Name ?? "null") + "."),

                List<double> doubleList =>
                    value is List<double> doubleValue
                        ? (doubleList.Concat(doubleValue).ToList())
                        : throw new InvalidOperationException("ArrayAppend requires a double list and a double value but received " + (value?.GetType().Name ?? "null") + "."),
                List<bool> boolList =>
                    value is List<bool> boolValue
                        ? (boolList.Concat(boolValue).ToList())
                        : throw new InvalidOperationException("ArrayAppend requires a boolean list and a boolean value but received " + (value?.GetType().Name ?? "null") + "."),

                _ => throw new InvalidOperationException($"ArrayAppend requires a supported list type, but received {arrVal?.GetType().Name ?? "null"}."),
            };
        }
        else
        {
            if (value is TimeUnit tu2)
            {
                value = Convert.ToDouble(tu2.Value);
            }
            updated = arrVal switch
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
        }
        
        
        
        stateJson.Properties[tree.Left.VariableName] = stateJson.Properties[tree.Left.VariableName] with { Value = updated };
        return updated;
        
    }
}

public class ArrayPrependAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson,currentTime, bag);
        var value = Evaluate(tree.Right, stateJson,currentTime, bag);

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
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson,currentTime, bag);

        if (arrVal is not IList arr)
            throw new InvalidOperationException("ArrayLength requires the operand to be a List<object>.");

        return (double)arr.Count;
    }
}

public class ArrayRemoveAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        var arrVal = Evaluate(tree.Left, stateJson,currentTime, bag);
        var value = Evaluate(tree.Right, stateJson,currentTime, bag);

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
