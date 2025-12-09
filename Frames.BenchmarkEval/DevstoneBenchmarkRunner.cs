using System.Net.Http.Json;
using System.Threading.Channels;
using Microsoft.AspNetCore.SignalR.Client;

namespace Frames.BenchmarkEval;

public class DevstoneBenchmarkRunner
{
    private readonly DevstoneBenchmarkConfig _config;
    private HubConnection? _connection;

    private readonly Channel<Simulation.IsCompleted> _completionChannel =
        Channel.CreateUnbounded<Simulation.IsCompleted>();

    public DevstoneBenchmarkRunner(DevstoneBenchmarkConfig config)
    {
        _config = config;
    }

    public async Task RunAsync()
    {
        SetupCsv();
        await SetupConnection();

        for (int w = 0; w < _config.NumberWidthIncrements; w++)
        for (int d = 0; d < _config.NumberDepthIncrements; d++)
        for (int e = 0; e < _config.NumberExecutions; e++)
        {
            int width = _config.WidthStart + w * _config.WidthIncrement;
            int depth = _config.DepthStart + d * _config.DepthIncrement;

            var request = new DevstoneRequest(
                Width: width,
                Depth: depth,
                ModelType: _config.ModelType,
                IntCycles: _config.IntCycles,
                ExtCycles: _config.ExtCycles,
                PrepTime: _config.PrepTime,
                AddAtomicOutPorts: true);

            Console.Write(
                $"Devstone {request.ModelType} | " +
                $"W={width} D={depth} Exec={e + 1}/{_config.NumberExecutions}"
            );

            using var http = new HttpClient { BaseAddress = new Uri(Program.Endpoint) };
            var response = await http.PostAsJsonAsync(Program.DevstoneMethod, request);
            response.EnsureSuccessStatusCode();

            Console.Write(" - Sent. Waiting...");

            var completion = await _completionChannel.Reader.ReadAsync();
            Console.WriteLine(completion);

            WriteCsvRow(width, depth, request, completion);
        }

        Console.WriteLine($"✅ Devstone finished: {Path.GetFullPath(_config.CsvPath)}");
        await _connection!.DisposeAsync();
    }

    private async Task SetupConnection()
    {
        _connection = new HubConnectionBuilder()
            .WithUrl(Program.Endpoint + Program.BenchmarkHub)
            .Build();

        _connection.On<Simulation.IsCompleted>("Completion", msg => { _completionChannel.Writer.TryWrite(msg); });

        await _connection.StartAsync();
    }

    private void SetupCsv()
    {
        if (!File.Exists(_config.CsvPath))
        {
            File.WriteAllText(
                _config.CsvPath,
                "Width,Depth,ModelType,CompletionType,TimeMs" + Environment.NewLine
            );
        }
    }

    private void WriteCsvRow(
        int width,
        int depth,
        DevstoneRequest request,
        Simulation.IsCompleted result)
    {
        var csv = string.Join(",",
            width,
            depth,
            request.ModelType.ToString(),
            result.CompletionType.ToString(),
            result.TimeInMilliseconds
        );

        File.AppendAllText(_config.CsvPath, csv + Environment.NewLine);
    }
}