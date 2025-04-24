using Frames.Model;
using Frames.Tests.BlinkingLight;

namespace Frames.Tests.Counter;

public class CCounterWithStopCondition : CoupledModel
{
    public CCounterWithStopCondition() : base("CCounterWithStopCondition")
    {
        AddModel<CounterAtomicModel, CounterState>("counter", new CounterState()
        {
            Count = 0
        }, StopCondition);

        bool StopCondition(CounterState state, Bag currentBag)
        {
            return state.Count >= 10;
        }

        AddModel<BlinkingLightAtomicModel>("blinkingLight");

        AddCoupling("blinkingLight", BlinkingLightAtomicModel.OutPort, "counter", CounterAtomicModel.InPort);
    }
}