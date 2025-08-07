import {Component, effect, OnDestroy, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EndpointManagerService } from '../../app/services/endpoint-manager.service';
import { ExecutionSignalRService } from '../../Signalr/execution-signalr.service';
import { NgForOf, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-execution',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf,  ButtonModule, Select],
  templateUrl: './execution.html',
  styleUrl: './execution.css',
  providers: [ExecutionSignalRService]
})
export class Execution implements OnDestroy {
  endpoints;
  selectedEndpoint = signal<string | null>(null);
  logs;

  constructor(
    private endpointManager: EndpointManagerService,
    private signalr: ExecutionSignalRService
  ) {
    this.endpoints = this.endpointManager.endpoints;
    this.logs = this.signalr.logs;
    effect(() => {
      const endpoint = this.selectedEndpoint();
      if (endpoint) {
        this.signalr.connect(endpoint);
      } else {
        this.signalr.disconnect();
      }
    });
  }

  onEndpointChange(endpoint: string) {
    this.selectedEndpoint.set(endpoint);
  }

  clearLogs() {
    this.signalr.logs.set([]);
  }

  ngOnDestroy(): void {
    this.signalr.disconnect();
  }
}
