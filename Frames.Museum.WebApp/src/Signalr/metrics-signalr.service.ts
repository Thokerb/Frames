// metrics-signalr.service.ts
import {Injectable, effect, signal} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {environment} from '../environments/environment';
import {EndpointManagerService} from '../app/services/endpoint-manager.service';
import {ClusterEventsService, ClusterMemberDto} from '../app/services/cluster-events.service';

export interface WithMonitoringUrl {
  monitoringUrl: string;
}

export interface Metric {
  address: MetricAddress;
  usedMemoryMb: number;
  availableMemoryMb: number;
  cpuUsagePercent: number;
  numberProcessors: number;
  processUsage: number;
}

export interface MetricAddress {
  host: string;
  port: number;
  system: string;
}

export interface EndpointStatus {
  url: string;
  connected: boolean;
  lastSeen?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MetricsSignalRService {
  private connections: Map<string, HubConnection> = new Map();
  private clusterConnections: Map<string, HubConnection> = new Map();
  private timeoutTimers: Map<string, number> = new Map();
  private readonly _metrics = signal<Array<Metric & WithMonitoringUrl>>([]);
  private readonly _endpointStatuses = signal<EndpointStatus[]>([]);
  
  readonly metrics = this._metrics.asReadonly();
  readonly endpointStatuses = this._endpointStatuses.asReadonly();

  constructor(
    private endpointManager: EndpointManagerService,
    private clusterEventsService: ClusterEventsService
  ) {
    // Watch for endpoint changes and update connections
    effect(() => {
      const endpoints = this.endpointManager.endpoints();
      this.updateConnections(endpoints);
    });
  }

  private updateConnections(endpoints: string[]): void {
    // Close connections that are no longer in the list
    for (const [url, connection] of this.connections.entries()) {
      if (!endpoints.includes(url)) {
        connection.stop();
        this.connections.delete(url);
        this.removeEndpointStatus(url);
        this.clearTimeout(url);
      }
    }

    // Close cluster connections that are no longer in the list
    for (const [url, connection] of this.clusterConnections.entries()) {
      if (!endpoints.includes(url)) {
        connection.stop();
        this.clusterConnections.delete(url);
      }
    }

    // Create new connections for endpoints not already connected
    for (const endpoint of endpoints) {
      if (!this.connections.has(endpoint)) {
        this.createMetricsConnection(endpoint);
        this.createClusterConnection(endpoint);
      }
    }

    // Update endpoint statuses to include all configured endpoints
    this._endpointStatuses.update(statuses => {
      const currentUrls = statuses.map(s => s.url);
      const newStatuses = [...statuses];
      
      for (const endpoint of endpoints) {
        if (!currentUrls.includes(endpoint)) {
          newStatuses.push({ url: endpoint, connected: false });
        }
      }
      
      return newStatuses.filter(status => endpoints.includes(status.url));
    });
  }

  private createMetricsConnection(monitoringUrl: string) {
    const connection = new HubConnectionBuilder()
      .withUrl(monitoringUrl)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    // Handle metrics updates
    connection.on('metricsupdate', (metric: Metric) => {
      this._metrics.update(metrics => {
        const existingIndex = metrics.findIndex(
          m => m.address.host === metric.address.host && m.address.port === metric.address.port
        );
        if (existingIndex !== -1) {
          metrics[existingIndex] = { ...metric, monitoringUrl };
        } else {
          metrics.push({ ...metric, monitoringUrl });
        }
        return [...metrics];
      });

      // Update endpoint status and reset timeout
      this.updateEndpointStatus(monitoringUrl, true);
      this.resetTimeout(monitoringUrl);
    });

    const startConnection = () => {
      connection
        .start()
        .then(() => {
          console.log(`Connected to metrics hub at ${monitoringUrl}`);
          this.updateEndpointStatus(monitoringUrl, true);
          this.resetTimeout(monitoringUrl);
        })
        .catch(err => {
          console.error(`Connection to metrics hub at ${monitoringUrl} failed. Retrying in 5 seconds...`, err);
          this.updateEndpointStatus(monitoringUrl, false);
          this.clearTimeout(monitoringUrl);
        });
    };

    // Handle connection closed (trigger retry)
    connection.onclose(() => {
      console.warn(`Metrics connection to ${monitoringUrl} closed. Reconnecting in 5 seconds...`);
      this.updateEndpointStatus(monitoringUrl, false);
      this.clearTimeout(monitoringUrl);
      setTimeout(startConnection, 5000);
    });

    startConnection();
    this.connections.set(monitoringUrl, connection);
  }

  private createClusterConnection(monitoringUrl: string) {
    // Create cluster hub URL by replacing the path with /clusterHub
    const url = new URL(monitoringUrl);
    const clusterHubUrl = `${url.protocol}//${url.host}/clusterHub`;
    
    const connection = new HubConnectionBuilder()
      .withUrl(clusterHubUrl)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    // Handle cluster events
    this.setupClusterEventHandlers(connection, monitoringUrl);

    const startConnection = () => {
      connection
        .start()
        .then(() => {
          console.log(`Connected to cluster hub at ${clusterHubUrl}`);
        })
        .catch(err => {
          console.error(`Connection to cluster hub at ${clusterHubUrl} failed. Retrying in 5 seconds...`, err);
          setTimeout(startConnection, 5000);
        });
    };

    // Handle connection closed (trigger retry)
    connection.onclose(() => {
      console.warn(`Cluster connection to ${clusterHubUrl} closed. Reconnecting in 5 seconds...`);
      setTimeout(startConnection, 5000);
    });

    startConnection();
    this.clusterConnections.set(monitoringUrl, connection);
  }

  private setupClusterEventHandlers(connection: HubConnection, monitoringUrl: string): void {
    // Cluster event types to listen for
    const eventTypes = [
      'MemberUp', 'MemberUnreachable', 'MemberReachable', 'MemberRemoved',
      'MemberJoined', 'MemberLeft', 'MemberExited', 'LeaderChanged',
      'RoleLeaderChanged', 'ClusterShuttingDown'
    ];

    eventTypes.forEach(eventType => {
      connection.on(eventType, (member: ClusterMemberDto) => {
        console.log(`Received ${eventType} event from ${monitoringUrl}:`, member);
        this.clusterEventsService.addEvent(monitoringUrl, eventType, member);
      });
    });
  }

  private updateEndpointStatus(url: string, connected: boolean): void {
    this._endpointStatuses.update(statuses => {
      const existingIndex = statuses.findIndex(s => s.url === url);
      const status: EndpointStatus = {
        url,
        connected,
        lastSeen: connected ? new Date() : statuses[existingIndex]?.lastSeen
      };

      if (existingIndex !== -1) {
        statuses[existingIndex] = status;
      } else {
        statuses.push(status);
      }
      
      return [...statuses];
    });
  }

  private resetTimeout(url: string): void {
    // Clear existing timeout
    this.clearTimeout(url);
    
    // Set new timeout for 10 seconds
    const timeout = setTimeout(() => {
      console.log(`No activity from ${url} for 10 seconds, marking as disconnected`);
      this.updateEndpointStatus(url, false);
      this.timeoutTimers.delete(url);
    }, 10000);
    
    this.timeoutTimers.set(url, timeout);
  }

  private clearTimeout(url: string): void {
    const timeout = this.timeoutTimers.get(url);
    if (timeout) {
      clearTimeout(timeout);
      this.timeoutTimers.delete(url);
    }
  }

  private removeEndpointStatus(url: string): void {
    this._endpointStatuses.update(statuses => 
      statuses.filter(s => s.url !== url)
    );
    this.clearTimeout(url);
  }
}
