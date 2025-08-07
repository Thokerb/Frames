import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {executeClassic} from '../reel/setupClassic';

@Component({
  selector: 'app-reel-editor',
  imports: [
    FormsModule,
  ],
  templateUrl: './reel-editor.html',
  styleUrl: './reel-editor.css'
})
export class ReelEditor implements OnInit {

  ngOnInit(): void {
    executeClassic(document.getElementById('monaco-editor-root') as HTMLElement);
  }


  /**
   * Creates & returns a fresh worker using the MiniLogo language server
   */
  // getWorker() {
  //   const workerURL = new URL('reel-server-worker.js', window.location.href);
  //   return new Worker(workerURL.href, {
  //     type: 'module',
  //     name: 'reel'
  //   });
  //
  // }

}
