using Frames.Model;
using Newtonsoft.Json;

namespace Frames.DevStoneAdapter.Model;

public class Coupled_HOmod : CoupledModel
{
    [JsonProperty]
    private int Depth { get; }
    [JsonProperty]
    private int Width { get; }
    [JsonProperty]
    private int IntDelay { get; }
    [JsonProperty]
    private int ExtDelay { get; }
    [JsonProperty]
    private bool AddAtomicOutPorts { get; }
    [JsonProperty]
    private int PrepTime { get; }

    public Coupled_HOmod(string name, int depth, int width, int intDelay, int extDelay, bool addAtomicOutPorts,
        int prepTime) : base(name)
    {
        Depth = depth;
        Width = width;
        IntDelay = intDelay;
        ExtDelay = extDelay;
        AddAtomicOutPorts = addAtomicOutPorts;
        PrepTime = prepTime;

    }

    protected override void Initialize()
    {

        if (Depth == 1)
        {
            var atomic = new DelayedAtomic(IntDelay, ExtDelay, true, PrepTime)
            {
                Name = "Atomic_0_0"
            };
            AddModel(atomic);
            AddCouplingFromOutIn(PortConstants.InPort, atomic.Name, PortConstants.InPort);
            AddCouplingOut(atomic.Name, PortConstants.OutPort, PortConstants.OutPort);
        }
        else
        {
            var coupled = new Coupled_HOmod($"Coupled_{Depth - 1}", Depth - 1, Width, IntDelay, ExtDelay, AddAtomicOutPorts,
                PrepTime);
            AddModel(coupled);
            AddCouplingFromOutIn(PortConstants.InPort, coupled.Name, PortConstants.InPort);
            AddCouplingOut(coupled.Name, PortConstants.OutPort, PortConstants.OutPort);

            if (Width > 2)
            {
                var atomics = new Dictionary<int, List<DelayedAtomic>>();
                // Generate atomic components
                for (int i = 0; i < Width; i++)
                {
                    //  min_row_idx = 0 if i < 2 else i - 1
                    var minRowIdx = i < 2 ? 0 : i - 1;
                    // for j in range(min_row_idx, width - 1):
                    for (int j = minRowIdx; j < Width - 1; j++)
                    {
                        var atomic = new DelayedAtomic(IntDelay, ExtDelay, AddAtomicOutPorts, PrepTime)
                        {
                            Name = $"Atomic_{Depth - 1}_{i}_{j}"
                        };
                        AddModel(atomic);
                        if (!atomics.ContainsKey(i))
                        {
                            atomics[i] = new List<DelayedAtomic>();
                        }

                        atomics[i].Add(atomic);
                    }
                }

                // Connect EIC
                foreach (var atomic in atomics[0])
                {
                    AddCouplingFromOutIn(PortConstants.InPort2, atomic.Name, PortConstants.InPort);
                }

                for (int i = 1; i < Width; i++)
                {
                    var atomicSet = atomics[i];
                    AddCouplingFromOutIn(PortConstants.InPort2, atomicSet[0].Name, PortConstants.InPort);
                }

                // Connect IC
                foreach (var atomic in atomics[0])
                {
                    AddCoupling(atomic.Name, PortConstants.OutPort, coupled.Name, PortConstants.InPort2);
                }

                for (int i = 0; i < atomics[1].Count; i++)
                {
                    for (int j = 0; j < atomics[0].Count; j++)
                    {
                        AddCoupling(atomics[1][i].Name, PortConstants.OutPort, atomics[0][j].Name,
                            PortConstants.InPort);
                    }
                }

                for (int i = 2; i < Width; i++)
                {
                    for (int j = 0; j < atomics[i].Count; j++)
                    {
                        AddCoupling(atomics[i][j].Name, PortConstants.OutPort, atomics[i - 1][j + 1].Name,
                            PortConstants.InPort);
                    }
                }
            }
        }    }
}