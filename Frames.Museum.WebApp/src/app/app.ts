import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Card],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frames.Museum.WebApp');
}
