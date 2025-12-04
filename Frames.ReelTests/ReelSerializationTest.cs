using Frames.Museum.Benchmark.Model;
using Frames.ReelConnector;
using Frames.ReelConnector.Converter;
using Frames.ReelConnector.ReelDto;
using Newtonsoft.Json;

namespace Frames.Test2;

public class ReelSerializationTest
{
    [Fact]
    public void TestSerializeAtomicModel()
    {

        var reel = GetReelJson();

        var atomicModel = reel.AtomicModels.First(x => x.Name == "Queue");
        var atomicModelState = reel.States.First(x => x.Name == atomicModel.StateRef);
        
        var model = new ReelAtomicModel(atomicModel, atomicModelState)
        {
            Name = "q1"
        };
        
        var serialize = JsonConvert.SerializeObject(model, new JsonSerializerSettings()
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
        
        Assert.Equal("q1", modelDeserialized.Name);
        Assert.Equal("CheckQueue", modelDeserialized.State.CurrentState);
        Assert.Equal(4, modelDeserialized.State.StateJson.States.Count);
    }    
    
    [Fact]
    public void TestSerializeCoupledModel()
    {

        var reel = GetReelJson();

        var model = new ReelCoupledModel(reel, "QueueSystem", null);
        
        var serialize = JsonConvert.SerializeObject(model, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
            Converters = new List<JsonConverter>(new List<JsonConverter>()
            {
                new OperatorConverter(), new PropertyArrayToDictionaryConverter()
            })
        });
        var modelDeserialized = JsonConvert.DeserializeObject<ReelCoupledModel>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto
        });
        
        Assert.Equal("QueueSystem", modelDeserialized.Name);
        Assert.Equal(6, modelDeserialized.GetChildren().Count);
        Assert.Equal(10, modelDeserialized.GetCouplings().Count);
    }
    
    private static ReelJson GetReelJson()
    {
        var file = "queue2.json";
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
}