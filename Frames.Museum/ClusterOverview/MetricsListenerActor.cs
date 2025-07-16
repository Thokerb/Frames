using Akka.Actor;
using Akka.Cluster;
using Akka.Cluster.Metrics;
using Akka.Cluster.Metrics.Events;
using Akka.Cluster.Metrics.Serialization;
using Akka.Event;
using Akka.Util;
using Microsoft.AspNetCore.SignalR;

namespace Frames.Museum.ClusterOverview;
public class MetricsListenerActor : ReceiveActor
{
    private IHubContext<MetricsHub> HubContext { get; }
    private readonly ILoggingAdapter _log = Context.GetLogger();
    private readonly Cluster _cluster = Cluster.Get(Context.System);
    private readonly ClusterMetrics _metricsExtension = ClusterMetrics.Get(Context.System);

    public MetricsListenerActor(IHubContext<MetricsHub> hubContext)
    {
        HubContext = hubContext;

        ReceiveAsync<ClusterMetricsChanged>(async clusterMetrics =>
        {
            foreach (var nodeMetrics in clusterMetrics.NodeMetrics)
            {
                if (nodeMetrics.Address.Equals(_cluster.SelfAddress))
                {
                    var memInfo = GetMemoryUsageMb(nodeMetrics);
                    var cpuInfo = GetCpuUsagePercent(nodeMetrics);

                    // Send data to SignalR
                    await HubContext.Clients.All.SendAsync("metricsUpdate", new[]
                    {
                        new {
                            id = 1,
                            name = "memoryUsage",
                            value = memInfo,
                            timestamp = DateTime.UtcNow.ToString("o")
                        },
                        new {
                            id = 2,
                            name = "cpuUsage",
                            value = cpuInfo,
                            timestamp = DateTime.UtcNow.ToString("o")
                        }
                    });
                }
            }
        });
    }

    protected override void PreStart()
    {
        base.PreStart();
        _metricsExtension.Subscribe(Self);
    }

    protected override void PostStop()
    {
        base.PostStop();
        _metricsExtension.Unsubscribe(Self);
    }

    private double? GetMemoryUsageMb(NodeMetrics nodeMetrics)
    {
        var memory = StandardMetrics.ExtractMemory(nodeMetrics);
        if (memory.HasValue)
        {
            var usedMb = memory.Value.Used / 1024.0 / 1024.0;
            _log.Info("Used memory: {0} Mb", usedMb);
            return usedMb;
        }

        return null;
    }

    private double? GetCpuUsagePercent(NodeMetrics nodeMetrics)
    {
        var cpu = StandardMetrics.ExtractCpu(nodeMetrics);
        if (cpu.HasValue)
        {
            var usagePercent = cpu.Value.TotalUsage / 100.0;
            _log.Info("Cpu load: {0}% ({1} processors)", usagePercent, cpu.Value.ProcessorsNumber);
            return usagePercent;
        }

        return null;
    }

}
