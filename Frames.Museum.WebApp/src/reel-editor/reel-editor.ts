import {Component, OnInit, WritableSignal, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
      this.generatedCode.set(result as string)
      console.log("Command executed successfully:", result);
    }).catch((error) => {
      console.error("Error executing command:", error);

    })
  }






}
