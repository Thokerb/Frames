namespace Frames.Museum.Devstone;

public static class DevstoneEndpoints
{
    public static void MapDevstoneEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/devstone");

        group.MapPost("/run", DevstoneLogic.Run);
    }
}