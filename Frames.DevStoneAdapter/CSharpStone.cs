using System.Runtime.InteropServices;

namespace Frames.DevStoneAdapter;

public static class CSharpStone
{

    [DllImport("./dhry/dhrystone.dll", CallingConvention = CallingConvention.Cdecl, EntryPoint = "dhrystoneRun")]
    public static extern int RunDhrystoneOnWindowsV1(int iterations);
    
    [DllImport("./dhryLinux/dhrystone.so", CallingConvention = CallingConvention.Cdecl, EntryPoint = "dhrystoneRun")]
    public static extern int RunDhrystoneOnLinux1(int iterations);


    public static int RunDhrystone(int iterations)
    {
        if (OperatingSystem.IsWindows())
        {
            return RunDhrystoneOnWindowsV1(iterations);
        }

        if (OperatingSystem.IsLinux())
        {
            return RunDhrystoneOnLinux1(iterations);
        }

        throw new PlatformNotSupportedException("Dhrystone is only supported on Windows and Linux.");
    }
}