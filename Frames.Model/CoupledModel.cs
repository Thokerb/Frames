using Frames.Model.ValueTypes;
using Newtonsoft.Json;

namespace Frames.Model;

public abstract class CoupledModel : ICoupledModel
{
    public CoupledModel(string name)
    {
        this.Name = name;
    }

    [JsonProperty]
    public string Name { get; set; }
    
    [JsonProperty]
    public bool HasStopCondition { get; set; } = false;
    
    [JsonIgnore]
    private Dictionary<string, IModel> Children { get; } = new();

    [JsonIgnore]
    private List<(Port inPort, Port outPort, string inModel, string outModel)> Pipes { get; } = new();
    
    // TODO: this seems inconsistent, we dont care about models and only about ports here but in Pipes we care about models.
    [JsonIgnore]
    private List<(Port inPort, Port outPort)> OutsidePorts { get; } = new();

    public T AddModel<T>(string id) where T : IModel
    {
        T model = Activator.CreateInstance<T>();
        string prefix = (model is IAtomicModelBase) ? "simulator-" : "coordinator-";
        model.Name = id;
        Children.Add(prefix + id, model);
        return model;
    }

    public T AddModel<T>(T model) where T : IModel
    {
        string prefix = (model is IAtomicModelBase) ? "simulator-" : "coordinator-";
        Children.Add(prefix + model.Name, model);
        return model;
    }

    public T AddModel<T, TState>(string id, TState state)
        where T : IAtomicModel<TState>
        where TState : IState
    {
        var model = Activator.CreateInstance<T>();
        model.State = state;
        model.Name = id;
        string prefix = (model is IAtomicModelBase) ? "simulator-" : "coordinator-";
        Children.Add(prefix + id, model);
        return model;
    }

    public void RemoveModel(string id)
    {
        if (Children.ContainsKey(id))
        {
            Children.Remove(id);
        }
    }

    public List<(string, IModel)> GetChildren()
    {
        return Children.Select(x => (x.Key, x.Value)).ToList();
    }

    [JsonProperty]
    private List<Port> InPorts { get; } = new();
    
    [JsonProperty]
    private List<Port> OutPorts { get; } = new();

    public void AddInPort(Port port)
    {
        if (InPorts.Any(x => x.Equals(port)))
        {
            throw new ArgumentException($"Port {port} already exists in model {Name}.");
        }

        InPorts.Add(port);
    }

    public void AddOutPort(Port port)
    {
        if (OutPorts.Any(x => x.Equals(port)))
        {
            throw new ArgumentException($"Port {port} already exists in model {Name}.");
        }

        OutPorts.Add(port);
    }

    /// <summary>
    /// It is required that the models are already added to the CoupledModel.
    /// Therefore call AddModel before calling this method.
    /// </summary>
    /// <param name="sourceId"></param>
    /// <param name="sourcePort"></param>
    /// <param name="targetId"></param>
    /// <param name="targetPort"></param>
    /// <exception cref="ArgumentException"></exception>
    public void AddCoupling(string sourceId, Port sourcePort, string targetId, Port targetPort)
    {
        string internalSourceId = sourceId;
        string internalTargetId = targetId;

        if (Name != sourceId)
        {
            // Internally all models are prefixed with "simulator-" or "coordinator-"
            if (!(internalSourceId.StartsWith("simulator-") || internalSourceId.StartsWith("coordinator-")))
            {
                internalSourceId = Children.ContainsKey("simulator-" + sourceId)
                    ? "simulator-" + sourceId
                    : "coordinator-" + sourceId;
            }
        }

        if (!internalTargetId.StartsWith("simulator-") && !internalTargetId.StartsWith("coordinator-"))
        {
            // Internally all models are prefixed with "simulator-" or "coordinator-"}
            internalTargetId = Children.ContainsKey("simulator-" + targetId)
                ? "simulator-" + targetId
                : "coordinator-" + targetId;
        }

        if (!Children.ContainsKey(internalSourceId) && Name != internalSourceId)
        {
            throw new ArgumentException($"Source model with id {sourceId} does not exist.");
        }

        if (!Children.ContainsKey(internalTargetId))
        {
            throw new ArgumentException($"Target model with id {targetId} does not exist.");
        }

        Pipes.Add((sourcePort, targetPort, internalSourceId, internalTargetId));
    }

    public List<(Port inPort, Port outPort, string inModel, string outModel)> GetCouplings()
    {
        return Pipes;
    }

    public bool HasCoupling(string entryKey, Port inPort)
    {
        return Pipes.Any(x => x.inPort.Equals(inPort) && x.inModel.Equals(entryKey));
    }

    public List<string> GetInfluencer(string inputModel)
    {
        var receivers = Pipes
            .Where(x => x.outModel.Equals(inputModel))
            .Select(x => x.inModel)
            .ToList();

        return receivers;
    }

    public bool ChildrenAreCoupled(string source, Port entryKey, string target)
    {
        return Pipes
            .Any(x => x.inModel.Equals(source) && x.outModel.Equals(target) && x.inPort.Equals(entryKey));
    }

    public Port GetCouplingOutPort(string source, Port sourcePort, string target)
    {
        var coupling = Pipes
            .FirstOrDefault(x => x.inModel.Equals(source) && x.outModel.Equals(target) && x.inPort.Equals(sourcePort));

        if (coupling == default)
        {
            throw new ArgumentException($"No coupling found for source {source} and target {target}");
        }

        return coupling.outPort;
    }

    public List<(string model, Port port)> GetReceivers(string sourceModel, Port sourcePort)
    {
        var receivers = Pipes
            .Where(x => x.inPort.Equals(sourcePort) && x.inModel.Equals(sourceModel))
            .Select(x => (x.outModel, x.outPort))
            .ToList();

        return receivers;
    }

    public void AddCouplingOut(string source, Port sourcePort, Port targetPort)
    {
        // TODO: change pipes to allow outport without model
        // TODO: evaluate if outModel is needed
        OutsidePorts.Add((sourcePort, targetPort));
    }


    public void AddCouplingFromOutIn(Port sourcePort, string targetModel, Port targetPort)
    {
        // TODO: dont use default
        targetModel = Children.ContainsKey("simulator-" + targetModel)
            ? targetModel = "simulator-" + targetModel
            : targetModel = "coordinator-" + targetModel;


        // TODO: is inModel relevant
        Pipes.Add((sourcePort, targetPort, "NONE", targetModel));
    }

    public bool HasCouplingOut(Port inPort, out Port? outPort)
    {
        var coupling = OutsidePorts
            .FirstOrDefault(x => x.inPort.Equals(inPort));

        if (coupling == default)
        {
            outPort = null;
            return false;
        }

        outPort = coupling.outPort;
        return true;
    }
}