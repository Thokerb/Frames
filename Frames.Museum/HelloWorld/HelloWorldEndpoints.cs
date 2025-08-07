namespace Frames.Museum.HelloWorld;

public static class HelloWorldEndpoints
{
    public static void MapHelloWorld(this WebApplication app)
    {
        app.MapGet("/hello-world", HelloWorldLogic.GreetBack);
        app.MapGet("/cArena-test", HelloWorldLogic.CArenaTest);
        app.MapGet("/reel-test", HelloWorldLogic.ReelTest);
    }
}
