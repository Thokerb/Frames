using System.Collections;
using Frames.Model.ValueTypes;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public class LiteralAstElement : BaseAstElement
{
    protected override object? EvaluateImpl(ExpressionTreeJson tree, StateJson stateJson,TimeUnit currentTime, Bag? bag)
    {
        if(tree.ValueType == PortValueType.IntegerExpression && tree.Value is "CurrentTime")
        {
            return currentTime;
        }
        
        
        object? result = null;
        bool resultSet = false;
        if (tree.VariableName is not null)
        {
            resultSet = true;
            if (tree.IsPort.HasValue && tree.IsPort.Value)
            {
                var variableFromBag = bag?.Inputs.GetValueOrDefault(tree.VariableName);
                
                result = variableFromBag;

                if (result is null && tree.PortAccessor is PortAccessor.Any)
                {
                    result = false;
                }
                
                if (result is IList resultList )
                {
                    if(tree is { PortAccessor: PortAccessor.Index, PortAccessorIndex: null })
                    {
                        throw new InvalidOperationException("PortAccessorIndex must be set when PortAccessor is Index");
                    }
                        
                    result = tree.PortAccessor switch
                    {
                        PortAccessor.First => resultList[0],
                        PortAccessor.All => resultList,
                        PortAccessor.Any => resultList.Count > 0,
                        PortAccessor.Index => resultList[tree.PortAccessorIndex.Value],
                        null => resultList[0],
                        _ => throw new ArgumentOutOfRangeException()
                    };
                }
                
                if (!string.IsNullOrWhiteSpace(tree.PortObjectPropertyName))
                {
                    if (tree.PortAccessor is PortAccessor.All)
                    {
                        if (result is List<object> kvResultList)
                        {
                            result = ListObjectToListList(kvResultList).Select(kv => kv.First(kv => kv.Key == tree.PortObjectPropertyName).Value).ToList();

                        }
                        else
                        {
                            throw new InvalidOperationException("Result must be a list of objects when PortAccessor is All and PortObjectPropertyName is set");
                        }
                        
                    }
                    else
                    {
                        result = ObjectToList(result).FirstOrDefault(kv => kv.Key == tree.PortObjectPropertyName).Value;
                    }
                    
                }
                else
                {
                    if (tree.PortAccessor is PortAccessor.All)
                    {
                        
                            if (result is List<object> kvResultList)
                            {
                                var toList = ListObjectToListList(kvResultList);
                                if(toList.Any(x => x.Count != 1))
                                {
                                    throw new InvalidOperationException("Result objects must have exactly one property when PortAccessor is All and PortObjectPropertyName is not set");
                                }

                                result = ListObjectToListList(kvResultList).Select(kv => kv.First().Value).ToList();
                            }
                            else
                            {
                                throw new InvalidOperationException(
                                    "Result must be a list of objects when PortAccessor is All and PortObjectPropertyName is set");
                            }
                        
                    }
                }
            }
            else
            {
                var prop =  stateJson.Properties[tree.VariableName];
                
                if(prop.IsArray )
                {
                    if (prop.Value is null)
                    {
                        result = prop.Type switch
                        {
                            StatePropertyValueType.BooleanExpression => new List<bool>(),
                            StatePropertyValueType.IntegerExpression => new List<double>(),
                            StatePropertyValueType.StringExpression => new List<string>(),
                            StatePropertyValueType.VoidExpression => throw new NotSupportedException("Void type cannot be an array"),
                        };
                        return result;
                    }

                    return prop.Type switch
                    {
                        StatePropertyValueType.BooleanExpression => prop.Value as List<bool>,
                        StatePropertyValueType.IntegerExpression => prop.Value as List<double>,
                        StatePropertyValueType.StringExpression => prop.Value as List<string>,
                        StatePropertyValueType.VoidExpression => throw new NotSupportedException("Void type cannot be an array"),
                    };


                }
                result = prop.Value;
                
                
            }

        }
        if (tree.Value is not null)
        {
            resultSet = true;
            result = tree.Value;
        }

        if (!resultSet)
        {
            throw new InvalidOperationException("Literal must have either a Value or a VariableName");
        }
        
        if (result is null)
        {
            return null;
        }

        if(result is "Infinity")
        {
            return TimeUnit.Infinity;
        }

        if (result is TimeUnit)
        {
            return result;
        }

        if (tree.PortAccessor is PortAccessor.All)
        {
            if (result is List<object> resultList)
            {
                return tree.ValueType switch
                {
                    PortValueType.BooleanExpression => resultList.Select(x => x is bool b ? b : Convert.ToBoolean(x)).ToList(),
                    PortValueType.IntegerExpression => resultList.Select(x => Convert.ToDouble(x)).ToList(),
                    PortValueType.StringExpression =>  resultList.Select(x => x.ToString()).ToList(),
                    PortValueType.VoidExpression => null,
                    PortValueType.ObjectExpression => throw new InvalidOperationException("ObjectExpression type with PortAccessor All is not supported"),
                    _ => throw new ArgumentOutOfRangeException()
                };
            }
            throw new InvalidOperationException("result must be a list when PortAccessor is All");
        }
        
        return tree.ValueType switch
        {
            PortValueType.BooleanExpression => result is bool b ? b : Convert.ToBoolean(result),
            PortValueType.IntegerExpression => Convert.ToDouble(result), // using double to cover both int and double
            PortValueType.StringExpression => result.ToString(),
            PortValueType.VoidExpression => null,
            PortValueType.ObjectExpression => result,
            _ => throw new ArgumentOutOfRangeException()
        };

    }

    private List<KeyValuePair<string, object>> ObjectToList(object result)
    {
        return result as List<KeyValuePair<string, object>>;
    }
    private List<List<KeyValuePair<string, object>>> ListObjectToListList(List<object> result)
    {
        return result.Select(x => x as List<KeyValuePair<string, object>>).ToList();
    }
}