namespace Frames.Tests.BlinkingLightBR;

public class AllArenas
{

    public void MakeArenas()
    {


        
        var arena3 = new CArena();

        arena3.AddModel<CArena>("arena1");
        arena3.AddModel<CArena>("arena2");
    }
}