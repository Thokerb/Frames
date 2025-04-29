using Frames.Engine.Persistence.Database;
using Frames.Model;
using Frames.Model.ValueTypes;
using MongoDB.Bson.Serialization.Attributes;

namespace Frames.Engine.Persistence;

public interface ISnapshotManager
{
    Task SaveSnapshotAsync(string checkpoint, SimulatorSnapshotObject snapshot, string actorName);
    Task SaveSnapshotAsync(string checkpoint, CoordinatorSnapshotObject snapshot, string actorName);
    Task<CoordinatorSnapshotObject?> GetSnapshotCoordinatorAsync(string key, string actorName);
    Task<SimulatorSnapshotObject?> GetSnapshotSimulatorAsync(string key, string actorName);
}

public class SnapshotManager : ISnapshotManager
{
    public SnapshotManager(IDatabaseManager databaseManager)
    {
        DatabaseManager = databaseManager;
     
    }

    public IDatabaseManager DatabaseManager { get; set; }

    
    public async Task SaveSnapshotAsync(string checkpoint, SimulatorSnapshotObject snapshot, string actorName)
    {
        var serialized = System.Text.Json.JsonSerializer.Serialize(snapshot);
     
        var entry = new SnapshotWithMetadata()
        {
            SerializedSnapshot = serialized,
            Timestamp = DateTime.UtcNow,
            CheckpointName = $"{checkpoint}",
            ActorName = actorName
        };
        // Save the serialized snapshot to a persistent store
        await DatabaseManager.PersistAsync(entry);
    }

    public async Task SaveSnapshotAsync(string checkpoint, CoordinatorSnapshotObject snapshot, string actorName)
    {
        var serialized = System.Text.Json.JsonSerializer.Serialize(snapshot);
     
        var entry = new SnapshotWithMetadata()
        {
            SerializedSnapshot = serialized,
            Timestamp = DateTime.UtcNow,
            CheckpointName = $"{checkpoint}",
            ActorName = actorName
        };
        // Save the serialized snapshot to a persistent store
        await DatabaseManager.PersistAsync(entry);
        
    }

    public async Task<CoordinatorSnapshotObject?> GetSnapshotCoordinatorAsync(string key, string actor)
    {
        var entry = await DatabaseManager.RetrieveEntry(key,actor);
        var snapshot = System.Text.Json.JsonSerializer.Deserialize<CoordinatorSnapshotObject>(entry.SerializedSnapshot);
        return snapshot;
    }
    public async Task<SimulatorSnapshotObject?> GetSnapshotSimulatorAsync(string key, string actor)
    {
        var entry = await DatabaseManager.RetrieveEntry(key,actor);
        var snapshot = System.Text.Json.JsonSerializer.Deserialize<SimulatorSnapshotObject>(entry.SerializedSnapshot);
        return snapshot;
    }
}

public record  SimulatorSnapshotObject
{
    public required TimeUnit TimeNext { get; set; }
    public required TimeUnit TimeLast { get; set; }
    public required TimeUnit TimeElapsed { get; set; }
    public required IState AtomicModelState { get; set; }
    public required Bag OutputBag { get; set; }
}

public record CoordinatorSnapshotObject
{
    public required TimeUnit TimeNext { get; init; }
    public required TimeUnit TimeLast { get; init; }
    public required IDictionary<string, (TimeUnit timeLast, TimeUnit timeNext)>  EventList { get; init; }
}


public sealed class SnapshotWithMetadata
{
    public required string SerializedSnapshot { get; set; }
    public required DateTime Timestamp { get; set; }
    public required string CheckpointName { get; set; }
    public required string ActorName { get; set; }
}
