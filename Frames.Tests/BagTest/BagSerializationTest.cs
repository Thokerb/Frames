using Frames.Model.ValueTypes;
using Newtonsoft.Json;

namespace Frames.Tests.BagTest;

public class BagSerializationTest
{
    
    [Fact]
    public void TestSerializeBag()
    {
        var bag = new Model.ValueTypes.Bag(("port1", 20), ("port2", "test"), ("port1", 10));
        
        
        var serialize = JsonConvert.SerializeObject(bag, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
        });
        var bagDeserialized = JsonConvert.DeserializeObject<Model.ValueTypes.Bag>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
        });
        
        Assert.Equal(2, bagDeserialized.Inputs["port1"].Count());
        Assert.Equal(1, bagDeserialized.Inputs["port2"].Count());
        Assert.Contains((long)20, bagDeserialized.Inputs["port1"]);
        Assert.Contains((long)10, bagDeserialized.Inputs["port1"]);
        Assert.Contains("test", bagDeserialized.Inputs["port2"]);
        Assert.True(bagDeserialized.ContainsKey("port2"));
        Assert.True(bagDeserialized.ContainsKey("port1"));
    }


    [Fact]
    public void TestSerializeInternalBag()
    {
        var b = new Model.ValueTypes.Bag(("port1", 20), ("port2", "test"), ("port1", 10));
        var bag = b.toInternalBag("bla");
        
        var serialize = JsonConvert.SerializeObject(bag, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
        });
        var bagDeserialized = JsonConvert.DeserializeObject<Model.ValueTypes.InternalBag>(serialize, new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Objects,
        });

        var classicBag = bagDeserialized.ToBag();
        
        Assert.Equal(2, classicBag.Inputs["port1"].Count());
        Assert.Equal(1, classicBag.Inputs["port2"].Count());
        Assert.Contains((long)20, classicBag.Inputs["port1"]);
        Assert.Contains((long)10, classicBag.Inputs["port1"]);
        Assert.Contains("test", classicBag.Inputs["port2"]);
        Assert.True(classicBag.ContainsKey("port2"));
        Assert.True(classicBag.ContainsKey("port1"));
    }
}