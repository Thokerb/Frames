# Frames.Museum.WebApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.

## Features

### Signal Store
- Global state management using Angular signals
- Stores runId, model name, generated code, selected endpoint, and communication endpoint
- Shared across all components

### Drag and Drop File Upload
- Drag and drop JSON files directly into the reel editor
- Automatic parsing and validation of JSON content
- Visual feedback during drag operations

### Model Creation Page
- Monaco editor for Reel code editing
- Generate JSON from Reel code
- Add models to the backend via API calls
- Display current model status (ID and name)

### Execution Control Panel
- Test endpoints (Hello World, CArena Test, Reel Test)
- Model control (Add & Start Model with time units)
- Simulation control (Start/Stop simulation, set execution speed, set stop time)
- SignalR log console for real-time monitoring
- Display global state information

### API Integration
- Full integration with backend API at `http://localhost:8080`
- Support for all endpoints from the OpenAPI specification
- Dynamic endpoint selection from cluster monitoring endpoints
- Communication endpoint displayed in header across all pages
- Error handling and user feedback

## Usage

1. **Select Communication Endpoint**: Choose the API endpoint from the dropdown in Model Creation or Execution pages
2. **Model Creation**: Navigate to the Model Creation page to write Reel code or upload JSON files
3. **Generate Code**: Use the "GENERATE" button to convert Reel code to JSON
4. **Add Model**: Select a model and click "SEND REQUEST" to add it to the backend
5. **Execution**: Go to the Execution page to control simulations and monitor logs
6. **Monitor**: The selected communication endpoint is displayed in the header across all pages

## Development

Run `npm start` to start the development server. Navigate to `http://localhost:4200/`.

## API Endpoints

The application integrates with the following backend endpoints:
- `/hello-world` - Test endpoint
- `/cArena-test` - CArena test endpoint  
- `/reel-test` - Reel test endpoint
- `/add-model` - Add a new model
- `/add-and-start-model` - Add and start a model with duration
- `/set-execution-speed` - Control simulation speed
- `/set-stop-after-time` - Set simulation stop time
- `/start-simulation` - Start simulation
- `/stop-simulation` - Stop simulation

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
