using Akka.HealthCheck.Hosting;
using Akka.HealthCheck.Hosting.Web;
using Frames.Engine.DependencyInjection;
using Frames.Museum;
using Frames.Museum.Benchmark;
using Frames.Museum.Devstone;
using Frames.Museum.HelloWorld;
using Frames.Museum.SimulationControl;
using Frames.Museum.Tracing;
using Frames.Museum.Util;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

var seqUrl = Environment.GetEnvironmentVariable("SEQ") ?? "http://localhost:5341";

Serilog.Log.Logger = new Serilog.LoggerConfiguration()
    // .WriteTo.Console()
    .WriteTo.Seq(seqUrl)
    .Enrich.WithProperty("Host", Environment.MachineName)
    .CreateLogger();

Log.Logger.Information("Starting Frames.Museum in {Environment} environment", environment);
// write SEQ url to log
Log.Logger.Information("Using SEQ server at {SeqUrl}", seqUrl);

/*
 * CONFIGURATION SOURCES
 */
builder.Configuration
    .AddJsonFile("appsettings.json")
    .AddJsonFile($"appsettings.{environment}.json", optional: true)
    .AddEnvironmentVariables();

if(builder.Environment.IsDevelopment())
{
    if (builder.Configuration.GetValue<int>("AkkaSettings:AkkaManagementOptions:RequiredContactPointsNr") == 1)
    {
        var roles = builder.Configuration.GetSection("AkkaSettings:ClusterOptions:Roles").Get<List<string>>();
        
        if (!roles?.Contains("listener") ?? false)
        {
            builder.Configuration[$"AkkaSettings:ClusterOptions:Roles:{roles.Count}"] = "listener";
        }
    }
}

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

var swaggerHost = Environment.GetEnvironmentVariable("SWAGGER_HOST");

if (string.IsNullOrEmpty(swaggerHost))
{
    builder.Services.AddOpenApi();
}
else
{
    builder.Services.AddOpenApi(c =>
    {
        c.AddDocumentTransformer((document, context, cancellationToken) =>
        {
            document.Servers = new List<OpenApiServer>()
            {
                new()
                {
                    Url = swaggerHost
                }
            };

            return Task.CompletedTask;
        });
    });
}

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
builder.Services.AddSignalRConfiguration();

builder.Services.ConfigureHttpJsonOptions(options => 
{
    options.SerializerOptions.Converters.Add(new ReelJsonConverter());
    options.SerializerOptions.Converters.Add(new TimeUnitJsonConverter());
});

builder.Services.WithAkkaHealthCheck(HealthCheckType.All);
builder.Services.ConfigureWebApiAkka(builder.Configuration, (akkaConfigurationBuilder, serviceProvider) =>
{
    // we configure instrumentation separately from the internals of the ActorSystem
    akkaConfigurationBuilder.ConfigurePetabridgeCmd();
    // akkaConfigurationBuilder.WithWebHealthCheck(serviceProvider);
});
builder.Services.AddHWDependencies();
builder.Services.AddFrameServices();
builder.AddOpenTelemetryConfiguration();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options => { options.SwaggerEndpoint("/openapi/v1.json", "v1"); });
}



app.MapHelloWorld();
app.MapSimulationControlEndpoints();
app.MapBenchmarkEndpoints();
app.MapDevstoneEndpoints();
app.UseSignalRConfiguration();

app.UseHttpsRedirection();

app.MapAkkaHealthCheckRoutes(optionConfigure: (_, opt) =>
{
    // Use a custom response writer to output a json of all reported statuses
    opt.ResponseWriter = Helper.JsonResponseWriter;
}); // needed for Akka.HealthCheck
app.UseCors();

// start Metrics Actor
app.Run();