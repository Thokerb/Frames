namespace Frames.BenchmarkEval;

public static class TestConf
{
    
    public static readonly BenchmarkConfig TestBestN = new ()
    {
        CsvPath = "test_bestn.csv",
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
        CsvPath = "TestFrom100To3000_final1.csv",
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
        CsvPath = "TestFrom100To3000Percentage_final1.csv",
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
    
    public static readonly BenchmarkConfig Test150And200 = new ()
    {
        CsvPath = "test_bestn_special.csv",
        NodeIcrement = 0,
        NumberExecutions = 4,
        NumberNodes = 2000,
        NumberRuns = 1, // numbewr of couple groupings
        PercentageActive = 75,
        PercentageIncrement = 0,
        StartTimeUnits = 600,
        TimeUnitIncrement = 0,
        CoupleGroupings = [150,200]
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
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
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
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
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
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
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
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };
    public static readonly DevstoneBenchmarkConfig ConfigLI1 = new()
    {
        CsvPath = "Devstone_LI_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.LI,
        WidthStart = 100,
        WidthIncrement = 0, // From 100 to 20 (increment size)
        DepthStart = 100,
        DepthIncrement = 0, // Depth remains constant at 100
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };

    public static readonly DevstoneBenchmarkConfig ConfigLI2 = new()
    {
        CsvPath = "Devstone_LI_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.LI,
        WidthStart = 100,
        WidthIncrement = 0, // From 100 to 20 (increment size)
        DepthStart = 20,
        DepthIncrement = 0, // Depth remains constant at 20
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };

    public static readonly DevstoneBenchmarkConfig ConfigLI3 = new()
    {
        CsvPath = "Devstone_LI_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.LI,
        WidthStart = 20,
        WidthIncrement = 0, // Width stays at 20
        DepthStart = 100,
        DepthIncrement = 0, // Depth remains constant at 100
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };
    
    
    public static readonly DevstoneBenchmarkConfig ConfigHI1 = new()
    {
        CsvPath = "Devstone_HI_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.HI,
        WidthStart = 100,
        WidthIncrement = 0, // From 100 to 20 (increment size)
        DepthStart = 20,
        DepthIncrement = 0, // Depth remains constant at 20
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };

    public static readonly DevstoneBenchmarkConfig ConfigHI2 = new()
    {
        CsvPath = "Devstone_HI_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.HI,
        WidthStart = 20,
        WidthIncrement = 0, // Width stays at 20
        DepthStart = 100,
        DepthIncrement = 0, // Depth remains constant at 100
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };

    public static readonly DevstoneBenchmarkConfig ConfigHI3 = new()
    {
        CsvPath = "Devstone_HI_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.HI,
        WidthStart = 100,
        WidthIncrement = 0, // Width remains constant at 100
        DepthStart = 100,
        DepthIncrement = 0, // Depth remains constant at 100
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };
    
    public static readonly DevstoneBenchmarkConfig ConfigHO1 = new()
    {
        CsvPath = "Devstone_HO_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.HO,
        WidthStart = 100,
        WidthIncrement = 0, // From 100 to 20 (increment size)
        DepthStart = 20,
        DepthIncrement = 0, // Depth remains constant at 20
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };

    public static readonly DevstoneBenchmarkConfig ConfigHO2 = new()
    {
        CsvPath = "Devstone_HO_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.HO,
        WidthStart = 20,
        WidthIncrement = 0, // Width stays at 20
        DepthStart = 100,
        DepthIncrement = 0, // Depth remains constant at 100
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };

    public static readonly DevstoneBenchmarkConfig ConfigHO3 = new()
    {
        CsvPath = "Devstone_HO_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.HO,
        WidthStart = 100,
        WidthIncrement = 0, // Width stays at 20
        DepthStart = 100,
        DepthIncrement = 0, // Depth remains constant at 20
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };

    public static readonly DevstoneBenchmarkConfig ConfigHOmod1 = new()
    {
        CsvPath = "Devstone_HOmod_Results_1.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.HOmod,
        WidthStart = 20,
        WidthIncrement = 0, // From 20 to 4 (increment size)
        DepthStart = 4,
        DepthIncrement = 0, // Depth remains constant at 4
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };

    public static readonly DevstoneBenchmarkConfig ConfigHOmod2 = new()
    {
        CsvPath = "Devstone_HOmod_Results_2.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.HOmod,
        WidthStart = 4,
        WidthIncrement = 0, // Width stays at 4
        DepthStart = 20,
        DepthIncrement = 0, // Depth remains constant at 20
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };
    public static readonly DevstoneBenchmarkConfig ConfigHOmod3 = new()
    {
        CsvPath = "Devstone_HOmod_Results_2.csv",
        NumberExecutions = 10,
        ModelType = DevstoneModelType.HOmod,
        WidthStart = 20,
        WidthIncrement = 0, // Width stays at 4
        DepthStart = 20,
        DepthIncrement = 0, // Depth remains constant at 20
        IntCycles = 1000,
        ExtCycles = 1000,
        PrepTime = 1
    };


    public static BenchmarkConfig TestFrom3000ToMax = new()
    {
        CsvPath = "TestToMax.csv",
        NodeIcrement = 500,
        NumberExecutions = 1,
        NumberNodes = 10500,
        NumberRuns = 3000, // numbewr of couple groupings
        PercentageActive = 100,
        PercentageIncrement = 0,
        StartTimeUnits = 10,
        TimeUnitIncrement = 0,
        CoupleGroupings = [500]
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

    public int NumberWidthIncrements { get; set; } = 1;
    public required int DepthStart { get; set; }
    public required int DepthIncrement { get; set; }
    public int NumberDepthIncrements { get; set; }  = 1;
    public required int IntCycles { get; set; }
    public required int ExtCycles { get; set; }
    public required int PrepTime { get; set; }
}