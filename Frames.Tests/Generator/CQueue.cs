using Frames.Model;

namespace Frames.Tests.Generator;

public class CQueue : CoupledModel
{

    public CQueue() : base("CQueue")
    {

    }

    protected override void Initialize()
    {
        AddModel<Generator>("generator");
        AddModel<Queue>("queue");
        
        AddCoupling("generator", Generator.OutputPort, "queue", Queue.InPort);    }
}