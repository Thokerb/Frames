using Frames.Model.ValueTypes;
using Frames.ReelConnector;
using Frames.ReelConnector.ReelDto;

namespace Frames.Test2;

public class ReelAtomicModelTest
{
    
    
    [Theory]
    [InlineData("BlinkingLightAtomicModelBR",new [] {"On", "Off", "TransitionFinishedByItself", "FinishedByItself", "FinishedByOther"})]
    [InlineData("BlinkingLightModel2", new [] {"on"})]
    public void ReelAtomicModelTimeAdvanceTest(string atomicModelName, string[] states)
    {
        var reelJson = GetReelJson();

        var atomicModel = reelJson.AtomicModels.First(x => x.Name == atomicModelName);
        var atomicModelState = reelJson.States.First(x => x.Name == atomicModel.StateRef);
        
        var reelAtomicModel = new ReelAtomicModel(atomicModel,atomicModelState)
        {
            Name = atomicModel.Name,
        };

        Assert.NotNull(reelAtomicModel);

        foreach (var state in states)
        {
            var result = reelAtomicModel.TimeAdvance(new ReelState()
            {
                CurrentState = state,
                StateJson = atomicModelState
            });
            var expectedTimeAdvance = StateToTimeAdvanceValue(state, atomicModelName);
            Assert.True(expectedTimeAdvance.Value == result.Value, 
                $"Expected time advance for state '{state}' is {expectedTimeAdvance.Value}, but got {result.Value}.");

        }
    }
    
    [Theory]
    [InlineData("BlinkingLightAtomicModelBR","On")]
    public void ReelAtomicModelInternalTransitionTest(string atomicModelName, string state)
    {
        var reelJson = GetReelJson();

        var atomicModel = reelJson.AtomicModels.First(x => x.Name == atomicModelName);
        var atomicModelState = reelJson.States.First(x => x.Name == atomicModel.StateRef);
        
        var reelAtomicModel = new ReelAtomicModel(atomicModel,atomicModelState)
        {
            Name = atomicModel.Name,
        };

        Assert.NotNull(reelAtomicModel);


        var currentCycle = reelAtomicModel.State.StateJson.Properties.FirstOrDefault(x => x.Name == "CurrentCycle")?.Value;
        var maxCycles = reelAtomicModel.State.StateJson.Properties.FirstOrDefault(x => x.Name == "MaxCycles")?.Value;
        
        Assert.Equal((long)0, currentCycle);
        Assert.Equal((long)5, maxCycles);
        
        var result = reelAtomicModel.InternalTransition(new ReelState()
        {
            CurrentState = state,
            StateJson = reelAtomicModel.State.StateJson
        });
        
        Assert.NotNull(result);
        Assert.Equal((long)1, result.StateJson.Properties.FirstOrDefault(x => x.Name == "CurrentCycle")?.Value);
        Assert.Equal((long)5, result.StateJson.Properties.FirstOrDefault(x => x.Name == "MaxCycles")?.Value);
        Assert.Equal("Off",result.CurrentState);
    }
    
    [Theory]
    [InlineData("BlinkingLightModel2","on")]
    public void ReelAtomicModelExternalTransitionTest(string atomicModelName, string state)
    {
        var reelJson = GetReelJson();

        var atomicModel = reelJson.AtomicModels.First(x => x.Name == atomicModelName);
        var atomicModelState = reelJson.States.First(x => x.Name == atomicModel.StateRef);
        
        var reelAtomicModel = new ReelAtomicModel(atomicModel,atomicModelState)
        {
            Name = atomicModel.Name,
        };

        Assert.NotNull(reelAtomicModel);


        var enginepower = reelAtomicModel.State.StateJson.Properties.FirstOrDefault(x => x.Name == "engineSEPpower")?.Value;
        
        Assert.Equal((long)500, enginepower);
        
        var result = reelAtomicModel.ExternalTransition(new ReelState()
        {
            CurrentState = state,
            StateJson = reelAtomicModel.State.StateJson
        }, new Bag(("awasd", 5)));
        
        Assert.NotNull(result);
        Assert.Equal((long)5, result.StateJson.Properties.FirstOrDefault(x => x.Name == "engineSEPpower")?.Value);
        Assert.Equal("kabumm",result.CurrentState);
    }
    
    
    
    [Theory]
    [InlineData("BlinkingLightAtomicModelBR" ,"FinishedByItself")]
    public void ReelAtomicModelOutputTest(string atomicModelName, string state)
    {
        var reelJson = GetReelJson();

        var atomicModel = reelJson.AtomicModels.First(x => x.Name == atomicModelName);
        var atomicModelState = reelJson.States.First(x => x.Name == atomicModel.StateRef);
        
        var reelAtomicModel = new ReelAtomicModel(atomicModel,atomicModelState)
        {
            Name = atomicModel.Name,
        };

        Assert.NotNull(reelAtomicModel);


        var cycles = reelAtomicModel.State.StateJson.Properties.FirstOrDefault(x => x.Name == "MaxCycles")?.Value;
        
        Assert.Equal((long)5, cycles);
        
        var result = reelAtomicModel.Output(new ReelState()
        {
            CurrentState = state,
            StateJson = reelAtomicModel.State.StateJson
        });
        
        Assert.True(result.ContainsKey("PortOutFinished"));
        Assert.Equal(cycles, result.Inputs["PortOutFinished"]);
        
    }

    private static ReelJson? GetReelJson()
    {
        var file = "arena2.json";
        var filePath = Path.Combine(AppContext.BaseDirectory, "Data", file);
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"The reel file '{file}' does not exist at path: {filePath}");
        }
        var reelContent = File.ReadAllText(filePath);
        reelContent = reelContent.Replace(".", "SEP");
        // Deparse with Newtonsoft.Json
        
        // Act
        // We use Newtonsoft.Json here because akka.net uses Newtonsoft.Json for serialization
        ReelJson? reelJson = Newtonsoft.Json.JsonConvert.DeserializeObject<ReelJson>(reelContent);
        return reelJson;
    }


    /// <summary>
    /// Helper method to convert state names to time advance values based on the atomic model name for unit tests.
    /// </summary>
    /// <param name="state"></param>
    /// <param name="atomicModelName"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentException"></exception>
    private static TimeUnit StateToTimeAdvanceValue(string state, string atomicModelName)
    {
        if (atomicModelName == "BlinkingLightAtomicModelBR")
        {
            return state switch
            {
                "On" => 2,
                "Off" => 3,
                "TransitionFinishedByItself" => 1,
                "FinishedByItself" => TimeUnit.Infinity,
                "FinishedByOther" => TimeUnit.Infinity,
                _ => throw new ArgumentException($"Unknown state: {state}")
            };
        }
        if (atomicModelName == "BlinkingLightModel2")
        {
            return state switch
            {
                "on" => 4,
                _ => throw new ArgumentException($"Unknown state: {state}")
            };
        }
        throw new ArgumentException($"Unknown atomic model name: {atomicModelName}");

    }
    
}