namespace Frames.Museum.Benchmark;

public static class BenchmarkEndpoints
{
    public static void MapBenchmarkEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/benchmark2");

        group.MapPost("/run", BenchmarkLogic.Run);
    }
}