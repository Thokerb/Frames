// metrics-signalr.service.ts
import { Injectable, effect, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import {environment} from '../environments/environment';

export interface Metric {
  id: number;
  name: string;
  value: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetricsSignalRService {
  private connection: HubConnection;
  private readonly _metrics = signal<Metric[]>([]);

  readonly metrics = this._metrics.asReadonly();

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(environment.signalrUrl)
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on('metricsupdate', (metric: Array<Metric>) => {
      console.log(metric)
      this._metrics.update(metrics => [...metric]);
    });

    this.connection.start().catch(err => console.error('SignalR Connection Error:', err));
  }
}
