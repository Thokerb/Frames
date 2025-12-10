using System.Globalization;
using System.Net.Http.Json;
using System.Threading.Channels;
using Frames.BenchmarkEval;
using Microsoft.AspNetCore.SignalR.Client;



public class Program
{

    public const string Endpoint = "http://localhost:8080/";
    public const string BenchmarkHub = "benchmarkHub";
    public const string BenchmarkMethod = "benchmark2/run";
    public const string DevstoneMethod = "devstone/run";

    public static async Task Main(string[] args)
    {
        // var config = new BenchmarkConfig
        // {
        //     NumberRuns = 40, // 7
        //     StartTimeUnits = 600,
        //     TimeUnitIncrement = 0,
        //     PercentageActive = 70,
        //     PercentageIncrement = 3.3333,
        //     NodeIcrement = 0,
        //     NumberNodes = 3000,
        //     CsvPath = "results-3-cluster_20gb_noj_4mb_nodes_100_to_3000_by_inc_v5_persistance.csv",
        //     NumberExecutions = 4
        // };

        // await new BenchmarkRunner(TestConf.TestBestN).RunAsync();
        // await new BenchmarkRunner(TestConf.TestFrom100To3000).RunAsync();
        // await new BenchmarkRunner(TestConf.TestFrom100To3000Percentage).RunAsync();
        
        // --- Devstone benchmarks (run AFTER normal ones) ---
        await new DevstoneBenchmarkRunner(TestConf.ConfigLI).RunAsync();
        await new DevstoneBenchmarkRunner(TestConf.ConfigHI).RunAsync();
        await new DevstoneBenchmarkRunner(TestConf.ConfigHO).RunAsync();
        await new DevstoneBenchmarkRunner(TestConf.ConfigHOmod).RunAsync();

        Console.WriteLine("✅ ALL BENCHMARKS COMPLETED");
    }
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

                foreach (var n in _config.CoupleGroupings)
                {
                    var request = new BenchmarkRequest
                    {
                        NumberNodes = numberNodes,
                        PercentageActive = Math.Round(percentageActive / 100.0,2),
                        TimeUnits = timeUnits,
                        CoupleGrouping = n
                    };

                    Console.Write($"Sending benchmark {j + 1}/{_config.NumberExecutions}: TU={timeUnits}, PA={percentageActive}, Nodes={numberNodes}, CoupleGrouping={n}");
                    using var http = new HttpClient { BaseAddress = new Uri(Program.Endpoint) };
                    var response = await http.PostAsJsonAsync(Program.BenchmarkMethod, request);
                    response.EnsureSuccessStatusCode();
                    Console.Write(" - Sent. Waiting for completion...");
                    
                    var completion = await _completionChannel.Reader.ReadAsync();
                    Console.WriteLine(completion);
                    WriteCsvRow(i+1,j + 1, request, completion);
                    Console.WriteLine("\tCompleted.");
                
                    // Allows akka to delete not used nodes after 5 seconds
                    // Thread.Sleep(1 * 1000);   
                }
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

        _connection.Closed += async (error) => Console.WriteLine("Connection closed. Error: " + error?.Message);
        _connection.Reconnecting += async (error) => Console.WriteLine("Connection reconnecting. Error: " + error?.Message);
        _connection.Reconnected += async (connectionId) => Console.WriteLine("Connection reconnected. ConnectionId: " + connectionId);
        
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
            File.WriteAllText(_config.CsvPath, "Run,Execution,NumberNodes,TimeUnits,PercentageActive,CompletionType,CoupleGrouping,TimeMs" + Environment.NewLine);
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
            request.CoupleGrouping,
            result.TimeInMilliseconds
        );
        
        Console.WriteLine(
            $"Run={run,-3}  Exec={execution,-3}  Nodes={request.NumberNodes,-5}  " +
            $"TimeUnits={request.TimeUnits,-6}  Active={request.PercentageActive,-5}  " +
            $"Type={result.CompletionType,-12}  Group={request.CoupleGrouping,-4}  " +
            $"TimeMs={result.TimeInMilliseconds}"
        );
        
        File.AppendAllText(_config.CsvPath, csv + Environment.NewLine);
    }
}
