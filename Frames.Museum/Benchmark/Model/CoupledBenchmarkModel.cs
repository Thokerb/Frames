using Frames.Model;
using Newtonsoft.Json;

namespace Frames.Museum.Benchmark.Model;

public class CoupledBenchmarkModel : CoupledModel
{
    [JsonProperty]
    private int NumberInactiveNodes { get; }
    [JsonProperty]
    private int NumberActiveNodes { get; }
    [JsonProperty]
    private int CoupleGrouping { get; }
    [JsonProperty]
    private bool IsRoot { get; }

    public CoupledBenchmarkModel(string name, int numberInactiveNodes, int numberActiveNodes,int coupleGrouping = 0 , bool isRoot = false) : base(name)
    {
        Name = name;
        NumberInactiveNodes = numberInactiveNodes;
        NumberActiveNodes = numberActiveNodes;
        CoupleGrouping = coupleGrouping;
        IsRoot = isRoot;

    }

    protected override void Initialize()
    {
        var stepSize = CoupleGrouping;
        if (IsRoot)
        {
            int i = 0;
            while (i < NumberActiveNodes)
            {
                var nodeNumber = Math.Min(stepSize, NumberActiveNodes - i);
                
                AddModel(new CoupledBenchmarkModel($"ca_{i}", 0, nodeNumber));
                i += stepSize;
            }
            
            i = 0;
            while (i < NumberInactiveNodes)
            {
                var nodeNumber = Math.Min(stepSize, NumberInactiveNodes - i);
                
                AddModel(new CoupledBenchmarkModel($"ci_{i}", nodeNumber, 0));
                i += stepSize;
            }
            
            return;
        }
        
        
        for (int i = 0; i < NumberActiveNodes; i++)
        {
            AddModel<AtomicBenchmarkModel, AtomicBenchmarkModelState>($"{Name}_aa_{i}",
                new AtomicBenchmarkModelState()
                {
                    IsActive = true
                });
        }

        for (int i = 0; i < NumberInactiveNodes; i++)
        {
            AddModel<AtomicBenchmarkModel, AtomicBenchmarkModelState>($"{Name}_ai_{i}",
                new AtomicBenchmarkModelState()
                {
                    IsActive = false
                });
        }    }
}