using Frames.Model;

namespace Frames.Museum.Benchmark.Model;

public class CoupledBenchmarkModel : CoupledModel
{
    public CoupledBenchmarkModel(string name, int numberInactiveNodes, int numberActiveNodes, bool isRoot = false) : base(name)
    {
        if (isRoot)
        {
            for (int i = 0; i < numberActiveNodes; i += 2)
            {
                AddModel(new CoupledBenchmarkModel($"ca_{i}", 0, 2));
            }

            for (int i = 0; i < numberInactiveNodes; i += 2)
            {
                AddModel(new CoupledBenchmarkModel($"ci_{i}", 2, 0));
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