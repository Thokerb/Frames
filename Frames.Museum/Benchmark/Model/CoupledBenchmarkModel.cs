using Frames.Model;

namespace Frames.Museum.Benchmark.Model;

public class CoupledBenchmarkModel : CoupledModel
{
    public static readonly int StepSize = 20;
    public CoupledBenchmarkModel(string name, int numberInactiveNodes, int numberActiveNodes, bool isRoot = false) : base(name)
    {
        if (isRoot)
        {
            int i = 0;
            while (i < numberActiveNodes)
            {
                var nodeNumber = Math.Min(StepSize, numberActiveNodes - i);
                
                AddModel(new CoupledBenchmarkModel($"ca_{i}", 0, nodeNumber));
                i += StepSize;
            }
            
            i = 0;
            while (i < numberInactiveNodes)
            {
                var nodeNumber = Math.Min(StepSize, numberInactiveNodes - i);
                
                AddModel(new CoupledBenchmarkModel($"ci_{i}", nodeNumber, 0));
                i += StepSize;
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