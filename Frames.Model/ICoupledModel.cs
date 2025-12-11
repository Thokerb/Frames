using Frames.Model.ValueTypes;

namespace Frames.Model;

public interface ICoupledModel : IModel
{
    
    // protected methods are methods used in Initialize()
    // protected T AddModel<T>(string id) where T : IModel;
    // protected void RemoveModel(string id);
    // protected void AddInPort(Port port);
    // protected void AddOutPort(Port port);
    // protected void AddCouplingOut(string source, Port inPort, Port outPort);
    // // internally coupled to other models
    // protected void AddCoupling(string sourceId, Port sourcePort, string targetId, Port targetPort);

    
    // public methods are methods used by engine.
    public List<(Port inPort, Port outPort, string inModel, string outModel)> GetCouplings();
    public List<(string, IModel)> GetChildren();
    public bool HasCoupling(string source, Port sourcePort);
    public List<string> GetInfluencer(string inputModel);
    public bool ChildrenAreCoupled(string source, Port entryKey, string target);
    public Port GetCouplingOutPort(string source, Port sourcePort, string target);
    public List<(string model, Port port)> GetReceivers(string source, Port inPort);
    public bool HasCouplingOut(Port inPort,out Port? outPort);
}