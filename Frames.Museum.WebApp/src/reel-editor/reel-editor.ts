import {Component, OnInit, WritableSignal, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {executeClassic} from '../reel/setupClassic';
import {MonacoEditorLanguageClientWrapper} from 'monaco-editor-wrapper';
import {MonacoLanguageClient} from 'monaco-languageclient';
import { Diagnostic } from 'vscode-languageserver/browser.js';
import {ButtonModule} from 'primeng/button';
import {SelectModule} from 'primeng/select';
import {SignalStoreService} from '../app/services/signal-store.service';
import {ApiService, AddModelRequest, AddModelRequestWithDuration} from '../app/services/api.service';
import {Textarea} from 'primeng/textarea';
import {InputNumber} from 'primeng/inputnumber';

type DocumentChange = { uri: string, content: string, diagnostics: Diagnostic[] };

@Component({
  selector: 'app-reel-editor',
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    SelectModule,
    Textarea,
    InputNumber,
  ],
  templateUrl: './reel-editor.html',
  styleUrl: './reel-editor.css'
})
export class ReelEditor implements OnInit {

  private Wrapper?: MonacoEditorLanguageClientWrapper;
  private Client: MonacoLanguageClient | undefined;

  generatedCode: WritableSignal<string> =  signal<string>('');
  selectedModel: WritableSignal<string> = signal<string>('');
  isDragOver = signal<boolean>(false);

  // Coupled models extracted from generated code

  atomicModels = signal<Array<{ label: string; value: string; type: 'atomic' }>>([]);
  coupledModels = signal<Array<{ label: string; value: string; type: 'coupled' }>>([]);
  allModels = () => [
    ...this.atomicModels(),
    ...this.coupledModels()
  ];
  constructor(
    private signalStore: SignalStoreService,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    this.Wrapper = await executeClassic(document.getElementById('monaco-editor-root') as HTMLElement);
    this.Client = this.Wrapper!.getLanguageClient();

  }

  onClicKParse(){
    const content = this.editorContent!;
    this.generatedCode.set(content);
    this.signalStore.setGeneratedCode(content);
    this.extractModels(content);

    let coupled = this.allModels().find(x => x.type === 'coupled');
    this.selectedModel.set(coupled!.value)
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
      this.extractModels(result as string);
    }).catch((error) => {
      console.error("Error executing command:", error);

    })
  }

  extractModels(jsonString: string): void {
    try {
      const parsed = JSON.parse(jsonString);

      const atomic = Array.isArray(parsed.atomicModels)
        ? parsed.atomicModels.map((model: any) => ({
          label: `[Atomic] ${model.name || 'Unnamed'}`,
          value: model.name || 'unnamed',
          type: 'atomic' as const
        }))
        : [];

      const coupled = Array.isArray(parsed.coupledModels)
        ? parsed.coupledModels.map((model: any) => ({
          label: `[Coupled] ${model.name || 'Unnamed'}`,
          value: model.name || 'unnamed',
          type: 'coupled' as const
        }))
        : [];

      this.atomicModels.set(atomic);
      this.coupledModels.set(coupled);

      console.log('Extracted atomic models:', atomic);
      console.log('Extracted coupled models:', coupled);
    } catch (error) {
      console.error('Error extracting models:', error);
      this.atomicModels.set([]);
      this.coupledModels.set([]);
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

    // Find which type this model is
    const selectedEntry = this.allModels().find(m => m.value === selectedModelValue);

    if (code && selectedEntry) {
      try {
        const reelJson = JSON.parse(code);
        const request: AddModelRequestWithDuration = {
          reelJson: reelJson,
          timeUnits: this.editorTime
        };

        if (selectedEntry.type === 'atomic') {
          request.atomicModelName = selectedEntry.value;
        } else if (selectedEntry.type === 'coupled') {
          request.coupledModelName = selectedEntry.value;
        }

        this.apiService.addAndStartModel(request).subscribe({
          next: (response) => {
            console.log('Model added successfully:', response);
            this.signalStore.setRunId(response.modelId);
            this.signalStore.setModelName(selectedEntry.value);
            this.signalStore.setGeneratedCode(code);
            alert(`Model added successfully! Model ID: ${response.modelId}`);
          },
          error: (error) => {
            console.error('Error adding model:', error);
            alert('Error adding model: ' + error.message);
          }
        });
      } catch (error) {
        console.error('Error parsing generated code:', error);
        alert('Error parsing generated code. Please ensure it is valid JSON.');
      }
    } else {
      alert('Please select a model before sending request');
    }
  }

  // Drag and drop methods
  editorContent?: string;
  editorTime = 500;
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        this.readJsonFile(file);
      } else {
        alert('Please drop a JSON file');
      }
    }
  }

  private readJsonFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const jsonData = JSON.parse(content);
        this.generatedCode.set(content);
        this.signalStore.setGeneratedCode(content);
        this.extractModels(content);
        console.log('JSON file loaded successfully');
      } catch (error) {
        console.error('Error reading JSON file:', error);
        alert('Error reading JSON file. Please ensure it is valid JSON.');
      }
    };
    reader.readAsText(file);
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
