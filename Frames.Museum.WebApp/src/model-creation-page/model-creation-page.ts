import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReelEditor} from '../reel-editor/reel-editor';
import {SignalStoreService} from '../app/services/signal-store.service';
import {EndpointManagerService} from '../app/services/endpoint-manager.service';

@Component({
  selector: 'app-model-creation-page',
  imports: [
    CommonModule,
    ReelEditor
  ],
  templateUrl: './model-creation-page.html',
  styleUrl: './model-creation-page.css'
})
export class ModelCreationPage {
  constructor(
    public signalStore: SignalStoreService,
    public endpointManager: EndpointManagerService
  ) {}

  onEndpointChange(endpoint: string): void {
    this.signalStore.setCommunicationEndpoint(endpoint);
  }
}
