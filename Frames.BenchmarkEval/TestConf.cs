namespace Frames.BenchmarkEval;

public static class TestConf
{
    
    public static readonly BenchmarkConfig TestBestN = new ()
    {
        CsvPath = "test_bestn_3.csv",
        NodeIcrement = 0,
        NumberExecutions = 4,
        NumberNodes = 2000,
        NumberRuns = 1, // numbewr of couple groupings
        PercentageActive = 75,
        PercentageIncrement = 0,
        StartTimeUnits = 600,
        TimeUnitIncrement = 0,
        CoupleGroupings = [2,5,10, 25, 50, 75, 100, 125, 150, 175, 200, 250, 300, 350, 400]
    };
    
    public static readonly BenchmarkConfig TestFrom100To3000 = new ()
    {
        CsvPath = "TestFrom100To3000.csv",
        NodeIcrement = 100,
        NumberExecutions = 4,
        NumberNodes = 100,
        NumberRuns = 29, // numbewr of couple groupings
        PercentageActive = 100,
        PercentageIncrement = 0,
        StartTimeUnits = 600,
        TimeUnitIncrement = 0,
        CoupleGroupings = [50]
    };
    
    public static readonly BenchmarkConfig TestFrom100To3000Percentage = new ()
    {
        CsvPath = "TestFrom100To3000Percentage.csv",
        NodeIcrement = 0,
        NumberExecutions = 4,
        NumberNodes = 3000,
        NumberRuns = 29, // numbewr of couple groupings
        PercentageActive = 0,
        PercentageIncrement = 3.33333,
        StartTimeUnits = 600,
        TimeUnitIncrement = 0,
        CoupleGroupings = [50]
    };
    
    public static readonly BenchmarkConfig TestDevstone = new ()
    {
        CsvPath = "TestCoupleGroupings.csv",
        NodeIcrement = 0,
        NumberExecutions = 4,
        NumberNodes = 2000,
        NumberRuns = 20, // numbewr of couple groupings
        PercentageActive = 75,
        PercentageIncrement = 0,
        StartTimeUnits = 600,
        TimeUnitIncrement = 0,
        CoupleGroupings = [2,5,10,25,50,75,100,125,150,175,200,250,300,350,400,450,500,600,700,800]
    };  
    
    public static readonly DevstoneBenchmarkConfig ConfigLI = new()
    {
        CsvPath = "Devstone_LI_Results.csv",
        NumberExecutions = 4,
        ModelType = DevstoneModelType.LI,
        WidthStart = 2,
        WidthIncrement = 100,
        DepthStart = 1,
        DepthIncrement = 100,
        IntCycles = 100000,
        ExtCycles = 100000,
        PrepTime = 0
    };

    public static readonly DevstoneBenchmarkConfig ConfigHI = new()
    {
        CsvPath = "Devstone_HI_Results.csv",
        NumberExecutions = 4,
        ModelType = DevstoneModelType.HI,
        WidthStart = 2,
        WidthIncrement = 100,
        DepthStart = 1,
        DepthIncrement = 100,
        IntCycles = 100000,
        ExtCycles = 100000,
        PrepTime = 0
    };

    public static readonly DevstoneBenchmarkConfig ConfigHO = new()
    {
        CsvPath = "Devstone_HO_Results.csv",
        NumberExecutions = 4,
        ModelType = DevstoneModelType.HO,
        WidthStart = 2,
        WidthIncrement = 100,
        DepthStart = 1,
        DepthIncrement = 100,
        IntCycles = 100000,
        ExtCycles = 100000,
        PrepTime = 0
    };

    public static readonly DevstoneBenchmarkConfig ConfigHOmod = new()
    {
        CsvPath = "Devstone_HOmod_Results.csv",
        NumberExecutions = 4,
        ModelType = DevstoneModelType.HOmod,
        WidthStart = 2,
        WidthIncrement = 1,
        NumberWidthIncrements = 8, 
        DepthStart = 1,
        DepthIncrement = 1,
        NumberDepthIncrements = 9,
        IntCycles = 100000,
        ExtCycles = 100000,
        PrepTime = 0
    };
    
}

public record BenchmarkConfig
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
    public List<int> CoupleGroupings { get; set; } = new List<int>();
}

public record DevstoneBenchmarkConfig
{
    public required int NumberExecutions { get; set; }
    public required string CsvPath { get; set; } = "results-5-cluster.csv";
    public required DevstoneModelType ModelType { get; set; }
    public required int WidthStart { get; set; }
    public required int WidthIncrement { get; set; }

    public int NumberWidthIncrements { get; set; } = 15;
    public required int DepthStart { get; set; }
    public required int DepthIncrement { get; set; }
    public int NumberDepthIncrements { get; set; }  = 15;
    public required int IntCycles { get; set; }
    public required int ExtCycles { get; set; }
    public required int PrepTime { get; set; }
}