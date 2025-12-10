using Frames.Model.ValueTypes;
using Frames.ReelConnector;
using Frames.ReelConnector.Converter;
using Frames.ReelConnector.ReelDto;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Frames.Test2;

public class ReelAtomicModelTestSerialized
{
    [Theory]
    [InlineData("BlinkingLightAtomicModelBR",
        new[] { "On", "Off", "TransitionFinishedByItself", "FinishedByItself", "FinishedByOther" })]
    [InlineData("BlinkingLightModel2", new[] { "on" })]
    public void ReelAtomicModelTimeAdvanceTest(string atomicModelName, string[] states)
    {
        var reelAtomicModel = GetReelJson(atomicModelName);


        Assert.NotNull(reelAtomicModel);

        foreach (var state in states)
        {
            var result = reelAtomicModel.TimeAdvance(new ReelState()
            {
                CurrentState = state,
                StateJson = reelAtomicModel.State.StateJson
            });
            var expectedTimeAdvance = StateToTimeAdvanceValue(state, atomicModelName);
            Assert.True(expectedTimeAdvance.Value == result.Value,
                $"Expected time advance for state '{state}' is {expectedTimeAdvance.Value}, but got {result.Value}.");
        }
    }

    [Theory]
    [InlineData("BlinkingLightAtomicModelBR", "On")]
    public void ReelAtomicModelInternalTransitionTest(string atomicModelName, string state)
    {
        var reelAtomicModel = GetReelJson(atomicModelName);

        Assert.NotNull(reelAtomicModel);


        var currentCycle = reelAtomicModel.State.StateJson.Properties["CurrentCycle"].Value;
        var maxCycles = reelAtomicModel.State.StateJson.Properties["MaxCycles"].Value;

        Assert.Equal((double)0, currentCycle);
        Assert.Equal((double)5, maxCycles);

        var result = reelAtomicModel.InternalTransition(new ReelState()
        {
            CurrentState = state,
            StateJson = reelAtomicModel.State.StateJson
        });

        Assert.NotNull(result);
        Assert.Equal((double)1, result.StateJson.Properties["CurrentCycle"].Value);
        Assert.Equal((double)5, result.StateJson.Properties["MaxCycles"].Value);
        Assert.Equal("Off", result.CurrentState);
    }

    [Theory]
    [InlineData("BlinkingLightModel2", "on")]
    public void ReelAtomicModelExternalTransitionTest(string atomicModelName, string state)
    {
        var reelAtomicModel = GetReelJson(atomicModelName);


        Assert.NotNull(reelAtomicModel);


        var enginepower = reelAtomicModel.State.StateJson.Properties["engineSEPpower"].Value;

        Assert.Equal((double)500, enginepower);

        var result = reelAtomicModel.ExternalTransition(new ReelState()
        {
            CurrentState = state,
            StateJson = reelAtomicModel.State.StateJson
        }, new Bag(("awasd", new List<object?>()
        {
            new ReelPortObject()
            {
                Properties = new List<ReelPortObjectProperty>()
                {
                    new ReelPortObjectProperty()
                    {
                        Key = "",
                        Value = 5
                    }
                }
            }
        })));

        Assert.NotNull(result);
        Assert.Equal((double)5, result.StateJson.Properties["engineSEPpower"].Value);
        Assert.Equal("kabumm", result.CurrentState);
    }

    [Theory]
    [InlineData("BlinkingLightAtomicModelBR", "FinishedByItself")]
    public void ReelAtomicModelOutputTest(string atomicModelName, string state)
    {
        var reelAtomicModel = GetReelJson(atomicModelName);


        Assert.NotNull(reelAtomicModel);


        var cycles = reelAtomicModel.State.StateJson.Properties["MaxCycles"].Value;

        Assert.Equal((double)5, cycles);

        var result = reelAtomicModel.Output(new ReelState()
        {
            CurrentState = state,
            StateJson = reelAtomicModel.State.StateJson
        });

        var serialize = JsonConvert.SerializeObject(result, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
            Converters = new List<JsonConverter>(new List<JsonConverter>()
            {
                new OperatorConverter(), new PropertyArrayToDictionaryConverter()
            })
        });
        var bagDeserializeObject = JsonConvert.DeserializeObject<Bag>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
            Converters = new List<JsonConverter>(new List<JsonConverter>()
            {
                new OperatorConverter(), new PropertyArrayToDictionaryConverter()
            })
        });

        Assert.True(bagDeserializeObject.ContainsKey("PortOutFinished"));
        Assert.Equal(cycles,
            ((ReelPortObject)bagDeserializeObject.Inputs["PortOutFinished"].First()).Properties.Find(x => x.Key == "")
            .Value);
    }

    private static ReelAtomicModel GetReelJson(string atomicModelName)
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

        var atomicModel = reelJson.AtomicModels.First(x => x.Name == atomicModelName);
        var atomicModelState = reelJson.States.First(x => x.Name == atomicModel.StateRef);

        var reelAtomicModel = new ReelAtomicModel(atomicModel, atomicModelState)
        {
            Name = atomicModel.Name,
        };
        var serialize = JsonConvert.SerializeObject(reelAtomicModel, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
            Converters = new List<JsonConverter>(new List<JsonConverter>()
            {
                new OperatorConverter(), new PropertyArrayToDictionaryConverter()
            })
        });
        var modelDeserialized = JsonConvert.DeserializeObject<ReelAtomicModel>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
            Converters = new List<JsonConverter>(new List<JsonConverter>()
            {
                new OperatorConverter(), new PropertyArrayToDictionaryConverter()
            })
        });
        return modelDeserialized;
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