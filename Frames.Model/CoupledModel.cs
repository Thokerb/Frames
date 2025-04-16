using Akka.Actor;
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
}

public class CoupledModel : ICoupledModel
{
    private Dictionary<string, IModel> children { get; set; } = new();
    
    private List<(Port inPort, Port outPort, string inModel, string outModel)> pipes { get; set; } = new();
    
    public T AddModel<T>(string id) where T : IModel
    {
        T model = Activator.CreateInstance<T>();
        string prefix = (model is IAtomicModelBase) ? "simulator-" : "coordinator-";
        children.Add(prefix+id, model);
        return model;
    }    
    public T AddModel<T,TState>(string id, TState state) 
        where T : IAtomicModel<TState>
        where TState : IState
    {
        var model = Activator.CreateInstance<T>();
        model.State = state;
        string prefix = (model is IAtomicModelBase) ? "simulator-" : "coordinator-";
        children.Add(prefix+id, model);
        return model;
    }
    
    public void RemoveModel(string id)
    {
        if (children.ContainsKey(id))
        {
            children.Remove(id);
        }
    }

    public List<(string, IModel)> GetChildren()
    {
        return children.Select(x => (x.Key, x.Value)).ToList();
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
        sourceId = children.Keys.Any(x => x.Equals("simulator-"+sourceId)) 
            ? sourceId = "simulator-"+sourceId 
            : sourceId = "coordinator-"+sourceId;
        
        targetId = children.Keys.Any(x => x.Equals("simulator-"+targetId))
            ? targetId = "simulator-"+targetId 
            : targetId = "coordinator-"+targetId;
        
        if (!children.ContainsKey(sourceId))
        {
            throw new ArgumentException($"Source model with id {sourceId} does not exist.");
        }
        if (!children.ContainsKey(targetId))
        {
            throw new ArgumentException($"Target model with id {targetId} does not exist.");
        }
        
        pipes.Add((sourcePort, targetPort, sourceId, targetId));
    }

    public List<(Port inPort, Port outPort, string inModel, string outModel)> GetCouplings()
    {
        return pipes;
    }

    public bool HasCoupling(string entryKey, Port inPort)
    {
        return pipes.Any(x => x.inPort.Equals(inPort) && x.inModel.Equals(entryKey));
    }

    public List<string> GetInfluencer(string inputModel)
    {
        var receivers = pipes
            .Where(x => x.outModel.Equals(inputModel))
            .Select(x => x.inModel)
            .ToList();

        return receivers;
    }

    public bool ChildrenAreCoupled(string source, Port entryKey, string target)
    {
        return pipes
            .Any(x => x.inModel.Equals(source) && x.outModel.Equals(target) && x.inPort.Equals(entryKey));
    }

    public Port GetCouplingOutPort(string source, Port sourcePort, string target)
    {
        var coupling = pipes
            .FirstOrDefault(x => x.inModel.Equals(source) && x.outModel.Equals(target) && x.inPort.Equals(sourcePort));
        
        if (coupling == default)
        {
            throw new ArgumentException($"No coupling found for source {source} and target {target}");
        }
        
        return coupling.outPort;
    }
}