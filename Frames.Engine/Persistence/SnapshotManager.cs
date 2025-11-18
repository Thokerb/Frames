using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using Frames.Engine.Dto;
using Frames.Engine.Persistence.Database;
using Frames.Model;
using Frames.Model.ValueTypes;
using MongoDB.Bson.Serialization.Attributes;

namespace Frames.Engine.Persistence;

public interface ISnapshotManager
{
    Task SaveSnapshotAsync(string checkpoint, SimulatorSnapshotObject snapshot, string actorName, Type stateType);
    Task SaveSnapshotAsync(string checkpoint, CoordinatorSnapshotObject snapshot, string actorName);
    Task<CoordinatorSnapshotObject?> GetSnapshotCoordinatorAsync(string key, string actorName);
    Task<SimulatorSnapshotObject?> GetSnapshotSimulatorAsync(string key, string actorName, Type type);
}

public class SnapshotManager : ISnapshotManager
{
    public SnapshotManager(IDatabaseManager databaseManager)
    {
        DatabaseManager = databaseManager;
    }

    public IDatabaseManager DatabaseManager { get; set; }


    public async Task SaveSnapshotAsync(string checkpoint, SimulatorSnapshotObject snapshot, string actorName,
        Type stateType)
    {
        var options = new JsonSerializerOptions();
        options.Converters.Add(new IStateJsonConverter(stateType));
        var serialized = System.Text.Json.JsonSerializer.Serialize(snapshot, options);

        var entry = new SnapshotWithMetadata()
        {
            SerializedSnapshot = serialized,
            Timestamp = DateTime.UtcNow,
            CheckpointName = $"{checkpoint}",
            ActorName = actorName,
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
            ActorName = actorName,
        };
        // Save the serialized snapshot to a persistent store
        await DatabaseManager.PersistAsync(entry);
    }

    public async Task<CoordinatorSnapshotObject?> GetSnapshotCoordinatorAsync(string key, string actor)
    {
        var entry = await DatabaseManager.RetrieveEntry(key, actor);
        var snapshot = System.Text.Json.JsonSerializer.Deserialize<CoordinatorSnapshotObject>(entry.SerializedSnapshot);
        return snapshot;
    }

    public async Task<SimulatorSnapshotObject?> GetSnapshotSimulatorAsync(string key, string actor, Type type)
    {
        var entry = await DatabaseManager.RetrieveEntry(key, actor);

        var options = new JsonSerializerOptions();
        options.Converters.Add(new IStateJsonConverter(type));

        var snapshot =
            System.Text.Json.JsonSerializer.Deserialize<SimulatorSnapshotObject>(entry.SerializedSnapshot, options);
         return snapshot;
    }
}

public record SimulatorSnapshotObject
{
    public required TimeUnit TimeNext { get; init; }
    public required TimeUnit TimeLast { get; init; }
    public required TimeUnit TimeElapsed { get; init; }
    public required IState AtomicModelState { get; init; }
}

public record CoordinatorSnapshotObject
{
    public required TimeUnit TimeNext { get; init; }
    public required TimeUnit TimeLast { get; init; }
    public required Dictionary<string, TimeEventTuple> EventList { get; init; }
}

[BsonIgnoreExtraElements]
public sealed class SnapshotWithMetadata
{
    public required string SerializedSnapshot { get; init; }
    public required DateTime Timestamp { get; init; }
    public required string CheckpointName { get; init; }
    public required string ActorName { get; init; }
}