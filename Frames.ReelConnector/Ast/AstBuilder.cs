using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector.Ast;

public static class AstBuilder
{
    
    public static BaseAstElement Build(ExpressionTreeJson tree)
    {
        BaseAstElement element = tree.Operator switch
        {
            Operator.Literal => new LiteralAstElement(),
            Operator.ArrayGet => new ArrayGetAstElement(),
            Operator.ArrayAppend => new ArrayAppendAstElement(),
            Operator.ArrayPrepend => new ArrayPrependAstElement(),
            Operator.ArrayLength => new ArrayLengthAstElement(),
            Operator.ArrayRemove => new ArrayRemoveAstElement(),

            Operator.Equal => new EqualAstElement(),
            Operator.NotEqual => new NotEqualAstElement(),
            Operator.LessThan => new LessThanAstElement(),
            Operator.LessThanOrEqual => new LessThanOrEqualAstElement(),
            Operator.GreaterThan => new GreaterThanAstElement(),
            Operator.GreaterThanOrEqual => new GreaterThanOrEqualAstElement(),

            Operator.Add => new AdditionAstElement(),
            Operator.Subtract => new SubtractAstElement(),
            Operator.Multiply => new MultiplyAstElement(),
            Operator.Divide => new DivideAstElement(),
            Operator.Modulo => new ModuloAstElement(),

            Operator.And => new BooleanNodes.AndAstElement(),
            Operator.Or => new BooleanNodes.OrAstElement(),
            Operator.Not => new BooleanNodes.NotAstElement(),

            Operator.Assign => new AssignAstElement(),
            
            Operator.Conditional => new ConditionalAstElement(),

            null => throw new InvalidOperationException("Operator cannot be null"),
            _ => throw new ArgumentOutOfRangeException()
        };

        return element;
    }
    
}