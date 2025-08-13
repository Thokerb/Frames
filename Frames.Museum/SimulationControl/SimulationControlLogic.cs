using Akka.Actor;
using Akka.Hosting;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Museum.BlinkingLightBRTest;
using Frames.ReelConnector;
using Frames.ReelConnector.ReelDto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Frames.Museum.SimulationControl;

public static class SimulationControlLogic
{
    public static async Task<Ok<string>> SetExecutionSpeed(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef)
    {
        // Extract speed from request if needed
        // For now, we'll mock this
        var speed = 1.0;

        // TODO: implement message like Simulation.SetExecutionSpeed
        // rootCoordinatorActorRef.ActorRef.Tell(new Simulation.SetExecutionSpeed(speed));

        return TypedResults.Ok($"Execution speed set to {speed}");
    }

    public static async Task<Ok<string>> SetStopAfterTime(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, SetStopAfterTimeRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        rootCoordinatorActor.Tell(
            new Simulation.SetStopAfterTime(new TimeUnit(request.TimeUnits),
                    request.ModelId) // can parse from query/body if dynamic
                {
                    ShardId = $"root-coordinator-{request.ModelId}"
                });

        return TypedResults.Ok("Stop after time set.");
    }

    public static async Task<Ok<string>> StartSimulation(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef)
    {
        // You could extract the model actor from session, context, or parameters
        return TypedResults.Ok("Simulation started.");
    }

    public static async Task<Ok<string>> StopSimulation(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef)
    {
        // Tell stop message to RootCoordinator if defined
        return TypedResults.Ok("Simulation stopped.");
    }


    public static async Task<Ok<ModelResponse>> AddAndStartReelModel(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, AddModelRequestWithDuration request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        var uniqueId = Guid.NewGuid();

        var coupledModel = new ReelCoupledModel(request.ReelJson, request.CoupledModelName, null);

        await rootCoordinatorActor.Ask<IActorRef>(
            new Simulation.CreateModel(coupledModel, $"coordinator-{request.CoupledModelName}", uniqueId)
            {
                ShardId = "root-coordinator"
            });


        // Start the simulation for the newly created model
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId)
        {
            ShardId = "root-coordinator"
        });


        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(request.TimeUnits), uniqueId)
        {
            ShardId = "root-coordinator"
        });


        return TypedResults.Ok(new ModelResponse(uniqueId,
            $"Reel model created: {request.CoupledModelName} with ID {uniqueId}"));
    }

    public static async Task<Ok<ModelResponse>> AddReelModel(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, AddModelRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        var uniqueId = Guid.NewGuid();

        var coupledModel = new ReelCoupledModel(request.ReelJson, request.CoupledModelName, null);

        var coupledModelActor = await rootCoordinatorActor.Ask<IActorRef>(
            new Simulation.CreateModel(coupledModel, $"coordinator-{request.CoupledModelName}", uniqueId)
            {
                ShardId = "root-coordinator"
            });


        return TypedResults.Ok(new ModelResponse(uniqueId,
            $"Reel model created: {request.CoupledModelName} with ID {uniqueId}"));
    }
}

public record AddModelRequest(ReelJson ReelJson, string CoupledModelName);

public record AddModelRequestWithDuration(ReelJson ReelJson, string CoupledModelName, int TimeUnits);

public record SetStopAfterTimeRequest(Guid ModelId, int TimeUnits);

public record ModelResponse(Guid ModelId, string Message);