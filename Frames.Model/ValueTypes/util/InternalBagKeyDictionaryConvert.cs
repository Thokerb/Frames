using Newtonsoft.Json;

namespace Frames.Model.ValueTypes.util;

public class InternalBagKeyDictionaryConvert : JsonConverter<Dictionary<InternalBagKey, List<object?>>>
{
    public override void WriteJson(JsonWriter writer, Dictionary<InternalBagKey, List<object?>>? value, JsonSerializer serializer)
    {
        // serialize as list

        if (value == null)
        {
            return;
        }
        
        var list = new List<(InternalBagKey, List<object?>)>();
        
        foreach (var entry in value)
        {
            list.Add((entry.Key, entry.Value));
        }
        serializer.Serialize(writer, list);
    }

    public override Dictionary<InternalBagKey, List<object?>>? ReadJson(JsonReader reader, Type objectType, Dictionary<InternalBagKey, List<object?>>? existingValue, bool hasExistingValue,
        JsonSerializer serializer)
    {
        // deserialize from list
        var list = serializer.Deserialize<List<(InternalBagKey, List<object?>)>>(reader);
        if (list == null)
        {
            return null;
        }
        
        var dict = new Dictionary<InternalBagKey, List<object?>>();
        foreach (var (key, value) in list)
        {
            dict[key] = value;
        }
        return dict;
    }
}