using Frames.ReelConnector.ReelDto;
using Newtonsoft.Json;

namespace Frames.ReelConnector.Converter;

public class OperatorConverter : JsonConverter<Operator>
{
    // 1. Source of Truth: Define the mapping with Token as the Key.
    // This allows multiple string tokens to map to the same Operator enum (N-to-1).
    // The FIRST token defined for an operator will be used as the default for Serialization (Writing).
    private static readonly Dictionary<string, Operator> _tokenToOperator = new(StringComparer.OrdinalIgnoreCase)
    {
        // Equality
        { "==", Operator.Equal },
        { "eq", Operator.Equal },      // Alias example
        { "equal", Operator.Equal },   // Alias example

        { "!=", Operator.NotEqual },
        { "neq", Operator.NotEqual },  // Alias example
        { "<>", Operator.NotEqual },   // Alias example

        // Comparison
        { "<", Operator.LessThan },
        { "lt", Operator.LessThan },
        
        { "<=", Operator.LessThanOrEqual },
        { "lte", Operator.LessThanOrEqual },

        { ">", Operator.GreaterThan },
        { "gt", Operator.GreaterThan },

        { ">=", Operator.GreaterThanOrEqual },
        { "gte", Operator.GreaterThanOrEqual },

        // Arithmetic
        { "+", Operator.Add },
        { "add", Operator.Add },

        { "-", Operator.Subtract },
        { "sub", Operator.Subtract },

        { "*", Operator.Multiply },
        { "mul", Operator.Multiply },

        { "/", Operator.Divide },
        { "div", Operator.Divide },

        { "%", Operator.Modulo },
        { "mod", Operator.Modulo },

        // Logical
        { "and", Operator.And },
        { "&&", Operator.And },        // Alias example

        { "or", Operator.Or },
        { "||", Operator.Or },         // Alias example

        { "!", Operator.Not },
        { "not", Operator.Not },

        { "=", Operator.Assign },
        { "assign", Operator.Assign },
        
        { "?", Operator.Conditional },
        { ":", Operator.ConditionalOptions }
    };

    static OperatorConverter()
    {

    }

    public override void WriteJson(JsonWriter writer, Operator value, JsonSerializer serializer)
    {
        
        var _operatorToCanonicalToken = new Dictionary<Operator, string>();

        // Iterate through the definitions. Since we want a single string for writing,
        // we take the first token encountered for each Operator.
        foreach (var kvp in _tokenToOperator)
        {
            if (!_operatorToCanonicalToken.ContainsKey(kvp.Value))
            {
                _operatorToCanonicalToken[kvp.Value] = kvp.Key;
            }
        }
        
        // Try to find the canonical token (e.g., "==") for the enum.
        if (_operatorToCanonicalToken.TryGetValue(value, out var token))
        {
            writer.WriteValue(token);
        }
        else
        {
            // Fallback to standard string representation if no special token exists
            writer.WriteValue(value.ToString());
        }
    }

    public override Operator ReadJson(JsonReader reader, Type objectType, Operator existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        if (reader.TokenType == JsonToken.String)
        {
            var text = reader.Value?.ToString();

            if (string.IsNullOrEmpty(text))
                return default;

            // 1. Try to match any of the defined tokens (O(1) lookup)
            if (_tokenToOperator.TryGetValue(text, out var op))
            {
                return op;
            }

            // 2. Fallback: Try to match standard Enum names (Literal, ArrayGet)
            if (Enum.TryParse(text, true, out Operator result))
            {
                return result;
            }
        }
        
        // Handle integer values in JSON if necessary
        if (reader.TokenType == JsonToken.Integer)
        {
            return (Operator)Convert.ToInt32(reader.Value);
        }

        throw new JsonSerializationException($"Cannot convert value '{reader.Value}' to Operator enum.");
    }
}