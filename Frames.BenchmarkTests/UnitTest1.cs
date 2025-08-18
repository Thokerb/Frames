namespace Frames.BenchmarkTests;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {

        var result = CSharpStone.RunDhrystoneV1(100_000_000);
        
        Assert.True(result==0, "Dhrystone V1 should return a positive result");
    }
}