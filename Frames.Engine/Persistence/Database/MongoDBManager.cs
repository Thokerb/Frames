using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Serilog;

namespace Frames.Engine.Persistence.Database;

public class MongoDBManager : IDatabaseManager
{

    public MongoDBManager(IConfiguration configuration)
    {
        Client = new MongoClient(configuration.GetConnectionString("MongoDB"));
        DatabaseName = configuration.GetValue<string>("MongoDB:DatabaseName") ?? "Frames";
        DatabaseName = string.IsNullOrEmpty(DatabaseName) ? "Frames" : DatabaseName;
    }

    public string DatabaseName { get; set; }

    private MongoClient Client { get; set; }


    public async Task PersistAsync(SnapshotWithMetadata snapshot)
    {
        // Implement MongoDB persistence logic here
        var database = Client.GetDatabase(DatabaseName);
        // TODO: make collection name configurable
        var collection = database.GetCollection<SnapshotWithMetadata>("snapshots");
        var filter = Builders<SnapshotWithMetadata>.Filter.Eq(s => s.CheckpointName, snapshot.CheckpointName) &
                     Builders<SnapshotWithMetadata>.Filter.Eq(s => s.ActorName, snapshot.ActorName);
        var update = Builders<SnapshotWithMetadata>.Update
            .Set(s => s.SerializedSnapshot, snapshot.SerializedSnapshot)
            .Set(s => s.Timestamp, snapshot.Timestamp)
            .Set(s => s.CheckpointName, snapshot.CheckpointName)
            .Set(s => s.ActorName, snapshot.ActorName);
        var options = new UpdateOptions { IsUpsert = true };
        var res = await collection.UpdateOneAsync(filter, update, options);
        Log.Information("MongoDBManager: Persisted snapshot with key {Key} and result {Result} for actor {Actor}", snapshot.CheckpointName, res, snapshot.ActorName);
    }

    public async Task<SnapshotWithMetadata> RetrieveEntry(string key,string actor)
    {
        var database = Client.GetDatabase(DatabaseName);
        var collection = database.GetCollection<SnapshotWithMetadata>("snapshots");
        var filter = Builders<SnapshotWithMetadata>.Filter
            .Eq(s => s.CheckpointName, key) & 
                     Builders<SnapshotWithMetadata>.Filter.Eq(s => s.ActorName, actor);
        var result = await collection.FindAsync(filter);
        var snapshot = await result.FirstOrDefaultAsync();
        if (snapshot == null)
        {
            throw new KeyNotFoundException($"Snapshot with key {key} not found.");
        }
        return snapshot;
    }
}