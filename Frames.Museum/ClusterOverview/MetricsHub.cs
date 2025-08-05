using Microsoft.AspNetCore.SignalR;

namespace Frames.Museum.ClusterOverview;

public class MetricsHub : Hub
{

}

public class ClusterHub : Hub
{
    // Optionally expose server-invokable methods here (e.g. request full cluster state).
}