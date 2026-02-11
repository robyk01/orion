### Orion: Systems Architecture & Research
#### **Core Simulation Engine**
- **Central State Manager**: Maintains a global dictionary of every ship variable (JSON-based).
- **The Tick-Generator**: A high-precision timer (Python asyncio) that triggers every system to update its state simultaneously.
- **Telemetry Streamer**: A FastAPI WebSocket server that filters and pushes state updates to the UI.
  
---

#### **Subsystem Modules**
- **Propulsion (PROP)**:
  - Logic: Implements the Tsiolkovsky Rocket Equation.
  - Variables: Thrust, Specific Impulse, Current Mass, Propellant Temperature.
- **Guidance & Navigation (GNC)**:
  - Logic: Calculates current position using Keplerian Elements.
  - Variables: Velocity Vector, Altitude, Orbital Period, Eccentricity.
- **Life Support (ECLSS)**:
  - Logic: Simulates the Sabatier Reaction (CO2 to Water/Methane) and O2 scrubbers.
  - Variables: O2 Partial Pressure, CO2 Concentration, Humidity, Cabin Temperature.
- **Electrical Power (EPS)**:
  - Logic: Manages the Power Budget. Solar panel efficiency decreases based on distance from the sun (1/r^2).
  - Variables: Battery Capacity (Wh), Amperage Draw per System, Solar Flux.
- **Health Monitoring (HMS)**:
  - Logic: It takes the output of other systems and adds Gaussian Noise.
  - AI Task: An Unsupervised Learning model (Isolation Forest or Autoencoder) flags when the noisy data deviates too far from the clean simulation.

---


