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

namespace Frames.Museum.HelloWorld;

public static class HelloWorldLogic
{
    
    public static async Task<Ok<string>> GreetBack(IHelloWorldManager helloWorldManager)
    {
        
        var greeting = helloWorldManager.Greet();
        
        return TypedResults.Ok(greeting);
    }

    public static async Task CArenaTest(HttpContext context, IRequiredActor<RootCoordinator> rootCoordinatorActorRef, IServiceProvider serviceProvider)
    {
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        
        var uniqueId = Guid.NewGuid();
        
        ICoupledModel coupledModel = new CSuperArena2();
        
        await rootCoordinatorActor.Ask(new Simulation.CreateModel(coupledModel,$"coordinator-cSuperArena",uniqueId));
      
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(50),uniqueId));
        
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));
        
        Thread.Sleep(2000);
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(uniqueId));
        

    }


    public static async Task ReelTest(HttpContext context, IRequiredActor<RootCoordinator> rootCoordinatorActorRef,
        IServiceProvider serviceProvider)
    {
        string coupledModelRef = "QueueSystem";
        ReelJson reelJson = ReadReelJsonFromFile("HelloWorld/ReelTestData/arena2.json");
        var rootCoordinatorActor = rootCoordinatorActorRef.ActorRef;
        var uniqueId = Guid.NewGuid();

        var coupledModel = new ReelCoupledModel(reelJson, coupledModelRef, null);
        
        await rootCoordinatorActor.Ask<CreationResponse>(new Simulation.CreateModel(coupledModel,$"coordinator-{coupledModelRef}",uniqueId));
      
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(200000),uniqueId));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(uniqueId));
        Thread.Sleep(2000);
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted(uniqueId)
        {
        });
    }
    
     
    private static ReelJson ReadReelJsonFromFile(string file)
    {
        var filePath = Path.Combine(AppContext.BaseDirectory, file);
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"The reel file '{file}' does not exist at path: {filePath}");
        }
        var reelContent = File.ReadAllText(filePath);
        reelContent = reelContent.Replace(".", "SEP");
        // Deparse with Newtonsoft.Json
        
        // Act
        // We use Newtonsoft.Json here because akka.net uses Newtonsoft.Json for serialization
        ReelJson? reelJson = Newtonsoft.Json.JsonConvert.DeserializeObject<ReelJson>(reelContent);
        
        if (reelJson == null)
        {
            throw new InvalidOperationException("Failed to deserialize ReelJson from the file.");
        }
        
        return reelJson;
    }
}