// See https://aka.ms/new-console-template for more information

using System.CommandLine;
using Frames.DevStoneAdapter;

// Define command-line options
var modelTypeOption = new Option<string>(
    "--model-type",
    aliases: ["-m", "--model-type"])
{
    Required = true,
    Description = "DEVStone model type (LI, HI, HO, HOmod)",
};

modelTypeOption.AcceptOnlyFromAmong("LI","HI","HO","HOmod");

var depthOption = new Option<int>(
    "--depth",
    aliases: ["-d", "--depth"])
{
    Required = true,
    Description = "Number of recursive levels of the model."
};

var widthOption = new Option<int>(
    "--width",
    aliases: ["-w", "--width"])
{
    Required = true,
    Description = "Width of each coupled model."
};

var intCyclesOption = new Option<int>(
    "--int-cycles",
    aliases: ["-i", "--int-cycles"])
{
    Required = false,
    Description = "Dhrystone cycles executed in internal transitions",
    DefaultValueFactory = _ => 0
};

var extCyclesOption = new Option<int>(
    "--ext-cycles",
    aliases: ["-e", "--ext-cycles"])
{
    Required = false,
    Description = "Dhrystone cycles executed in external transitions",
    DefaultValueFactory = _ => 0
};


var flattenOption = new Option<bool>(
    "--flatten",
    aliases: ["-f", "--flatten"])
{
    Required = false,
    Description = "Activate flattening on model"
};

var chainedOption = new Option<bool>(
    "--chained",
    aliases: ["-c", "--chained"])
{
    Required = false,
    Description = "Use chained coordinator"
};

// Create the root command
var rootCommand = new RootCommand("DEVStone model generator CLI")
{
    modelTypeOption,
    depthOption,
    widthOption,
    intCyclesOption,
    extCyclesOption,
    flattenOption,
    chainedOption
};

rootCommand.SetAction(result =>
{
    string modelType = result.GetRequiredValue(modelTypeOption);
    int depth = result.GetRequiredValue(depthOption);
    int width = result.GetRequiredValue(widthOption);
    int intCycles = result.GetRequiredValue(intCyclesOption);
    int extCycles = result.GetRequiredValue(extCyclesOption);
    bool flatten = result.GetRequiredValue(flattenOption);
    bool chained = result.GetRequiredValue(chainedOption);

    // Call your external function
    DEVStoneModelGenerator.Run(modelType, depth, width, intCycles, extCycles, flatten, chained);
});

// Run the parser
var parseResult = rootCommand.Parse(args);
return await parseResult.InvokeAsync();