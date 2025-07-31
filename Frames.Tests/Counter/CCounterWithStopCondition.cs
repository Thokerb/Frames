using Frames.Engine.Messages;
using Frames.Model;
using Frames.Tests.BlinkingLight;

namespace Frames.Tests.Counter;

public class CCounterWithStopCondition : CoupledModel
{
    public CCounterWithStopCondition() : base("CCounterWithStopCondition")
    {
        AddModel<CounterAtomicModelWithStopCondition, CounterState>("counter", new CounterState()
        {
            Count = 0
        });

        AddModel<BlinkingLightAtomicModel>("blinkingLight");

        AddCoupling("blinkingLight", BlinkingLightAtomicModel.OutPort, "counter", CounterAtomicModel.InPort);
    }
}

public class CounterAtomicModelWithStopCondition : CounterAtomicModel, IAtomicModel<CounterState>
{
    public override bool HasStopCondition { get; set; } = true;

    public override bool StopCondition(CounterState state, Bag bag)
    {
        return StopConditionImpl(state, bag);
    }

    bool StopConditionImpl(CounterState state, Bag currentBag)
    {
        return state.Count >= 10;
    }
}