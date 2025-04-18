using Frames.Engine.Monitoring;
using OpenTelemetry.Resources;

namespace Frames.Tests.PingPong;
using OpenTelemetry;
using OpenTelemetry.Trace;
public class OpenTelemetryFixture : IDisposable
{
    private const string TracerName = "unit-test-with-otel";
    private readonly TracerProvider _tracerProvider;
    public Instrumentation Instrumentation { get; }

    public OpenTelemetryFixture()
    {
        Instrumentation = new Instrumentation();
        _tracerProvider = Sdk.CreateTracerProviderBuilder()
            .SetResourceBuilder(ResourceBuilder
                .CreateDefault()
                .AddService("Frames")
            )
            // .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(TracerName))
            .AddSource(Instrumentation.ActivitySource.Name)
            .AddConsoleExporter()
            .AddOtlpExporter(options =>
            {
                options.Endpoint = new Uri("http://localhost:4317");
                options.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.Grpc;
            })
            .Build();
    }
 
    public void Dispose()
    {
        _tracerProvider?.Dispose();
        Instrumentation?.Dispose();
    }
}