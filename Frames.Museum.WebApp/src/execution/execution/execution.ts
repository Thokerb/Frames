import {Component, effect, OnDestroy, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EndpointManagerService } from '../../app/services/endpoint-manager.service';
import { ExecutionSignalRService } from '../../Signalr/execution-signalr.service';
import { NgForOf, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import {SignalStoreService} from '../../app/services/signal-store.service';
import {ApiService} from '../../app/services/api.service';

@Component({
  selector: 'app-execution',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf, ButtonModule, SelectModule, InputTextModule, InputNumberModule, CheckboxModule],
  templateUrl: './execution.html',
  styleUrl: './execution.css',
  providers: [ExecutionSignalRService]
})
export class Execution implements OnDestroy {
  endpoints;
  selectedEndpoint = signal<string | null>(null);
  logs;

  // Form controls for API calls
  timeUnits = signal<number>(100);
  timeInMilliseconds = signal<number>(1000);
  asFastAsPossible = signal<boolean>(false);
  stopAfterTimeUnits = signal<number>(50);

  constructor(
    public endpointManager: EndpointManagerService,
    private signalr: ExecutionSignalRService,
    public signalStore: SignalStoreService,
    private apiService: ApiService
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

  onCommunicationEndpointChange(endpoint: string): void {
    this.signalStore.setCommunicationEndpoint(endpoint);
  }

  clearLogs() {
    this.signalr.logs.set([]);
  }

  // API call methods
  addAndStartModel(): void {
    const state = this.signalStore.state();
    if (!state.runId || !state.generatedCode) {
      alert('Please create a model first in the Model Creation page');
      return;
    }

    try {
      const reelJson = JSON.parse(state.generatedCode);
      this.apiService.addAndStartModel({
        reelJson: reelJson,
        coupledModelName: state.modelName || 'default',
        atomicModelName: state.modelName || 'default',
        timeUnits: this.timeUnits()
      }).subscribe({
        next: (response) => {
          console.log('Model added and started:', response);
          this.signalStore.setRunId(response.modelId);
          alert(`Model added and started! Model ID: ${response.modelId}`);
        },
        error: (error) => {
          console.error('Error adding and starting model:', error);
          alert('Error: ' + error.message);
        }
      });
    } catch (error) {
      alert('Error parsing generated code');
    }
  }

  setExecutionSpeed(): void {
    const state = this.signalStore.state();
    if (!state.runId) {
      alert('Please create a model first');
      return;
    }

    this.apiService.setExecutionSpeed({
      modelId: state.runId,
      timeInMilliseconds: this.timeInMilliseconds(),
      asFastAsPossible: this.asFastAsPossible()
    }).subscribe({
      next: (response) => {
        console.log('Execution speed set:', response);
        alert('Execution speed set successfully');
      },
      error: (error) => {
        console.error('Error setting execution speed:', error);
        alert('Error: ' + error.message);
      }
    });
  }

  setStopAfterTime(): void {
    const state = this.signalStore.state();
    if (!state.runId) {
      alert('Please create a model first');
      return;
    }

    this.apiService.setStopAfterTime({
      modelId: state.runId,
      timeUnits: this.stopAfterTimeUnits()
    }).subscribe({
      next: (response) => {
        console.log('Stop after time set:', response);
        alert('Stop after time set successfully');
      },
      error: (error) => {
        console.error('Error setting stop after time:', error);
        alert('Error: ' + error.message);
      }
    });
  }

  startSimulation(): void {
    const state = this.signalStore.state();
    if (!state.runId) {
      alert('Please create a model first');
      return;
    }

    this.apiService.startSimulation({
      modelId: state.runId
    }).subscribe({
      next: (response) => {
        console.log('Simulation started:', response);
        alert('Simulation started successfully');
      },
      error: (error) => {
        console.error('Error starting simulation:', error);
        alert('Error: ' + error.message);
      }
    });
  }

  stopSimulation(): void {
    const state = this.signalStore.state();
    if (!state.runId) {
      alert('Please create a model first');
      return;
    }

    this.apiService.stopSimulation({
      modelId: state.runId
    }).subscribe({
      next: (response) => {
        console.log('Simulation stopped:', response);
        alert('Simulation stopped successfully');
      },
      error: (error) => {
        console.error('Error stopping simulation:', error);
        alert('Error: ' + error.message);
      }
    });
  }

  // Test endpoints
  testHelloWorld(): void {
    this.apiService.getHelloWorld().subscribe({
      next: (response) => {
        console.log('Hello World response:', response);
        alert('Hello World: ' + response);
      },
      error: (error) => {
        console.error('Error calling Hello World:', error);
        alert('Error: ' + error.message);
      }
    });
  }

  testCArena(): void {
    this.apiService.getCArenaTest().subscribe({
      next: (response) => {
        console.log('CArena test response:', response);
        alert('CArena test completed');
      },
      error: (error) => {
        console.error('Error calling CArena test:', error);
        alert('Error: ' + error.message);
      }
    });
  }

  testReel(): void {
    this.apiService.getReelTest().subscribe({
      next: (response) => {
        console.log('Reel test response:', response);
        alert('Reel test completed');
      },
      error: (error) => {
        console.error('Error calling Reel test:', error);
        alert('Error: ' + error.message);
      }
    });
  }

  ngOnDestroy(): void {
    this.signalr.disconnect();
  }
}
