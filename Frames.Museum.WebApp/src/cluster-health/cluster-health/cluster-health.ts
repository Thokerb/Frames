import { Component, OnDestroy } from '@angular/core';
import { MetricsTable } from '../metrics-table/metrics-table';
import { MetricsSignalRService } from '../../Signalr/metrics-signalr.service';

@Component({
  selector: 'app-cluster-health',
  imports: [
    MetricsTable
  ],
  templateUrl: './cluster-health.html',
  styleUrl: './cluster-health.css'
})
export class ClusterHealth implements OnDestroy {
  constructor(private metricsSignalR: MetricsSignalRService) {}

  ngOnDestroy(): void {
    this.metricsSignalR.disconnectAll();
  }
}
