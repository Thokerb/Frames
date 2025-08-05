import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointManagerService {
  private readonly STORAGE_KEY = 'monitoring_endpoints';
  private readonly _endpoints = signal<string[]>([]);
  
  readonly endpoints = this._endpoints.asReadonly();

  constructor() {
    this.loadEndpoints();
  }

  private loadEndpoints(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const endpoints = JSON.parse(stored);
        this._endpoints.set(endpoints);
      } catch (error) {
        console.error('Failed to parse stored endpoints:', error);
        this.initializeWithDefaults();
      }
    } else {
      this.initializeWithDefaults();
    }
  }

  private initializeWithDefaults(): void {
    // Start with environment endpoints
    this._endpoints.set([...environment.monitoringUrls]);
    this.saveEndpoints();
  }

  private saveEndpoints(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._endpoints()));
  }

  addEndpoint(url: string): void {
    if (!url.trim()) return;
    
    const normalizedUrl = url.trim();
    if (!this._endpoints().includes(normalizedUrl)) {
      this._endpoints.update(endpoints => [...endpoints, normalizedUrl]);
      this.saveEndpoints();
    }
  }

  removeEndpoint(url: string): void {
    this._endpoints.update(endpoints => endpoints.filter(endpoint => endpoint !== url));
    this.saveEndpoints();
  }

  clearEndpoints(): void {
    this._endpoints.set([]);
    this.saveEndpoints();
  }

  resetToDefaults(): void {
    this.initializeWithDefaults();
  }
} 