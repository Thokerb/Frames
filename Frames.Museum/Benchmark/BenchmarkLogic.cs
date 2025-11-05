using Akka.Actor;
using Akka.Hosting;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model.ValueTypes;
using Frames.Museum.Actors;
using Frames.Museum.Benchmark.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Serilog;

namespace Frames.Museum.Benchmark;

public static class BenchmarkLogic
{
    public static async Task<Ok<string>> Run(
        IRequiredActor<RootCoordinator> rootCoordinatorActorRef,BenchmarkRequest request)
    {
        Log.Information("Starting Benchmark");
        if (request.PercentageActive is < 0 or > 1)
        {
            throw new ArgumentException("Percentage active must be between 0 and 1");
        }

        int numberActiveNodes = (int) Math.Round(request.PercentageActive * request.NumberNodes, MidpointRounding.AwayFromZero);
        int numberInactiveNodes = request.NumberNodes - numberActiveNodes;
        
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        var uniqueId = Guid.NewGuid();

        var model = new CoupledBenchmarkModel("root2", numberInactiveNodes, numberActiveNodes, true);
        
        var resp = await rootCoordinatorActor.Ask(
            new Simulation.CreateModel(model, "coordinator-topLevel", uniqueId));
        
        Log.Information("Created model in simulation with id {UniqueId}", resp);
        
        // stop after x TimeUnits
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(request.TimeUnits), uniqueId));
        
        Thread.Sleep(100);
        
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));

        return TypedResults.Ok($"Started simulation with id {uniqueId} and parameters {request}");
    }
    
}


public record BenchmarkRequest
{
    public int NumberNodes { get; set; }
    public double PercentageActive { get; set; }
    public int TimeUnits { get; set; }
}