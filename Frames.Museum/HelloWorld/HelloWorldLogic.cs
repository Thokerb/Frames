using Akka.Actor;
using Akka.Hosting;
using Frames.Engine;
using Frames.Engine.Messages;
using Frames.Model;
using Frames.Model.ValueTypes;
using Frames.Museum.BlinkingLightBRTest;
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
        
        var uniqueId = Guid.NewGuid().ToString();
        
        ICoupledModel coupledModel = new CArena();
        
        var coupledModelActor = await rootCoordinatorActor.Ask<IActorRef>(new Simulation.CreateModel(coupledModel,$"coordinator-carena-{uniqueId}"));
      
        
        // Act
        rootCoordinatorActor.Tell(new Simulation.SetStopAfterTime(new TimeUnit(50)));
        rootCoordinatorActor.Tell(new Simulation.StartSimulation(coupledModelActor));
        Thread.Sleep(2000);
        rootCoordinatorActor.Tell(new Simulation.QueryIsCompleted());

    }
}