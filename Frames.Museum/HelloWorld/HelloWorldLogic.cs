using Microsoft.AspNetCore.Http.HttpResults;

namespace Frames.Museum.HelloWorld;

public static class HelloWorldLogic
{
    
    public static async Task<Ok<string>> GreetBack(IHelloWorldManager helloWorldManager)
    {
        
        var greeting = helloWorldManager.Greet();
        
        return TypedResults.Ok(greeting);
    }
    
}