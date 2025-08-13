using Frames.Museum.HelloWorld;

namespace Frames.Museum.SimulationControl;

public static class SimulationControlEndpoints
{
    public static void MapSimulationControlEndpoints(this WebApplication app)
    {
        app.MapPost("/add-model", SimulationControlLogic.AddReelModel);
        app.MapPost("/add-and-start-model", SimulationControlLogic.AddAndStartReelModel);
        
        app.MapPost("/set-execution-speed", SimulationControlLogic.SetExecutionSpeed);
        app.MapPost("/set-stop-after-time", SimulationControlLogic.SetStopAfterTime);
        
        
        app.MapPost("/start-simulation", SimulationControlLogic.StartSimulation);
        app.MapPost("/stop-simulation", SimulationControlLogic.StopSimulation);
    }
}