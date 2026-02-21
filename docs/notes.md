### HUD Elements
1. **Flight Dynamics**
   - Rotation: Pitch (degrees)
   - Velocity: Current speed (km/h)
   - Orbit Path: Progress percentage toward the destination
2. **Vitality & Environment**
   - O2 level
   - CO2 level
   - Cabin pressure
3. **Logic and Communication**
   - Command Terminal
4. **Systems Health**
   - Hull Integrity: Main health bar
   - Battery percentage
   - Fuel level
   - Thrust power
   - Icons: engines, shields, sensors, battery, fuel
5. **Menu**:
   - **NAV (GNC)**: Shows the orbital trajectory you're simulating with Keplerian elements.
   - **ENG (EPS)**: This combines Propulsion (PROP) and Electrical (EPS). Rocket Equation and the Solar/Battery power grid.
   - **BIO (ECLSS)**: The deep-dive for Life Support. Shows Sabatier reaction efficiency
   - **INTEL (HMS/Terminal)**: General information about all the systems, log history


### Subsystems
1. #### ECLSS (Environment Control and Life Support System)

   ECLSS is a life support system that provides or controls atmospheric pressure, fire detection and suppression, oxygen levels, proper ventilation, waste management and water supply. It includes three components: **The Water Recovery System**, **The Air Revitalization System** and **The Oxygen Generation System**. 

   - Humans consume approx 0.84kg O2/day. Here we simplified to a percentage drop `0.001 * crew_count * delta_time`
   - As O2 is consumed, CO2 is produced. I use a multiplier of 2000 to convert the metabolic drop in oxygen into a buildup of CO2 in ppm (parts per million - used for efficient tracking instead of percentages; PPM represents the number of CO2 molecules per million total molecules of air)
   - To prevent suffocation, I implemented a CDRA (Carbon Dioxide Removal Assembly): `self.co2 = max(400, self.co2 - (scrub_rate * delta_time))`. 400 ppm is Earth natural level and the scrubber can't go below this value.
  
   **Sabatier Reaction**
   On long duration trips (like ISS or Mars), you can't just bring enough oxygen tanks for years. This reaction helps us close the loop.

   - **Formula**: CO2 + 4H2 = CH4 + 2H2O
   - **Inputs**: Carbon Dioxide (waste from crew), Hidrogen (byproduct of other systems)
   - **Outputs**: Methane (fuel for the rocket), Water

2. #### EPS (Electrical Power System)
   
   EPS is the heart of the spacecraft. It is responsible for the Generation, Regulation and Storage of electrical energy.

   - **Power Generation** (The Inverse Square Law): 
      
      Ships use photovoltaic (solar) panels. The efficiency of the panels is not constant, it depends on the proximity to the Sun.
      - **Formula**: `solar_input = self.solar_base_output / (self.distance_from_sun ** 2)`
      - **Explanation**: Because light radiates spherically, doubling the distance (eg. 2 AU) results in 1/4 (25%) of the power.

      This ship has 4 solar wings in X shape. Each wing has a capacity of 2.7 kW (2.8 at peak). The power generation depends on the pitch angle. I calculated the wings efficiency with `efficiency = max(0, math.cos(math.radians(self.pitch - 141)))` using the cosine function and the angle of incidence relative to the sun.

    - **Energy Balance** (Net Power):
      
      We track the health of our electric system by the Net Power. This is a simple accounting of what we made vs. what we spend. 
      - **Formula**: `net_power = solar_input - self.base_drain`
      - **The States**:
        - Surplus (net_power > 0): Batteries are charging.
        - Equilibrium (net_power == 0): Theoretical perfect balance.
        - Deficit (net_power < 0): Occurs during eclipses or high-load maneuvers.

    - **Energy Storage**:

      The battery acts as a reservoir. While our sensors measure Watts (instantaneous flow), the battery stores Watt-hours (energy = power * time passed).

3. #### GNC (Guidance, Navigation, and Control):
   
   GNC is the brain of spacecraft's movement. It determines where the ship is, where it's going, and how to maintain it's orientation in the vacuum of space.
   - **Attitude Control and Sensor Noise**: Spacecrafts use gyroscopes and star trackers to maintain orientation so I implemented a Sensor Drift to make the HUD feel alive: `self.pitch += random.uniform(-0.1, 0.1)`
   - **Linear Progress**: Distance is the integral of velocity over time. Every second, the ship calculates it's position based on the current speed: `distance_traveled += velocity * delta_time`
   - **Systems Link**: The most important part of this simulation is that the subsystems are not isolated. The environment changes based on the ship's movement, creating a physics loop.
  
       As the ship moves away from the Sun, we must update the environment: `distance_from_sun = 1.0 + (distance_traveled / AU_KM)`
       **Results**:
       1. GNC increases distance.
       2. The Environment updates the AU value.
       3. EPS sees the higher AU and drops the solar_input via the Inverse Square Law.
       4. The Battery begins to drain because net_power becomes negative.
       5. The HUD changes the battery icon from Green to Orange/Red based on the physical reality of the mission.

   *It seems like for a default solar output base of 5000W (1 AU) and a drain of 1200W (life support and essential electronics), our ship can travel to a distance of approx. 2.04 AU (the limit imposed by the Inverse Square Law formula, as 5000/4.16 barely fits the 1200W drain). This means that we can get near the Snow Line within the Asteroid belt. After that, we must rely on the solar energy stored within the batteries.*

4. #### Propulsion:

   The propulsion system allows the ship to increase it's velocity, moving it from a costing state to an active acceleration state. This system is the primary consumer of fuel and electrical resources.

   - **Constant Acceleration**: To provide a realistic sense of scale, I implemented thrust based on Earth's gravity: `self.velocity += self.thrust_power * delta_time`. Thrust power is set to 0.0098 km/s^2. This creates a steady, linear increase in velocity.
   - **Fuel Consumption**: The engine requires a steady flow of propellant to maintain thrust: `self.fuel -= self.fuel_burn_rate * delta_time`
   - **Power Link**: Engines require electrical power for ignition, cooling and fuel pumps. When the engine is active, the ship's base drain increases by 1000W.

### Terminal Commands List

| Command | Definition |
| --- | --- |
| /engine on | Turns the engine on, activating propulsion |
| /engine off | Turns the engine off |
| /scrubber on | Turns the CO2 scrubber on |
| /scrubber off | Turns the CO2 scrubber off |
| /clear logs | Clear current command log |
| /reset | Hard reset current config |
| /set o2 (value) | Sets the level of the oxygen in the tank |
| /set co2 (value) | Sets the level of co2 in the ship |
| /set battery (value) | Sets the percentage of battery |
| /set velocity (value) | Sets the velocity of the ship |
| /set fuel (value) | Sets the level of fuel in the ship |
| /set pressure (value) | Sets the cabin pressure |
| /set pitch (value) | Sets the pitch orientation of the ship |
| /event o2_leak | Creates a leak in the oxygen tank at `oxygen_leak_rate` |
| /event power_leak | Creates a leak in the power grid adding an 800W drain |
| /evemt gnc_drift | Simulates a control loss of the ship |
| /event fix | Fixes all problems |



### TODO
- [x] ~~EPS~~, ~~ECLSS~~, ~~INTEL~~ file windows
- [ ] Shield system
- [ ] Sensor system
- [ ] Calculate y and z coordonates with a drift velocity
  `self.vy = 0.001, self.vz = -0.0005`
- [ ] Calculate yaw and roll with an angular velocity
- [x] Terminal commands: ~~/set co2~~, ~~/set battery~~, ~~/set fuel~~, ~~/set velocity~~
- [ ] Heat system
- [x] Add mass with fuel and without fuel for the delta V formula

   