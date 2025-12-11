using Frames.Model;
using Frames.Tests.BlinkingLight;

namespace Frames.Tests.Counter;

public class CCounter : CoupledModel
{
    public CCounter() : base("CCounter")
    {

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