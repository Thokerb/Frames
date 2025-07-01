namespace Frames.Museum.HelloWorld;

public static class DI
{
    public static void AddHWDependencies(this IServiceCollection services)
    {
        services.AddScoped<IHelloWorldManager,HelloWorldManager>();
    }
    
}