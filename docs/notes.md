### HUD Elements
1. **Flight Dynamics**
   - Rotation: Pitch, Roll, Yaw (degrees)
   - Velocity: Current speed (km/s)
   - Orbit Path: Progress bar toward a destination
   - Clicking opens up a map with trajectory
2. **Vitality & Environment**
   - O2 level
   - CO2 level
   - Cabin pressure/temperature
   - Clicking the gauges should open a detailed view showing the Sabatier reaction status
3. **Logic and Communication**
   - Command Terminal
   - Comms Link: Signal Strength meter and latency timer (ping)
4. **Systems Health**
   - Hull Integrity: Main health bar
   - Reactor Output: how much power is the ship generating
   - Icons: engines, shields, sensors
5. **Menu**:
   - **NAV (GNC)**: Shows the orbital trajectory you're simulating with Keplerian elements.
   - **ENG (PROP/EPS)**: This combines Propulsion (PROP) and Electrical (EPS). Rocket Equation and the Solar/Battery power grid.
   - **BIO (ECLSS)**: The deep-dive for Life Support. Shows Sabatier reaction efficiency and humidity
   - **INTEL (HMS/Terminal)**: Satellite images, Vision data, and long-range communication logs.


### Subsystems
1. **ECLSS** (Environment Control and Life Support System)

   ECLSS is a life support system that provides or controls atmospheric pressure, fire detection and suppression, oxygen levels, proper ventilation, waste management and water supply. It includes three components: **The Water Recovery System**, **The Air Revitalization System** and **The Oxygen Generation System**. 

   - Humans consume approx 0.84kg O2/day. Here we simplified to a percentage drop `0.001 * crew_count * delta_time`
   - As O2 is consumed, CO2 is produced. I use a multiplier of 2000 to convert the metabolic drop in oxygen into a buildup of CO2 in ppm (parts per million - used for efficient tracking instead of percentages; PPM represents the number of CO2 molecules per million total molecules of air)
   - To prevent suffocation, I implemented a CDRA (Carbon Dioxide Removal Assembly): `self.co2 = max(400, self.co2 - (scrub_rate * delta_time))`. 400 ppm is Earth natural level and the scrubber can't go below this value.

