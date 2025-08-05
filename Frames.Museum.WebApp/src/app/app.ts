import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import Aura from '@primeuix/themes/aura';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';
import {PrimeNG} from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar, ToggleSwitch, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frames.Museum.WebApp');
  primeNgConfig = inject(PrimeNG);
  isDarkMode = signal(false);

  constructor() {
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
