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
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef, DevstoneRequest request)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        var uniqueId = Guid.NewGuid();

        var name = $"coordinator-{request.ModelType}-{uniqueId}";

        CoupledModel model;

        switch (request.ModelType)
        {
            case DevstoneModelType.LI:
                model = new Coupled_LI(name, request.Depth, request.Width, request.IntCycles,
                    request.ExtCycles, request.AddAtomicOutPorts, request.PrepTime);
                break;
            case DevstoneModelType.HI:
            {
                model = new Coupled_HI(name, request.Depth, request.Width, request.IntCycles,
                    request.ExtCycles, request.AddAtomicOutPorts, request.PrepTime);
                break;
            }
            case DevstoneModelType.HO:
            {
                model = new Coupled_HO(name, request.Depth, request.Width, request.IntCycles,
                    request.ExtCycles, request.AddAtomicOutPorts, request.PrepTime);
                break;
            }
            case DevstoneModelType.HOmod:
            {
                model = new Coupled_HOmod(name, request.Depth, request.Width, request.IntCycles,
                    request.ExtCycles, request.AddAtomicOutPorts, request.PrepTime);
                
                break;
            }
            default:
            {
                return TypedResults.BadRequest(
                    $"Unknown model type: {request.ModelType}. Supported types are: LI, HI, HO, HOmod.");
            }
        }

        await rootCoordinatorActor.Ask(
            new Simulation.CreateModel(model, name, uniqueId));


        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(TimeUnit.Infinity, uniqueId));

        // Start the simulation for the newly created model
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));


        return TypedResults.Ok(new ModelResponse(uniqueId,
            $"Devstone model created and started with type {request.ModelType} and name {name}."));
    }
}

public record DevstoneRequest(
    DevstoneModelType ModelType,
    int Depth,
    int Width,
    int IntCycles,
    int ExtCycles,
    bool AddAtomicOutPorts,
    int PrepTime
);

[SuppressMessage("ReSharper", "InconsistentNaming")]
public enum DevstoneModelType
{
    LI,
    HI,
    HO,
    HOmod
}