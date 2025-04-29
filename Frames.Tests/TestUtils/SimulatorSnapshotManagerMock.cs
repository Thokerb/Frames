using Frames.Engine.Persistence;
using NSubstitute;

namespace Frames.Tests.TestUtils;

public static class SimulatorSnapshotManagerMock
{
    public static ISnapshotManager CreateMock()
    {
        var snapshotManager = Substitute.For<ISnapshotManager>();
        return snapshotManager;
    }
} 