using Akka.HealthCheck.Hosting;
using Akka.HealthCheck.Hosting.Web;
using Akka.Hosting;
using Frames.Engine.DependencyInjection;
using Frames.Museum;
using Frames.Museum.ClusterOverview;
using Frames.Museum.HelloWorld;
using Frames.Museum.SimulationControl;
using Frames.Museum.Tracing;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

/*
 * CONFIGURATION SOURCES
 */
builder.Configuration
    .AddJsonFile("appsettings.json")
    .AddJsonFile($"appsettings.{environment}.json", optional: true)
    .AddEnvironmentVariables();

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


builder.Services.WithAkkaHealthCheck(HealthCheckType.All);
builder.Services.ConfigureWebApiAkka(builder.Configuration, (akkaConfigurationBuilder, serviceProvider) =>
{
    // we configure instrumentation separately from the internals of the ActorSystem
    akkaConfigurationBuilder.ConfigurePetabridgeCmd();
    akkaConfigurationBuilder.WithWebHealthCheck(serviceProvider);
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