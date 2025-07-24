import {Component, inject} from '@angular/core';
import { computed, signal } from '@angular/core';
import {TableModule} from 'primeng/table';
import {MetricsSignalRService} from '../../Signalr/metrics-signalr.service';
import {DecimalPipe, JsonPipe} from '@angular/common';
@Component({
  selector: 'app-metrics-table',
  imports: [
    TableModule,
    JsonPipe,
    DecimalPipe
  ],
  templateUrl: './metrics-table.html',
  styleUrl: './metrics-table.css'
})
export class MetricsTable {
  private readonly service: MetricsSignalRService = inject(MetricsSignalRService);
  readonly metrics = computed(() => this.service.metrics());
}
