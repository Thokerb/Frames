// metrics-signalr.service.ts
import {Injectable, effect, signal} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {environment} from '../environments/environment';


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

@Injectable({
  providedIn: 'root'
})
export class MetricsSignalRService {
  private connections: Array<HubConnection> = [];
  private readonly _metrics = signal<Array<Metric & WithMonitoringUrl>>([]);
  readonly metrics = this._metrics.asReadonly();

  constructor() {
    for (const monitoringUrl of environment.monitoringUrls) {
      this.createConnectionWithRetry(monitoringUrl);
    }
  }

  private createConnectionWithRetry(monitoringUrl: string) {
    const connection = new HubConnectionBuilder()
      .withUrl(monitoringUrl)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect() // Optional: adds built-in limited retries
      .build();

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
    });

    const startConnection = () => {
      connection
        .start()
        .then(() => {
          console.log(`Connected to ${monitoringUrl}`);
        })
        .catch(err => {
          console.error(`Connection to ${monitoringUrl} failed. Retrying in 5 seconds...`, err);
          setTimeout(startConnection, 5000);
        });
    };

    // Handle connection closed (trigger retry)
    connection.onclose(() => {
      console.warn(`Connection to ${monitoringUrl} closed. Reconnecting in 5 seconds...`);
      setTimeout(startConnection, 5000);
    });

    startConnection();
    this.connections.push(connection);
  }
}
