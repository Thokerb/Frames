import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import Aura from '@primeuix/themes/aura';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';
import {PrimeNG} from 'primeng/config';
import {SignalStoreService} from './services/signal-store.service';
import {EndpointManagerService} from './services/endpoint-manager.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Menubar, ToggleSwitch, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frames.Museum.WebApp');
  primeNgConfig = inject(PrimeNG);
  isDarkMode = signal(false);

  constructor(
    public signalStore: SignalStoreService,
    public endpointManager: EndpointManagerService
  ) {
    this.primeNgConfig.theme.set({
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      },
    });
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
    this.isDarkMode.set(!this.isDarkMode());
  }

  items: MenuItem[] = [
    {
      label: 'Cluster Monitoring',
      icon: 'pi pi-palette',
      routerLink: 'cluster-health'
    },
    {
      label: 'Execution',
      icon: 'pi pi-terminal',
      routerLink: 'execution'
    },
    {
      label: 'Model Creation',
      icon: 'pi pi-plus',
      routerLink: 'creation'
    },
    {
      label: 'External',
      icon: 'pi pi-home',
      items: [
        {
          label: 'Angular',
          url: 'https://angular.io/'
        },
        {
          label: 'Vite.js',
          url: 'https://vitejs.dev/'
        }
      ]
    }
  ];

}
