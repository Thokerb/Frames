using Akka.Actor;
using Akka.Hosting;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.ReelConnector;
using Frames.ReelConnector.ReelDto;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Frames.Museum.SimulationControl;

public static class SimulationControlLogic
{
    public static async Task<Ok<string>> SetExecutionSpeed(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, SppedControlRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;

        if (request.AsFastAsPossible)
        {
            rootCoordinatorActor.Tell(new Simulation.SetSpeedControl(true,
                request.ModelId)); // Set to 1.0 for normal speed
            return TypedResults.Ok("Execution speed set to as fast as possible.");
        }

        rootCoordinatorActor.Tell(new Simulation.SetSpeedControl(request.TimeInMilliseconds, request.ModelId));
        return TypedResults.Ok($"Execution speed set to {request.TimeInMilliseconds} milliseconds.");
    }

    public static async Task<Ok<string>> SetStopAfterTime(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, SetStopAfterTimeRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(request.TimeUnits), request.ModelId));

        return TypedResults.Ok("Stop after time set.");
    }

    public static async Task<Ok<string>> StartSimulation(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, SimulationRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        // Start the simulation for the model with the given ID
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(request.ModelId));

        // You could extract the model actor from session, context, or parameters
        return TypedResults.Ok("Simulation started.");
    }

    public static async Task<Ok<string>> StopSimulation(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, SimulationRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        // Stop the simulation for the model with the given ID
        rootCoordinatorActor.Tell(new Simulation.StopSimulation(request.ModelId));

        // Tell stop message to RootCoordinator if defined
        return TypedResults.Ok("Simulation stopped.");
    }


    public static async Task<Results<Ok<ModelResponse>, BadRequest<string>>> AddAndStartReelModel(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, AddModelRequestWithDuration request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        var uniqueId = Guid.NewGuid();


        if (!string.IsNullOrWhiteSpace(request.CoupledModelName) && !string.IsNullOrWhiteSpace(request.AtomicModelName))
        {
            return TypedResults.BadRequest("Both CoupledModelName and AtomicModelName cannot be set at the same time.");
        }


        IModel model;
        if (string.IsNullOrWhiteSpace(request.AtomicModelName))
        {
            model = new ReelCoupledModel(request.ReelJson, request.CoupledModelName, null);
        }
        else
        {
            model = GetAtomicModelReel(request.ReelJson, request.AtomicModelName);
        }

        var name = string.IsNullOrWhiteSpace(request.CoupledModelName)
            ? $"simulator-{request.AtomicModelName}"
            : $"coordinator-{request.CoupledModelName}";

        await rootCoordinatorActor.Ask(
            new Simulation.CreateModel(model, name, uniqueId));


        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(request.TimeUnits), uniqueId));

        // Start the simulation for the newly created model
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));


        return TypedResults.Ok(new ModelResponse(uniqueId,
            $"Reel model created: {request.CoupledModelName} with ID {uniqueId}"));
    }

    public static async Task<Results<Ok<ModelResponse>, BadRequest<string>>> AddReelModel(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, AddModelRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        var uniqueId = Guid.NewGuid();


        if (!string.IsNullOrWhiteSpace(request.CoupledModelName) && !string.IsNullOrWhiteSpace(request.AtomicModelName))
        {
            return TypedResults.BadRequest("Both CoupledModelName and AtomicModelName cannot be set at the same time.");
        }


        IModel model;
        if (string.IsNullOrWhiteSpace(request.AtomicModelName))
        {
            model = new ReelCoupledModel(request.ReelJson, request.CoupledModelName, null);
        }
        else
        {
            model = GetAtomicModelReel(request.ReelJson, request.AtomicModelName);
        }

        var name = string.IsNullOrWhiteSpace(request.CoupledModelName)
            ? $"simulator-{request.AtomicModelName}"
            : $"coordinator-{request.CoupledModelName}";

        await rootCoordinatorActor.Ask(
            new Simulation.CreateModel(model, name, uniqueId));


        return TypedResults.Ok(new ModelResponse(uniqueId,
            $"Reel model created: {request.CoupledModelName} with ID {uniqueId}"));
    }
    
    public static async Task<Results<Ok<ModelResponse>, BadRequest<string>>> AddCheckpoint(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, AddCheckpointRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        
        var response = await rootCoordinatorActor.Ask<ActionResponse>(new Simulation.SetCheckpoint(request.CheckpointName,request.TimeUnit, request.ModelId));
        
        if (response.Success)
        {
            return TypedResults.Ok(new ModelResponse(request.ModelId, $"Checkpoint '{request.CheckpointName}' added successfully. {response.Message}"));
        }

        return TypedResults.BadRequest($"Failed to add checkpoint: {response.Message}");

    }
    
    public static async Task<Results<Ok<ModelResponse>, BadRequest<string>>> RemoveCheckpoint(HttpContext context,
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, RemoveCheckpointRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        
        var response = await rootCoordinatorActor.Ask<ActionResponse>(new Simulation.RemoveCheckpoint(request.CheckpointName, request.ModelId));
        
        if (response.Success)
        {
            return TypedResults.Ok(new ModelResponse(request.ModelId, $"Checkpoint '{request.CheckpointName}' added successfully. {response.Message}"));
        }

        return TypedResults.BadRequest($"Failed to add checkpoint: {response.Message}");

    }

    

    public static async Task<Results<Ok<SimulationStatus>, BadRequest<string>>> GetStatus(HttpContext context, IRequiredActor<RootCoordinator> rootCoordinatorActorRef, SimulationRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        // Get the status of the model with the given ID
        var status = await rootCoordinatorActor.Ask<SimulationStatus>(new Simulation.GetStatus(request.ModelId));
        return TypedResults.Ok(status);
    }
    
    private static ReelAtomicModel GetAtomicModelReel(ReelJson requestReelJson, string requestAtomicModelName)
    {
        var atomicModelJson = requestReelJson.AtomicModels
            .First(x => x.Name.Equals(requestAtomicModelName, StringComparison.OrdinalIgnoreCase));

        var state = requestReelJson.States
            .First(x => x.Name.Equals(atomicModelJson.StateRef, StringComparison.OrdinalIgnoreCase));

        return new ReelAtomicModel(atomicModelJson, state)
        {
            Name = requestAtomicModelName
        };
    }


}

public record AddModelRequest(
    ReelJson ReelJson,
    string CoupledModelName,
    string AtomicModelName);

public record AddModelRequestWithDuration(
    ReelJson ReelJson,
    string CoupledModelName,
    string AtomicModelName,
    int TimeUnits);

public record SetStopAfterTimeRequest(Guid ModelId, int TimeUnits);

public record ModelResponse(Guid ModelId, string Message);
public record ModelStatusResponse(Guid ModelId,bool Success, string Message);

public record SppedControlRequest(Guid ModelId, int TimeInMilliseconds, bool AsFastAsPossible);

public record SimulationRequest(Guid ModelId);

public record AddCheckpointRequest(string CheckpointName, TimeUnit TimeUnit, Guid ModelId);
public record RemoveCheckpointRequest(string CheckpointName, Guid ModelId);