# Master thesis Artifact
This repository contains the artifact developed for the master’s thesis “Frames: A Novel Framework for Parallel DEVS based on Actors.”
Please note that this repository is no longer actively maintained.

For a potentially newer and actively maintained version, refer to the University of Innsbruck QE Repository:
👉 [Frames](https://git.uibk.ac.at/informatik/qe/sim-team/frames)

# Frames

[![.NET](https://github.com/Thokerb/Frames/actions/workflows/dotnet.yml/badge.svg)](https://github.com/Thokerb/Frames/actions/workflows/dotnet.yml)


Frames is an actor based DEVS simulation engine.

## Features

- Native distributed simulation, due to the actor model.
- Supports Parallel DEVS 
- OpenTelemetry support to monitor the simulation engine (Not intended for end-user monitoring, but actual simulation monitoring)
- Checkpointing
- Tracing
- Termination Condition
- Speed control
- Interaction (Stop/Start/Resume) with the simulation engine

## Open Features

- Batch run
- Multiple runs

⇒ not supported directly in the engine, but in the hosting application
