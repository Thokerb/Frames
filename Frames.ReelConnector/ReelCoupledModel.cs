using Frames.Model;
using Frames.ReelConnector.ReelDto;

namespace Frames.ReelConnector;

public class ReelCoupledModel : CoupledModel
{
    private CoupledModelJson CoupledModelJson { get; }

    public ReelCoupledModel(ReelJson reelJson, string coupledModelRef, string? name) : base(name ?? coupledModelRef)
    {
        
        if (!reelJson.CoupledModels.Exists(m => m.Name == coupledModelRef))
        {
            var available = string.Join(", ",
                reelJson.CoupledModels.Select(m => m.Name));

            throw new KeyNotFoundException(
                $"Coupled model '{coupledModelRef}' was not found. " +
                $"Available models: {available}");
        }
        CoupledModelJson = reelJson.CoupledModels.First(x => x.Name == coupledModelRef);
        
        
        AddModels(reelJson);
        
        AddReelPorts();
        
        AddReelCoupling();
        
    }

    private void AddModels(ReelJson reelJson)
    {
        foreach (var modelRef in CoupledModelJson.Models)
        {
            if (modelRef.IsAtomicModel)
            {
                var jsonModel = reelJson.AtomicModels.First(x => x.Name == modelRef.ModelRef);
                var jsonState = reelJson.States.First(x => x.Name == jsonModel.StateRef);
                var model = new ReelAtomicModel(jsonModel, jsonState, modelRef.ModelOverrides, modelRef.InitialState)
                {
                    Name = modelRef.Name,
                };
                AddModel(model);
            }
            else
            {
                var model = new ReelCoupledModel(reelJson, modelRef.ModelRef, modelRef.Name);
                AddModel(model);
            }
        }
    }

    private void AddReelCoupling()
    {
        foreach (var coupling in CoupledModelJson.Couplings)
        {
            if (coupling.SourceModel == "this")
            {
                AddCouplingFromOutIn(coupling.SourcePort, coupling.TargetModel, coupling.TargetPort);
                continue;
            }

            if (coupling.TargetModel == "this")
            {
                AddCouplingOut(coupling.SourceModel, coupling.SourcePort, coupling.TargetPort);
                continue;
            }
            
            
            AddCoupling(coupling.SourceModel, coupling.SourcePort, coupling.TargetModel, coupling.TargetPort);
        }
    }

    private void AddReelPorts()
    {
        foreach (var port in CoupledModelJson.Ports)
        {
            if (port.Type == PortType.InPort)
            {
                AddInPort(port.Name);
            }
            else
            {
                AddOutPort(port.Name);
            }
        }
    }
}