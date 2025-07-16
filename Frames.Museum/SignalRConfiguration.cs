namespace Frames.Museum;

public static class SignalRConfiguration
{
    public static void AddSignalRConfiguration(this IServiceCollection services)
    {
        services.AddSignalR();
    }
    
    public static void UseSignalRConfiguration(this WebApplication app)
    {
        // app.MapHub("");
    }
    
}