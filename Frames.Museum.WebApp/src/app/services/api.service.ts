import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignalStoreService } from './signal-store.service';

export interface AddModelRequest {
  reelJson: any;
  coupledModelName?: string;
  atomicModelName?: string;
}

export interface AddModelRequestWithDuration {
  reelJson: any;
  coupledModelName?: string;
  atomicModelName?: string;
  timeUnits: number;
}

export interface ModelResponse {
  modelId: string;
  message: string;
}

export interface SpeedControlRequest {
  modelId: string;
  timeInMilliseconds: number;
  asFastAsPossible: boolean;
}

export interface SetStopAfterTimeRequest {
  modelId: string;
  timeUnits: number;
}

export interface SimulationRequest {
  modelId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private signalStore: SignalStoreService
  ) {}

  private getCurrentBaseUrl(): string {
    const communicationEndpoint = this.signalStore.state().communicationEndpoint;
    return communicationEndpoint || this.baseUrl;
  }

  // Hello World endpoints
  getHelloWorld(): Observable<string> {
    return this.http.get<string>(`${this.getCurrentBaseUrl()}/hello-world`);
  }

  getCArenaTest(): Observable<any> {
    return this.http.get(`${this.getCurrentBaseUrl()}/cArena-test`);
  }

  getReelTest(): Observable<any> {
    return this.http.get(`${this.getCurrentBaseUrl()}/reel-test`);
  }

  // Simulation Control endpoints
  addModel(request: AddModelRequest): Observable<ModelResponse> {
    return this.http.post<ModelResponse>(`${this.getCurrentBaseUrl()}/add-model`, request);
  }

  addAndStartModel(request: AddModelRequestWithDuration): Observable<ModelResponse> {
    return this.http.post<ModelResponse>(`${this.getCurrentBaseUrl()}/add-and-start-model`, request);
  }

  setExecutionSpeed(request: SpeedControlRequest): Observable<string> {
    return this.http.post<string>(`${this.getCurrentBaseUrl()}/set-execution-speed`, request);
  }

  setStopAfterTime(request: SetStopAfterTimeRequest): Observable<string> {
    return this.http.post<string>(`${this.getCurrentBaseUrl()}/set-stop-after-time`, request);
  }

  startSimulation(request: SimulationRequest): Observable<string> {
    return this.http.post<string>(`${this.getCurrentBaseUrl()}/start-simulation`, request);
  }

  stopSimulation(request: SimulationRequest): Observable<string> {
    return this.http.post<string>(`${this.getCurrentBaseUrl()}/stop-simulation`, request);
  }
}
