using Frames.Model.ValueTypes;

namespace Frames.Model;

public interface ICoupledModel : IModel
{
    /// <summary>
    /// Adds an atomic model to the coupled model and returns the instance of the atomic model.
    /// </summary>
    /// <param name="atomicModel"></param>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="TState"></typeparam>
    public T AddModel<T>(string id) where T : IModel;
    public void RemoveModel(string id);

    public List<(string, IModel)> GetChildren();
    
    // externally coupled to other models
    public void AddInPort(Port port);
    public void AddOutPort(Port port);
    
    // internally coupled to other models
    public void AddCoupling(string sourceId, Port sourcePort, string targetId, Port targetPort);

    public List<(Port inPort, Port outPort, string inModel, string outModel)> GetCouplings();

    public bool HasCoupling(string source, Port sourcePort);

    public List<string> GetInfluencer(string inputModel);
    bool ChildrenAreCoupled(string source, Port entryKey, string target);
    Port GetCouplingOutPort(string source, Port sourcePort, string target);
    List<(string model, Port port)> GetReceivers(Port key);
}

public class CoupledModel : ICoupledModel
{
    public CoupledModel(string name)
    {
        this.Name = name;
    }

    public string Name { get; init; }

    private Dictionary<string, IModel> Children { get; } = new();
    
    private List<(Port inPort, Port outPort, string inModel, string outModel)> Pipes { get; } = new();
    
    public T AddModel<T>(string id) where T : IModel
    {
        T model = Activator.CreateInstance<T>();
        string prefix = (model is IAtomicModelBase) ? "simulator-" : "coordinator-";
        Children.Add(prefix+id, model);
        return model;
    }    
    public T AddModel<T,TState>(string id, TState state) 
        where T : IAtomicModel<TState>
        where TState : IState
    {
        var model = Activator.CreateInstance<T>();
        model.StateBr = state;
        string prefix = (model is IAtomicModelBase) ? "simulator-" : "coordinator-";
        Children.Add(prefix+id, model);
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

    public void AddInPort(Port port)
    {
        throw new NotImplementedException();
    }

    public void AddOutPort(Port port)
    {
        throw new NotImplementedException();
    }
    
    public void AddCoupling(string sourceId, Port sourcePort, string targetId, Port targetPort)
    {
        if (Name != sourceId)
        {
            sourceId = Children.Keys.Any(x => x.Equals("simulator-"+sourceId)) 
                ? sourceId = "simulator-"+sourceId 
                : sourceId = "coordinator-"+sourceId;

        }

        targetId = Children.Keys.Any(x => x.Equals("simulator-"+targetId))
            ? targetId = "simulator-"+targetId 
            : targetId = "coordinator-"+targetId;
        
        if (!Children.ContainsKey(sourceId) && Name != sourceId)
        {
            throw new ArgumentException($"Source model with id {sourceId} does not exist.");
        }
        if (!Children.ContainsKey(targetId))
        {
            throw new ArgumentException($"Target model with id {targetId} does not exist.");
        }
        
        Pipes.Add((sourcePort, targetPort, sourceId, targetId));
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

    public List<(string model, Port port)> GetReceivers(Port key)
    {
        var receivers = Pipes
            .Where(x => x.inPort.Equals(key))
            .Select(x => (x.outModel, x.outPort))
            .ToList();

        return receivers;
    }
}