using System.Text.Json;
using System.Text.Json.Serialization;
using Frames.ReelConnector.ReelDto;

namespace Frames.Museum.Util;

public class ReelJsonConverter : JsonConverter<ReelJson>
{
    public override ReelJson? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        // Use Newtonsoft.Json for deserialization
        var json = JsonDocument.ParseValue(ref reader).RootElement.GetRawText();
        return Newtonsoft.Json.JsonConvert.DeserializeObject<ReelJson>(json);
    }

    public override void Write(Utf8JsonWriter writer, ReelJson value, JsonSerializerOptions options)
    {
        // Use Newtonsoft.Json for serialization
        var json = Newtonsoft.Json.JsonConvert.SerializeObject(value);
        writer.WriteRawValue(json);
    }
}