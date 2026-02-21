### Orion: Systems Architecture & Research
#### **Core Simulation Engine**
- **Central State Manager**: Maintains a global class with every ship variable.
- **The Tick-Generator**: A high-precision timer (Python asyncio) that triggers every system to update its state simultaneously.
- **Telemetry Streamer**: A FastAPI WebSocket server that filters and pushes state updates to the UI.
  
---

#### **Subsystem Modules**
- **Propulsion (PROP)**:
  - Logic: Implements the Tsiolkovsky Rocket Equation.
  - Variables: Thrust, Specific Impulse, Current Mass.
- **Guidance & Navigation (GNC)**:
  - Logic: Calculates current position using Keplerian Elements.
  - Variables: Velocity Vector, Altitude, Coordinates, Rotation.
- **Life Support (ECLSS)**:
  - Logic: Simulates the Sabatier Reaction (CO2 to Water/Methane) and CO2 scrubbers.
  - Variables: O2 Level , CO2 Concentration, Cabin Temperature.
- **Electrical Power (EPS)**:
  - Logic: Manages the Power Budget.
  - Variables: Battery Capacity (Wh), Amperage Draw per System, Solar Flux.

---


