import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class ExecutionSignalRService {
  private connection?: HubConnection;
  logs: WritableSignal<string[]>  = signal<string[]>([]);
  private currentEndpoint: string | null = null;

  connect(endpoint: string) {
    this.disconnect();
    this.currentEndpoint = endpoint;
    const url = this.makeTracingHubUrl(endpoint);
    this.connection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    this.connection.on('TraceEvent', (message: string) => {
      this.logs.update(logs => [...logs, message]);
    });
    this.connection.start().catch(err => {
      this.logs.update(logs => [...logs, '[SignalR] Connection error: ' + err]);
    });
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.connection = undefined;
    }
    this.logs.set([]);
    this.currentEndpoint = null;
  }

  private makeTracingHubUrl(endpoint: string): string {
    // Ensure trailing slash and append tracingHub
    return endpoint.replace(/\/?$/, '') + '/tracingHub';
  }
}
