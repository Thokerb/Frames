using Frames.Model;
using Frames.ReelConnector.ReelDto;
using Newtonsoft.Json;

namespace Frames.ReelConnector;

public class ReelCoupledModel : CoupledModel
{
    private CoupledModelJson CoupledModelJson { get; set; }

    // We store the complete ReelJson. This is not very memory efficient, but allows us to recreate nested models easily. Also we dont want to store children generally but dynamically create them from the ReelJson when needed.
    [JsonProperty]
    private ReelJson ReelJson { get; }

    [JsonProperty]
    private string CoupledModelRef { get; }

    public ReelCoupledModel(ReelJson reelJson, string coupledModelRef, string? name) : base(name ?? coupledModelRef)
    {

        ReelJson = reelJson;
        CoupledModelRef = coupledModelRef;
    }

    private ReelJson TrimReelJson(ReelJson reelJson)
    {
        throw new NotImplementedException();
    }

    private void AddModels(ReelJson reelJson)
    {
        foreach (var modelRef in CoupledModelJson.Models)
        {
            if (modelRef.IsAtomicModel)
            {
                var jsonModel = reelJson.AtomicModels.First(x => x.Name == modelRef.ModelRef).DeepClone();
                var jsonState = reelJson.States.First(x => x.Name == jsonModel.StateRef).DeepClone();
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

    protected override void Initialize()
    {
        if (!ReelJson.CoupledModels.Exists(m => m.Name == CoupledModelRef))
        {
            var available = string.Join(", ", ReelJson.CoupledModels.Select(m => m.Name));

            throw new KeyNotFoundException(
                $"Coupled model '{CoupledModelRef}' was not found. " +
                $"Available models: {available}");
        }
        CoupledModelJson = ReelJson.CoupledModels.First(x => x.Name == CoupledModelRef);
            
        
        AddModels(ReelJson);
        
        AddReelPorts();
        
        AddReelCoupling();
    }
}