using Frames.Engine.Monitoring;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace Frames.Museum.Tracing;

public static class OpenTelemetryConfiguration
{
    public static void AddOpenTelemetryConfiguration(this WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<MyResourceDetector>();
        
        // Add OpenTelemetry services
        var otel =  builder.Services.AddOpenTelemetry();
        var instrumentation = new Instrumentation();
        
        // Configure OpenTelemetry Resources with the application name
        otel.ConfigureResource(resource => resource
            .AddDetector(sp => sp.GetRequiredService<MyResourceDetector>())
            )
            ;

        // Add Metrics for ASP.NET Core and our custom metrics and export to Prometheus
        // otel.WithMetrics(metrics => metrics
        //     // Metrics provider from OpenTelemetry
        //     .AddAspNetCoreInstrumentation()
        //     // TODO: own metrics ?
        //     // .AddMeter(greeterMeter.Name)
        //
        //     // TODO: i think this is not needed, as we use mainly akka
        //     // Metrics provides by ASP.NET Core in .NET 8
        //     .AddMeter("Microsoft.AspNetCore.Hosting")
        //     .AddMeter("Microsoft.AspNetCore.Server.Kestrel")
        //     // Metrics provided by System.Net libraries
        //     .AddMeter("System.Net.Http")
        //     .AddMeter("System.Net.NameResolution")
        //     .AddConsoleExporter()
        //     .AddOtlpExporter(options =>
        //         {
        //             options.Endpoint = new Uri(builder.Configuration["OpenTelemetry:Endpoint"] ?? "http://localhost:4317");
        //             options.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.Grpc;
        //         }
        //     )
        // );

        otel.WithTracing(tracing =>
            {
                tracing.AddSource(instrumentation.ActivitySource.Name);
                tracing.AddOtlpExporter(options =>
                    {
                        options.Endpoint = new Uri(builder.Configuration["OpenTelemetry:Endpoint"] ?? "http://localhost:4317");
                        options.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.Grpc;
                    }
                );
            }
        );

    }
}

public class MyResourceDetector : IResourceDetector
{
    private IConfiguration Configuration { get; }
    private readonly IWebHostEnvironment webHostEnvironment;

    public MyResourceDetector(IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
    {
        Configuration = configuration;
        this.webHostEnvironment = webHostEnvironment;
    }

    public Resource Detect()
    {
        return ResourceBuilder.CreateEmpty()
            .AddService(serviceName: this.webHostEnvironment.ApplicationName)
            .AddAttributes(new Dictionary<string, object>
            {
                ["host.environment"] = this.webHostEnvironment.EnvironmentName,
                ["host.name"] = this.webHostEnvironment.ApplicationName,
                ["akka.system"] =  Configuration["AkkaSettings:RemoteOptions:HostName"] ?? "unknown" // AkkaSettings__RemoteOptions__HostName
            })
            .Build();
    }
}
