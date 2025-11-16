using System.Globalization;
using System.Net.Http.Json;
using System.Threading.Channels;
using Microsoft.AspNetCore.SignalR.Client;
using Frames.Engine.Messages;
using Frames.Museum.Benchmark;



public class Program
{

    public const string Endpoint = "http://localhost:8080/";
    public const string BenchmarkHub = "BenchmarkHub";
    public const string BenchmarkMethod = "benchmark2/run";

    public static async Task Main(string[] args)
    {
        var config = new BenchmarkConfig
        {
            NumberRuns = 40, // 7
            StartTimeUnits = 600,
            TimeUnitIncrement = 0,
            PercentageActive = 0,
            PercentageIncrement = 3.3333,
            NodeIcrement = 0,
            NumberNodes = 3000,
            CsvPath = "results-3-cluster_20gb_noj_4mb_nodes_100_to_3000_by_inc_v4_persistance.csv",
            NumberExecutions = 4
        };

        var runner = new BenchmarkRunner(config);
        await runner.RunAsync();
    }
}

public class BenchmarkConfig
{
    public int NumberRuns { get; set; }
    public int NumberNodes { get; set; }
    public int StartTimeUnits { get; set; }
    public int TimeUnitIncrement { get; set; }
    public double PercentageActive { get; set; }
    public double PercentageIncrement { get; set; }
    public string CsvPath { get; set; } = "results-5-cluster.csv";
    public int NumberExecutions { get; set; }
    public int NodeIcrement { get; set; }
}

public class BenchmarkRunner
{
    private readonly BenchmarkConfig _config;
    private HubConnection? _connection;
    private readonly Channel<Simulation.IsCompleted> _completionChannel = Channel.CreateUnbounded<Simulation.IsCompleted>();

    public BenchmarkRunner(BenchmarkConfig config)
    {
        _config = config;
    }

    public async Task RunAsync()
    {
        SetupCsv();
        await SetupConnection();

        int timeUnits = _config.StartTimeUnits;
        double percentageActive = _config.PercentageActive;
        int numberNodes = _config.NumberNodes;

        for (int i = 0; i < _config.NumberRuns; i++)
        {

            for (int j = 0; j < _config.NumberExecutions; j++)
            {
                            
                var request = new BenchmarkRequest
                {
                    NumberNodes = numberNodes,
                    PercentageActive = Math.Round(percentageActive / 100.0,1),
                    TimeUnits = timeUnits
                };

                Console.WriteLine($"Sending benchmark {j + 1}/{_config.NumberExecutions}: TU={timeUnits}, PA={percentageActive}, Nodes={numberNodes}");
                using var http = new HttpClient { BaseAddress = new Uri(Program.Endpoint) };
                var response = await http.PostAsJsonAsync(Program.BenchmarkMethod, request);
                response.EnsureSuccessStatusCode();
                
                var completion = await _completionChannel.Reader.ReadAsync();
                Console.WriteLine(completion);
                WriteCsvRow(i+1,j + 1, request, completion);
                Console.WriteLine("Completed.");
                
                // Allows akka to delete not used nodes after 5 seconds
                // Thread.Sleep(1 * 1000);
            }
            
            timeUnits += _config.TimeUnitIncrement;
            percentageActive += _config.PercentageIncrement;
            numberNodes += _config.NodeIcrement;
        }
        
        // Write path of csv
        Console.WriteLine($"Finished. Csv path: {Path.GetFullPath(_config.CsvPath)}");

        await _connection!.DisposeAsync();
    }

    private async Task SetupConnection()
    {
        _connection = new HubConnectionBuilder()
            .WithUrl(Program.Endpoint + Program.BenchmarkHub)
            .Build();

        _connection.On<Simulation.IsCompleted>("Completion", msg =>
        {
            _completionChannel.Writer.TryWrite(msg);
        });

        await _connection.StartAsync();
    }

    private void SetupCsv()
    {
        if (!File.Exists(_config.CsvPath))
        {
            File.WriteAllText(_config.CsvPath, "Run,Execution,NumberNodes,TimeUnits,PercentageActive,CompletionType,TimeMs" + Environment.NewLine);
        }
    }

    private void WriteCsvRow(int run,int execution, BenchmarkRequest request, Simulation.IsCompleted result)
    {
        var csv = string.Join(",",
            run,
            execution,
            request.NumberNodes,
            request.TimeUnits,
            request.PercentageActive.ToString(CultureInfo.InvariantCulture),
            result.CompletionType.ToString(),
            result.TimeInMilliseconds
        );

        File.AppendAllText(_config.CsvPath, csv + Environment.NewLine);
    }
}
