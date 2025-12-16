using Dapper;
using Microsoft.Data.SqlClient;

namespace Frames.Museum.Util;

public static class DatabaseCleanup
{

    public static async Task DeleteJournalEntries(string connectionString, Guid id)
    {
        using (var db = new SqlConnection(connectionString))
        {
            await db.OpenAsync();
            
            Thread.Sleep(3 * 1000); // wait for 3 seconds to ensure all messages are written

            string sql = $"DELETE FROM journal WHERE persistence_id LIKE '%-{id}'";

            int rows = await db.ExecuteAsync(sql);
            
            Serilog.Log.Information($"Deleted {rows} journal entries");
            
            await db.CloseAsync();
        }
    }

    public static async Task DeleteSnapshots(string connectionString, Guid id)
    {
        using (var db = new SqlConnection(connectionString))
        {
            await db.OpenAsync();
            
            Thread.Sleep(3 * 1000); // wait for 3 seconds to ensure all messages are written

            string sql = $"DELETE FROM snapshot WHERE persistence_id LIKE '%-{id}'";

            int rows = await db.ExecuteAsync(sql);
            
            Serilog.Log.Information($"Deleted {rows} snapshot entries");
            
            await db.CloseAsync();
        }    }
}