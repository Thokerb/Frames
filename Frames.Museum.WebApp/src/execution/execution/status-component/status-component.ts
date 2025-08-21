import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import {ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {SignalStoreService} from '../../../app/services/signal-store.service';



interface SimulationStatus {
  checkpoints: { [key: string]: string };
  currentTime: TimeUnit;
  isRunning: boolean;
  completionType: number;
  manualStop: boolean;
  stopConditionReached: boolean;
  childrenName: string;
  isCompleted: boolean;
  timeUnitInMilliseconds: number;
  timeUntilShutdown: TimeUnit;
  isLoadingCheckpoint: boolean;
  manualPause: boolean;
  timeNext: TimeUnit;
  id: string;
  lastTime: TimeUnit;
  checkpointName: string;
  listeningActors: string[];
}

interface TimeUnit {
  value: number;
  isInfinity: boolean;
}

interface CheckpointInfo {
  name: string;
  time: string;
}

@Component({
  selector: 'app-status-component',
  imports: [
    ButtonDirective,
    FormsModule,
    InputNumber,
    InputText,
    NgForOf,
    NgIf
  ],
  providers: [MessageService],
  templateUrl: './status-component.html',
  styleUrl: './status-component.css'
})
export class StatusComponent {
  simulationStatus: SimulationStatus | undefined = undefined;
  checkpointName: string = '';
  checkpointTime: number | null = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    public signalStore: SignalStoreService
  ) {}

  async fetchStatus() {
    if (!this.signalStore.state().runId) {
      return;
    }

    try {
      this.simulationStatus = await this.http.post<SimulationStatus>(`${this.getCurrentBaseUrl()}/get-status`, {
        modelId: this.signalStore.state().runId
      }).toPromise();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to fetch status'
      });
    }
  }

  private getCurrentBaseUrl(): string {
    const communicationEndpoint = this.signalStore.state().communicationEndpoint;
    return communicationEndpoint ?? '';
  }

  getCheckpoints(): CheckpointInfo[] {
    if (!this.simulationStatus?.checkpoints) return [];

    return Object.entries(this.simulationStatus.checkpoints).map(([time, name]) => ({
      time,
      name
    }));
  }

  async addCheckpoint() {
    if (!this.checkpointName || this.checkpointTime === null) {
      return;
    }

    try {
      const response = await this.http.post<{ modelId: string, message: string }>(`${this.getCurrentBaseUrl()}/add-checkpoint`, {
        checkpointName: this.checkpointName,
        modelId: this.signalStore.state().runId!,
        timeUnit: this.checkpointTime,

      }).toPromise();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response?.message
      });

      // Reset inputs and refresh status
      this.checkpointName = '';
      this.checkpointTime = null;
      await this.fetchStatus();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to add checkpoint'
      });
    }
  }

  async removeCheckpoint(checkpointName: string) {
    try {
      const response = await this.http.post<{ modelId: string, message: string }>(`${this.getCurrentBaseUrl()}/remove-checkpoint`, {
        checkpointName,
        modelId: this.signalStore.state().runId!
      }).toPromise();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response?.message
      });

      // Refresh status after removing checkpoint
      await this.fetchStatus();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to remove checkpoint'
      });
    }
  }
}
