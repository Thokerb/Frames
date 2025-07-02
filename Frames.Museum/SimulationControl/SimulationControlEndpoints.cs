using Frames.Museum.HelloWorld;

namespace Frames.Museum.SimulationControl;

public static class SimulationControlEndpoints
{
    public static void MapSimulationControlEndpoints(this WebApplication app)
    {
        app.MapGet("/add-model", HelloWorldLogic.GreetBack);
        app.MapGet("/start-simulation", HelloWorldLogic.GreetBack);
        app.MapGet("/stop-simulation", HelloWorldLogic.GreetBack);
    }
}