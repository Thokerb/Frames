import { Injectable, signal, WritableSignal } from '@angular/core';

export interface GlobalState {
  runId: string | null;
  modelName: string | null;
  generatedCode: string | null;
  selectedEndpoint: string | null;
  communicationEndpoint: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SignalStoreService {
  private _state: WritableSignal<GlobalState> = signal({
    runId: null,
    modelName: null,
    generatedCode: null,
    selectedEndpoint: null,
    communicationEndpoint: null
  });

  public state = this._state.asReadonly();

  setRunId(runId: string): void {
    this._state.update(state => ({ ...state, runId }));
  }

  setModelName(modelName: string): void {
    this._state.update(state => ({ ...state, modelName }));
  }

  setGeneratedCode(code: string): void {
    this._state.update(state => ({ ...state, generatedCode: code }));
  }

  setSelectedEndpoint(endpoint: string): void {
    this._state.update(state => ({ ...state, selectedEndpoint: endpoint }));
  }

  setCommunicationEndpoint(endpoint: string): void {
    this._state.update(state => ({ ...state, communicationEndpoint: endpoint }));
  }

  clearState(): void {
    this._state.set({
      runId: null,
      modelName: null,
      generatedCode: null,
      selectedEndpoint: null,
      communicationEndpoint: null
    });
  }
}
