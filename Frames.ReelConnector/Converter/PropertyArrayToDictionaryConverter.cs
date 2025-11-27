using Frames.ReelConnector.ReelDto;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Frames.ReelConnector.Converter;

public class PropertyArrayToDictionaryConverter : JsonConverter
{
    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(Dictionary<string, StatePropertyJson>);
    }

    // Handles Reading (JSON -> C#)
    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        // Load the JSON data
        var token = JToken.Load(reader);

        if (token.Type == JTokenType.Array)
        {
            var dict = new Dictionary<string, StatePropertyJson>();

            // Iterate over every item in the array
            foreach (var item in token)
            {
                // Deserialize the item into your object class
                var stateProp = item.ToObject<StatePropertyJson>();
                
                // Use the 'Name' property as the Dictionary Key
                if (!string.IsNullOrEmpty(stateProp.Name))
                {
                    dict[stateProp.Name] = stateProp;
                }
            }
            return dict;
        }

        // Fallback if the JSON is actually already an object/dictionary
        if (token.Type == JTokenType.Object)
        {
            return token.ToObject<Dictionary<string, StatePropertyJson>>();
        }

        throw new JsonSerializationException("Expected JSON Array for properties.");
    }

    // Handles Writing (C# -> JSON) - Optional, keeps format consistent
    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        var dict = (Dictionary<string, StatePropertyJson>)value;
        // Write the dictionary values out as an array
        serializer.Serialize(writer, dict.Values);
    }
}