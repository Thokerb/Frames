using System.Text.Json;
using System.Text.Json.Serialization;
using Frames.Model;

namespace Frames.Engine.Persistence;

public class IStateJsonConverter : JsonConverter<IState>
{
    private readonly Type _concreteType;

    public IStateJsonConverter(Type concreteType)
    {
        _concreteType = concreteType;
    }

    public override IState? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return (IState?)JsonSerializer.Deserialize(ref reader, _concreteType, options);
    }

    public override void Write(Utf8JsonWriter writer, IState value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, value, _concreteType, options);
    }
}
