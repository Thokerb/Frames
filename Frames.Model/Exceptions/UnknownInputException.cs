using Frames.Model.ValueTypes;

namespace Frames.Model.Exceptions;

public class UnknownInputException : Exception
{
    public UnknownInputException(string key, Bag bag)
        : base($"Unknown input: {key} in input bag: [{string.Join(", ", bag.Inputs.Keys)}]")
    {
    }
    
}