using Frames.Model;

namespace Frames.Museum.Benchmark.Model;

public class CoupledBenchmarkModel : CoupledModel
{
    public CoupledBenchmarkModel(string name, int numberInactiveNodes, int numberActiveNodes,int coupleGrouping = 0 , bool isRoot = false) : base(name)
    {
        var stepSize = coupleGrouping;
        if (isRoot)
        {
            int i = 0;
            while (i < numberActiveNodes)
            {
                var nodeNumber = Math.Min(stepSize, numberActiveNodes - i);
                
                AddModel(new CoupledBenchmarkModel($"ca_{i}", 0, nodeNumber));
                i += stepSize;
            }
            
            i = 0;
            while (i < numberInactiveNodes)
            {
                var nodeNumber = Math.Min(stepSize, numberInactiveNodes - i);
                
                AddModel(new CoupledBenchmarkModel($"ci_{i}", nodeNumber, 0));
                i += stepSize;
            }
            
            return;
        }
        
        
        for (int i = 0; i < numberActiveNodes; i++)
        {
            AddModel<AtomicBenchmarkModel, AtomicBenchmarkModelState>($"{name}_aa_{i}",
                new AtomicBenchmarkModelState()
                {
                    IsActive = true
                });
        }

        for (int i = 0; i < numberInactiveNodes; i++)
        {
            AddModel<AtomicBenchmarkModel, AtomicBenchmarkModelState>($"{name}_ai_{i}",
                new AtomicBenchmarkModelState()
                {
                    IsActive = false
                });
        }
    }
}