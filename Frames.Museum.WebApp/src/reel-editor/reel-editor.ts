import {Component, OnInit, WritableSignal, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {executeClassic} from '../reel/setupClassic';
import {MonacoEditorLanguageClientWrapper} from 'monaco-editor-wrapper';
import {MonacoLanguageClient} from 'monaco-languageclient';
import { Diagnostic } from 'vscode-languageserver/browser.js';
import {Button} from 'primeng/button';

type DocumentChange = { uri: string, content: string, diagnostics: Diagnostic[] };

@Component({
  selector: 'app-reel-editor',
  imports: [
    FormsModule,
    CommonModule,
    Button,
  ],
  templateUrl: './reel-editor.html',
  styleUrl: './reel-editor.css'
})
export class ReelEditor implements OnInit {

  private Wrapper?: MonacoEditorLanguageClientWrapper;
  private Client: MonacoLanguageClient | undefined;

  generatedCode: WritableSignal<string> =  signal<string>('');

  async ngOnInit(): Promise<void> {
    this.Wrapper = await executeClassic(document.getElementById('monaco-editor-root') as HTMLElement);
    this.Client = this.Wrapper!.getLanguageClient();

  }

  onClicK(){

    const resp = this.Wrapper?.getModel();

    let uri= {
      scheme: resp?.uri.scheme,
      authority: resp?.uri.authority,
      path: resp?.uri.path,
      query: resp?.uri.query,
      fragment: resp?.uri.fragment,
      _formatted: `file://${resp?.uri.path}`,
      _fsPath: null,
      fsPath: resp?.uri.fsPath
    }


    this.Client?.sendRequest("workspace/executeCommand", {
      command: "reel.generateJSON",
      arguments: [uri]
    }).then((result) => {
      console.log("Setting generated code:", result);
      this.generatedCode.set(result as string);
      console.log("Generated code after set:", this.generatedCode());
      console.log("Command executed successfully:", result);
    }).catch((error) => {
      console.error("Error executing command:", error);

    })
  }

  copyToClipboard(): void {
    const code = this.generatedCode();
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        console.log('Code copied to clipboard');
        // You could add a toast notification here
      }).catch((err) => {
        console.error('Failed to copy code: ', err);
      });
    }
  }

  sendRequest(): void {
    const code = this.generatedCode();
    if (code) {
      // Here you would implement the logic to send the generated code
      // This could be an HTTP request to your backend
      console.log('Sending request with code:', code);
      // Example: this.http.post('/api/execute', { code: code })
    }
  }

  formatJson(jsonString: string): string {
    try {
      // First try to parse as JSON and format it
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      // If it's not valid JSON, return the original string
      console.warn('Generated code is not valid JSON:', error);
      return jsonString;
    }
  }

}
