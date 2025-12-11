using Newtonsoft.Json;

namespace Frames.DevStoneAdapter.Model;

public class RequestDataTypes
{
    public record DevstoneRequest(
        [JsonProperty]
        DevstoneModelType ModelType,
        [JsonProperty]
        int Depth,
        [JsonProperty]
        int Width,
        [JsonProperty]
        int IntCycles,
        [JsonProperty]
        int ExtCycles,
        [JsonProperty]
        bool AddAtomicOutPorts,
        [JsonProperty]
        int PrepTime
    );

    public enum DevstoneModelType
    {
        LI,
        HI,
        HO,
        HOmod
    }
}