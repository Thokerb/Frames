import {Component, inject} from '@angular/core';
import { computed, signal } from '@angular/core';
import {TableModule} from 'primeng/table';
import {MetricsSignalRService, EndpointStatus} from '../../Signalr/metrics-signalr.service';
import {DecimalPipe, JsonPipe, DatePipe} from '@angular/common';
import {EndpointManagerService} from '../../app/services/endpoint-manager.service';
import {FormsModule} from '@angular/forms';
import {ClusterConsole} from '../cluster-console/cluster-console';

@Component({
  selector: 'app-metrics-table',
  imports: [
    TableModule,
    JsonPipe,
    DecimalPipe,
    DatePipe,
    FormsModule,
    ClusterConsole
  ],
  templateUrl: './metrics-table.html',
  styleUrl: './metrics-table.css'
})
export class MetricsTable {
  private readonly service: MetricsSignalRService = inject(MetricsSignalRService);
  private readonly endpointManager: EndpointManagerService = inject(EndpointManagerService);
  
  readonly metrics = computed(() => this.service.metrics());
  readonly endpointStatuses = computed(() => this.service.endpointStatuses());
  readonly endpoints = computed(() => this.endpointManager.endpoints());

  // Track which rows are expanded
  readonly expandedRows = signal<Set<string>>(new Set());

  // Computed property to show all endpoints with their data or "no connection" status
  readonly displayData = computed(() => {
    const statuses = this.endpointStatuses();
    const metrics = this.metrics();
    
    return statuses.map(status => {
      const metric = metrics.find(m => m.monitoringUrl === status.url);
      
      if (metric) {
        return {
          ...metric,
          connected: true,
          lastSeen: status.lastSeen
        };
      } else {
        return {
          monitoringUrl: status.url,
          address: {
            host: new URL(status.url).hostname,
            port: parseInt(new URL(status.url).port) || 80,
            system: 'Unknown'
          },
          usedMemoryMb: 0,
          availableMemoryMb: 0,
          cpuUsagePercent: 0,
          numberProcessors: 0,
          processUsage: 0,
          connected: false,
          lastSeen: status.lastSeen
        };
      }
    });
  });

  // Form control for adding new endpoints
  newEndpointUrl = signal('');

  addEndpoint(): void {
    const url = this.newEndpointUrl();
    if (url.trim()) {
      this.endpointManager.addEndpoint(url);
      this.newEndpointUrl.set('');
    }
  }

  removeEndpoint(url: string): void {
    this.endpointManager.removeEndpoint(url);
  }

  resetToDefaults(): void {
    this.endpointManager.resetToDefaults();
  }

  toggleRowExpansion(url: string): void {
    this.expandedRows.update(expanded => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(url)) {
        newExpanded.delete(url);
      } else {
        newExpanded.add(url);
      }
      return newExpanded;
    });
  }

  isRowExpanded(url: string): boolean {
    return this.expandedRows().has(url);
  }
}
