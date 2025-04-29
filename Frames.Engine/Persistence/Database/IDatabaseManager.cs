namespace Frames.Engine.Persistence.Database;

public interface IDatabaseManager
{
    Task PersistAsync(SnapshotWithMetadata snapshot);
    Task<SnapshotWithMetadata> RetrieveEntry(string key,string actor);
}