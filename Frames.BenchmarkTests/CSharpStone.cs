using System.Runtime.InteropServices;

namespace Frames.BenchmarkTests;

public static class CSharpStone
{

    [DllImport("./dhry/dhrystone.dll", CallingConvention = CallingConvention.Cdecl, EntryPoint = "dhrystoneRun")]
    public static extern int RunDhrystoneV1(int iterations);
    

}