namespace Frames.Museum.HelloWorld;


public interface IHelloWorldManager
{
    // Define methods for managing HelloWorld functionality
    string Greet();
}

public class HelloWorldManager : IHelloWorldManager
{
    public string Greet()
    {
        // Implement the greeting logic
        return "Hello, World!";
    }
}