using Frames.Model;
using Frames.Model.ValueTypes;
using Newtonsoft.Json;

namespace Frames.DevStoneAdapter.Model;

public class DevstoneEnvironment : CoupledModel
{
    
    [JsonProperty]
    private RequestDataTypes.DevstoneRequest _request;
    
    public DevstoneEnvironment(string name, RequestDataTypes.DevstoneRequest request) : base(name)
    {
        _request = request;
    }

    protected override void Initialize()
    {
        AddModel<Generator, GeneratorState>("generator",new GeneratorState()
        {
            State = "active",
            NumOutputs = 1,
            Period = TimeUnit.Zero
        });
        CoupledModel model;

        switch (_request.ModelType)
        {
            case RequestDataTypes.DevstoneModelType.LI:
                model = new Coupled_LI($"Coupled_{_request.Depth}", _request.Depth, _request.Width, _request.IntCycles,
                    _request.ExtCycles, _request.AddAtomicOutPorts, _request.PrepTime);
                break;
            case RequestDataTypes.DevstoneModelType.HI:
            {
                model = new Coupled_HI($"Coupled_{_request.Depth}", _request.Depth, _request.Width, _request.IntCycles,
                    _request.ExtCycles, _request.AddAtomicOutPorts, _request.PrepTime);
                break;
            }
            case RequestDataTypes.DevstoneModelType.HO:
            {
                model = new Coupled_HO($"Coupled_{_request.Depth}", _request.Depth, _request.Width, _request.IntCycles,
                    _request.ExtCycles, _request.AddAtomicOutPorts, _request.PrepTime);
                break;
            }
            case RequestDataTypes.DevstoneModelType.HOmod:
            {
                model = new Coupled_HOmod($"Coupled_{_request.Depth}",_request.Depth, _request.Width, _request.IntCycles,
                    _request.ExtCycles, _request.AddAtomicOutPorts, _request.PrepTime);
                
                break;
            }
            default:
            {
               throw new ArgumentOutOfRangeException();
            }
        }
        AddModel(model);
        
        AddCoupling("generator", PortConstants.OutPort, model.Name, PortConstants.InPort);
        AddCoupling("generator", PortConstants.OutPort2, model.Name, PortConstants.InPort2);

    }
}