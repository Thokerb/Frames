import { Component } from '@angular/core';
import {MetricsTable} from '../metrics-table/metrics-table';

@Component({
  selector: 'app-cluster-health',
  imports: [
    MetricsTable
  ],
  templateUrl: './cluster-health.html',
  styleUrl: './cluster-health.css'
})
export class ClusterHealth {

}
