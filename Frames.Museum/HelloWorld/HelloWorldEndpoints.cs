namespace Frames.Museum.HelloWorld;

public static class HelloWorldEndpoints
{
    public static void MapHelloWorld(this WebApplication app)
    {
        app.MapGet("/hello-world", HelloWorldLogic.GreetBack);
    }
}
