# Frames.Engine

This project implements a distributed simulation engine based on an actor model using Akka. It supports concurrent execution, persistence, tracing, and monitoring.

## Structure

- **DependencyInjection**  
  Configures dependency injection and actor/service instantiation.

- **Dto**  
  Data Transfer Objects for communication between layers and across boundaries.

- **Messages**  
  Actor messages for communication between simulators and coordinators (e.g., `StartInitialization`, `ComputeOutput`, `FinishedExecuteTransition`).

#### WithActivityTrace,
 This is used to add OTEL Information to actor messages

#### IShardSeperation
This is used for routing of messages in the cluster. See AkkaConfiguration in Frames.Museum to see how this is applied.

- **Exceptions**  
  Custom engine-specific exception types (e.g., `SimulatorException`, `SynchronisationException`).

- **Persistence**  
  State persistence and checkpointing, based on Akka.Persistence.

- **Monitoring**  
  Instrumentation for tracking simulation execution.
  Distributed tracing using `Activity` and `ActivityTraceFlags`.

- **Tracing**  
Used for tracing of Simulators and coordinators with the internal akka streams.
In a non blocking way all outputs are collected and logically grouped to a single execution step.

- **Util**  
  Shared utilities and helper classes.

## Core Components

Based on pseudo code from Theory of M&S.

- **Simulator.cs**  
  Implements simulators for atomic models.

- **Coordinator.cs**  
  Coordinates coupled models and manages child simulators/coordinators.

- **RootCoordinator.cs**  
  Orchestrates the overall simulation and is the root coordinator
