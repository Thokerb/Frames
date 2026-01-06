using Frames.Model;
using Frames.Tests.BlinkingLight;
using Newtonsoft.Json;

namespace Frames.Tests.Counter;

public class CCounter : CoupledModel
{
    [JsonProperty]
    public string Description { get; }
    
    public CCounter(string description) : base("CCounter")
    {
        Description = description;
    }

    protected override void Initialize()
    {
        AddModel<CounterAtomicModel, CounterState>("counter", new CounterState()
        {
            Count = 0
        });
        AddModel<BlinkingLightAtomicModel>("blinkingLight");
        AddCoupling("blinkingLight", BlinkingLightAtomicModel.OutPort, "counter", CounterAtomicModel.InPort);    }
}