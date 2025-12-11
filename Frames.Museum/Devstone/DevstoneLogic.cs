using System.Diagnostics.CodeAnalysis;
using Akka.Actor;
using Akka.Hosting;
using Frames.DevStoneAdapter.Model;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Museum.SimulationControl;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Frames.Museum.Devstone;

public static class DevstoneLogic
{


    public static async Task<Results<Ok, BadRequest>> TestDevstone(int number)
    {
        // check if windows 

        var result = DevStoneAdapter.CSharpStone.RunDhrystone(number);
        return TypedResults.Ok();
    }
    
    public static async Task<Results<Ok<ModelResponse>, BadRequest<string>>> Run(
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, RequestDataTypes.DevstoneRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        var uniqueId = Guid.NewGuid();

        var name = $"coordinator-environment-{request.ModelType}-{uniqueId}";

        var model = new DevstoneEnvironment(name, request);

        await rootCoordinatorActor.Ask(
            new Simulation.CreateModel(model, name, uniqueId));


        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(TimeUnit.Infinity, uniqueId));

        // Start the simulation for the newly created model
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));


        return TypedResults.Ok(new ModelResponse(uniqueId,
            $"Devstone model created and started with type {request.ModelType} and name {name}."));
    }
}

