using Frames.Model.ValueTypes;

namespace Frames.Model;

public interface ICoupledModel
{
    /// <summary>
    /// Adds an atomic model to the coupled model and returns the instance of the atomic model.
    /// </summary>
    /// <param name="atomicModel"></param>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="TState"></typeparam>
    public T AddAtomicModel<T>() where T : IAtomicModelBase;

    public void RemoveAtomicModel<T, TState>() where T : AtomicModel<TState> where TState : IState;
    
    
    
    
    // externally coupled to other models
    public void AddInPort(Pipe pipe);
    public void AddOutPort(Pipe pipe);
    
    // internally coupled to other models
    public void AddCoupling(IAtomicModelBase source, Pipe sourcePort, IAtomicModelBase target, Pipe targetPort);
}

public class CoupledModel : ICoupledModel
{
    public T AddAtomicModel<T>() where T : IAtomicModelBase
    {
        throw new NotImplementedException();
    }

    public void RemoveAtomicModel<T,TState>() where T : AtomicModel<TState> where TState : IState
    {
        throw new NotImplementedException();
    }

    public void AddInPort(Pipe pipe)
    {
        throw new NotImplementedException();
    }

    public void AddOutPort(Pipe pipe)
    {
        throw new NotImplementedException();
    }

    public void AddCoupling(IAtomicModelBase source, Pipe sourcePort, IAtomicModelBase target, Pipe targetPort)
    {
    }
}