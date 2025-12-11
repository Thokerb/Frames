using System.Diagnostics;
using Frames.Model.ValueTypes;
using Newtonsoft.Json;

namespace Frames.Model;

public abstract class CoupledModel : ICoupledModel
{
    public CoupledModel(string name)
    {
        this.Name = name;
    }

    /// <summary>
    /// Instead of ctor, we use an Initialize method to setup the model
    /// This way we can control when the model is initialized (after deserialization) or when nested models are added
    /// </summary>
    protected abstract void Initialize();

    public void Hydrate()
    {
        if (!IsInitialized)
        {
            
            // StackTrace stackTrace = new StackTrace();
            // if (stackTrace.GetFrame(2).GetMethod().Name == nameof(Initialize))
            // {
            //     // we are being called from Initialize, therefore we dont want to call Initialize again
            //     IsInitialized = true;
            //     return;
            // }
            IsInitialized = true;
            Initialize();
        }
    }
    
    [JsonProperty]
    public string Name { get; set; }
    
    [JsonProperty]
    public bool HasStopCondition { get; set; } = false;
    
    [JsonIgnore]
    private Dictionary<string, IModel> Children { get; } = new();

    [JsonIgnore]
    private bool IsInitialized { get; set; } = false;
    
    [JsonIgnore]
    private List<(Port inPort, Port outPort, string inModel, string outModel)> Pipes { get; } = new();
    
    // TODO: this seems inconsistent, we dont care about models and only about ports here but in Pipes we care about models.
    [JsonIgnore]
    private List<(Port inPort, Port outPort)> OutsidePorts { get; } = new();
    
    [JsonIgnore]
    private List<Port> InPorts { get; } = new();
    
    [JsonIgnore]
    private List<Port> OutPorts { get; } = new();

    protected T AddModel<T>(string id) where T : IModel
    {
        T model = Activator.CreateInstance<T>();
        string prefix = (model is IAtomicModelBase) ? "simulator-" : "coordinator-";
        model.Name = id;
        Children.Add(prefix + id, model);
        return model;
    }

    protected T AddModel<T>(T model) where T : IModel
    {
        string prefix = (model is IAtomicModelBase) ? "simulator-" : "coordinator-";
        Children.Add(prefix + model.Name, model);
        return model;
    }

    protected T AddModel<T, TState>(string id, TState state)
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

    protected void RemoveModel(string id)
    {
        if (Children.ContainsKey(id))
        {
            Children.Remove(id);
        }
    }
    
    protected void AddInPort(Port port)
    {
        if (InPorts.Any(x => x.Equals(port)))
        {
            throw new ArgumentException($"Port {port} already exists in model {Name}.");
        }

        InPorts.Add(port);
    }

    protected void AddOutPort(Port port)
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
    protected void AddCoupling(string sourceId, Port sourcePort, string targetId, Port targetPort)
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


    protected void AddCouplingOut(string source, Port sourcePort, Port targetPort)
    {
        // TODO: change pipes to allow outport without model
        // TODO: evaluate if outModel is needed
        OutsidePorts.Add((sourcePort, targetPort));
    }


    protected void AddCouplingFromOutIn(Port sourcePort, string targetModel, Port targetPort)
    {
        // TODO: dont use default
        
        if(!targetModel.StartsWith("simulator-") && !targetModel.StartsWith("coordinator-"))
        {
            targetModel = Children.ContainsKey("simulator-" + targetModel)
                ? targetModel = "simulator-" + targetModel
                : targetModel = "coordinator-" + targetModel;
        }
            
        var name = this.Name;

        // TODO: is inModel relevant
        Pipes.Add((sourcePort, targetPort, $"coordinator-{name}", targetModel));
    }
    
    public List<(Port inPort, Port outPort, string inModel, string outModel)> GetCouplings()
    {
        Hydrate();
        return Pipes;
    }

    public bool HasCoupling(string entryKey, Port inPort)
    {
        Hydrate();
        return Pipes.Any(x => x.inPort.Equals(inPort) && x.inModel.Equals(entryKey));
    }

    public List<string> GetInfluencer(string inputModel)
    {
        Hydrate();
        var receivers = Pipes
            .Where(x => x.outModel.Equals(inputModel))
            .Select(x => x.inModel)
            .ToList();

        return receivers;
    }

    public bool ChildrenAreCoupled(string source, Port entryKey, string target)
    {
        Hydrate();
        return Pipes
            .Any(x => x.inModel.Equals(source) && x.outModel.Equals(target) && x.inPort.Equals(entryKey));
    }

    public Port GetCouplingOutPort(string source, Port sourcePort, string target)
    {
        Hydrate();
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
        Hydrate();
        var receivers = Pipes
            .Where(x => x.inPort.Equals(sourcePort) && x.inModel.Equals(sourceModel))
            .Select(x => (x.outModel, x.outPort))
            .ToList();

        return receivers;
    }
    
    public bool HasCouplingOut(Port inPort, out Port? outPort)
    {
        Hydrate();
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
    public List<(string, IModel)> GetChildren()
    {
        Hydrate();
        return Children.Select(x => (x.Key, x.Value)).ToList();
    }
}