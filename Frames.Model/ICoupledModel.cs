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
    List<(string model, Port port)> GetReceivers(Port inPort);

    void AddCouplingOut(string source, Port inPort, Port outPort);
    bool HasCouplingOut(Port inPort,out Port? outPort);
}