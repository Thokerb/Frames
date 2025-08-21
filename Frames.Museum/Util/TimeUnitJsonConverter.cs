using System.Text.Json;
using System.Text.Json.Serialization;
using Frames.Model.ValueTypes;

namespace Frames.Museum.Util;

public class TimeUnitJsonConverter : JsonConverter<TimeUnit>
{
    public override TimeUnit Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        // always take {.value property}
        
        var obj = reader.GetInt32();
        
        return new TimeUnit(
            obj,
            obj == int.MaxValue
        );
    }

    public override void Write(Utf8JsonWriter writer, TimeUnit value, JsonSerializerOptions options)
    {
        // Write the TimeUnit as a int 
        writer.WriteNumberValue(value.Value);
        
    }
    
    public override TimeUnit ReadAsPropertyName(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return Read(ref reader, typeToConvert, options);
    }

    public override void WriteAsPropertyName(Utf8JsonWriter writer, TimeUnit value, JsonSerializerOptions options)
    {
        writer.WritePropertyName(value.IsInfinity ? "Infinity" : value.Value.ToString());
    }
}