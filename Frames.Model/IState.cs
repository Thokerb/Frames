namespace Frames.Model;

public interface IState<TValue>
{
    string Name { get; }
    TValue Value { get; }
    
}