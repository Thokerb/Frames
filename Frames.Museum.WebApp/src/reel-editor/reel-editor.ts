import {Component, OnInit, WritableSignal, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {executeClassic} from '../reel/setupClassic';
import {MonacoEditorLanguageClientWrapper} from 'monaco-editor-wrapper';
import {MonacoLanguageClient} from 'monaco-languageclient';
import { Diagnostic } from 'vscode-languageserver/browser.js';
import {Button} from 'primeng/button';
import {Select} from 'primeng/select';

type DocumentChange = { uri: string, content: string, diagnostics: Diagnostic[] };

@Component({
  selector: 'app-reel-editor',
  imports: [
    FormsModule,
    CommonModule,
    Button,
    Select,
  ],
  templateUrl: './reel-editor.html',
  styleUrl: './reel-editor.css'
})
export class ReelEditor implements OnInit {

  private Wrapper?: MonacoEditorLanguageClientWrapper;
  private Client: MonacoLanguageClient | undefined;

  generatedCode: WritableSignal<string> =  signal<string>('');
  selectedModel: WritableSignal<string> = signal<string>('');

  // Coupled models extracted from generated code
  coupledModels = signal<Array<{label: string, value: string}>>([

  ]);

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

      // Extract coupled models from the generated code
      this.extractCoupledModels(result as string);
    }).catch((error) => {
      console.error("Error executing command:", error);

    })
  }

  extractCoupledModels(jsonString: string): void {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.coupledModels && Array.isArray(parsed.coupledModels)) {
        const models = [
          ...parsed.coupledModels.map((model: any) => ({
            label: model.name || 'Unnamed Model',
            value: model.name || 'unnamed'
          }))
        ];
        this.coupledModels.set(models);
        console.log('Extracted coupled models:', models);
      } else {
        // Reset to default if no coupled models found
        this.coupledModels.set([{ label: 'Select a model', value: '' }]);
        console.log('No coupled models found in generated code');
      }
    } catch (error) {
      console.error('Error extracting coupled models:', error);
      this.coupledModels.set([{ label: 'Select a model', value: '' }]);
    }
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
    const selectedModelValue = this.selectedModel();

    if (code && selectedModelValue) {
      // Here you would implement the logic to send the generated code
      // This could be an HTTP request to your backend
      console.log('Sending request with code:', code);
      console.log('Selected model:', selectedModelValue);
      // Example: this.http.post('/api/execute', { code: code, model: selectedModelValue })
    } else if (!selectedModelValue) {
      console.warn('Please select a model before sending request');
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

  setSampleCode() {
    // Fetch the sample content from the external file
    fetch(new URL('../../../public/sample.reel', import.meta.url).toString())
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(sampleContent => {
        // Set the content in the Monaco editor
        if (this.Wrapper) {
          const model = this.Wrapper.getModel();
          if (model) {
            model.setValue(sampleContent);
            console.log('Sample code loaded into editor from external file');
          } else {
            console.error('Editor model not available');
          }
        } else {
          console.error('Editor wrapper not initialized');
        }
      })
      .catch(error => {
        console.error('Error loading sample file:', error);
        // Fallback to hardcoded content if file loading fails
        this.setSampleCodeFallback();
      });
  }

  private setSampleCodeFallback() {
    const sampleContent = `state BlinkingLightStateBR {
    states: [On|Off|FinishedByItself|FinishedByOther|TransitionFinishedByItself];
    initial = On;
    int MaxCycles = 0;
    int CurrentCycle = 0;
    int WaitingTime = 2;
}

atomic2 model BlinkingLightAtomicModelBR {
    state: BlinkingLightStateBR {
        initial = On;
        MaxCycles = 0;
        CurrentCycle = 0;
        WaitingTime = 2;
    }

    section Ports {
        int InPort PortInFinishedByOther;
        int OutPort PortOutFinished;
    }

    stateDefinition On: {
        time-advance: 2 TimeUnits
        transitions: {
            (toTransitionFinishedByItself) with CurrentCycle >= MaxCycles => {
                state.name becomes TransitionFinishedByItself;
            }
            (toOff) => {
                state.name becomes Off;
                CurrentCycle = CurrentCycle + 1;
            }
            (externalToOff) with InPort PortInFinishedByOther.any => {
                state.name becomes Off;
            }
        }
        output: {}
    }
    stateDefinition Off: {
        time-advance: WaitingTime TimeUnits
        transitions: {
            (toOn) => {
                state.name becomes On;
            }
            (externalToOff) with InPort PortInFinishedByOther.any => {
                state.name becomes Off;
            }

        }
        output: {}
    }
    stateDefinition TransitionFinishedByItself: {
        time-advance: 1 TimeUnits
        transitions: {
            (toFinishedByItself) => {
                state.name becomes FinishedByItself;
            }
        }
        output: {}
    }

    stateDefinition FinishedByItself: {
        time-advance: Infinity TimeUnits
        transitions: {}
        output: {
            PortOutFinished: MaxCycles;
        }
    }

    stateDefinition FinishedByOther: {
        time-advance: Infinity TimeUnits
        transitions: {}
        output: {}
    }
}

coupled model CArena {

    section Ports {
        int InPort InArena;
        int OutPort OutArena;
    }

    BlinkingLightAtomicModelBR bl1 with BlinkingLightStateBR {
        initial = On;
        MaxCycles = 5;
        WaitingTime = 3;
    }

    BlinkingLightAtomicModelBR bl2 with BlinkingLightStateBR {
        initial = On;
        MaxCycles = 20;
        WaitingTime = 5;
    }

    Connect bl1.PortOutFinished to bl2.PortInFinishedByOther
    Connect bl2.PortOutFinished to bl1.PortInFinishedByOther

    Connect bl1.PortOutFinished to this.OutArena
    Connect bl2.PortOutFinished to this.OutArena

    Connect this.InArena to bl1.PortInFinishedByOther
    Connect this.InArena to bl2.PortInFinishedByOther
}`;

    // Set the content in the Monaco editor
    if (this.Wrapper) {
      const model = this.Wrapper.getModel();
      if (model) {
        model.setValue(sampleContent);
        console.log('Sample code loaded into editor (fallback)');
      } else {
        console.error('Editor model not available');
      }
    } else {
      console.error('Editor wrapper not initialized');
    }
  }
}
