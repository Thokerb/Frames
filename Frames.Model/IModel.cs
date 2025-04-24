namespace Frames.Model;

public interface IModel
{
    string Name { get; set; }

    bool HasStopCondition { get; set; }
}