using System.Runtime.InteropServices;

namespace Frames.DevStoneAdapter;

public static class CSharpStone
{

    [DllImport("./dhry/dhrystone.dll", CallingConvention = CallingConvention.Cdecl, EntryPoint = "dhrystoneRun")]
    public static extern int RunDhrystoneOnWindowsV1(int iterations);
    
    [DllImport("dhrystone.so", CallingConvention = CallingConvention.Cdecl, EntryPoint = "dhrystoneRun")]
    public static extern int RunDhrystoneOnLinux1(int iterations);
    

}