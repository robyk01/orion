import math
import random
from collections import deque

class ShipSystems:
    def __init__(self):
        # Initial states

        # ECLSS
        self.oxygen_tank = 100 # percentage
        self.nitrogen_tank = 100 # percentage
        self.oxygen = 21.0 # percentage
        self.nitrogen = 79.0 # percentage
        self.co2 = 400.0 # ppm
        self.pressure = 14.7 # psi

        # EPS
        self.battery_capacity = 30.0 # kWh
        self.battery_charge = 100.0 # percentage
        self.solar_wings = [2.7, 2.7, 2.7, 2.7] # kW for each wing
        self.base_load = 1.5 # kW 
        self.total_drain = 0.0 # kW
        self.net_power = 0.0
        self.is_scrubber_on = False

        # self.solar_base_output = 5000 # W (1 AU / Earth distance)
        # self.base_drain = 1200 # W (Life support + essential electronics)
        # self.distance_from_sun = 1 # AU (Earth distance)

        # GNC
        self.pitch = 141.00
        self.roll = 0.0 
        self.yaw = 0.0
        self.distance_traveled = 0.0 # km
        self.y = 0.0 # km
        self.z = 0.0 # km
        self.total_distance = 384400 / 100 # km to Moon 
        self.velocity = 38000.0 / 50 # km/h
        self.orbit_percent = 0.0 # Percentage
        self.AU_KM = 149000000 # km

        # PROP
        self.dry_mass = 17400.0 # kg
        self.fuel = 8600.0 # kg
        self.is_engine_on = False
        self.thrust_power = 10 * 26.7 # kN
        self.fuel_burn_rate = 0.1 # kg/s
        self.thrust_direction = 1  # 1 for Forward (Prograde), -1 for Braking (Retrograde)

        # INTEL 
        self.logs = deque([ 
            "SYS: All systems nominal.",
            "INTEL: Welcome back, Pilot."
        ], maxlen=15)

        self.alerts = {
            "braking": 0,
            "docking": 0
        }



    def update_eclss(self, delta_time, crew_count=4):
        """Simulates O2 consumption and CO2 buildup + scrubbing."""
        consumption = 0.001 * crew_count * delta_time
        self.oxygen_tank = max(0, self.oxygen_tank - consumption)

        # if tank is empty, cabin air begins to drop
        if self.oxygen_tank <= 0:
            self.oxygen = max(0, self.oxygen - (consumption * 0.1))

        self.co2 += (consumption * 2000)

        # Scrubber removes CO2
        if self.co2 > 1000 and not self.is_scrubber_on:
            self.is_scrubber_on = True
            self.add_log("ECLSS", "High CO2 levels. Scrubber activated")

        elif self.co2 < 500 and self.is_scrubber_on:
            self.is_scrubber_on = False
            self.add_log("ECLSS", "CO2 level is normal. Scrubber deactivated")

        if self.is_scrubber_on:
            scrub_rate = 10
            self.co2 = max(400, self.co2 - (scrub_rate * delta_time))

        

    def update_eps(self, delta_time):
        """Simulates solar panels power and battery charging/draining."""
        # total generation of 4 wings (kW to watts)
        # calc efficiency based on the angle of incidence relative to the sun
        peak_power = 2.8

        efficiency = max(0, math.cos(math.radians(self.pitch - 141)))

        self.solar_wings = [peak_power * efficiency for _ in self.solar_wings]

        solar_input = sum(self.solar_wings) * 1000

        # calculate profit/loss
        current_drain = self.base_load * 1000

        if self.is_engine_on:
            current_drain += 1000

        if self.is_scrubber_on:
            current_drain += 500

        self.total_drain = current_drain

        self.net_power = solar_input - current_drain

        # convert watts to watt-seconds, then to watt-hours
        # energy = power * hours passed
        capacity_wh = self.battery_capacity * 1000
        self.battery_charge += (self.net_power * (delta_time / 3600) / capacity_wh) * 100
        self.battery_charge = max(0, min(100, self.battery_charge))


    def update_gnc(self, delta_time):
        """Simulates real rotation and distance progress."""
        # sensor noise for rotation and velocity
        self.pitch += random.uniform(-0.02, 0.02)
        self.yaw += random.uniform(-0.02, 0.02)
        self.roll += random.uniform(-0.02, 0.02)
        self.velocity += random.uniform(-0.02, 0.02)
        self.y += random.uniform(-0.01, 0.01)
        self.z += random.uniform(-0.01, 0.01)

        # distance progress
        self.distance_traveled += (self.velocity * (delta_time / 3600))
        self.orbit_percent = min(100, (self.distance_traveled / self.total_distance) * 100)

        accel_ms2 = (self.thrust_power * 1000) / (self.dry_mass + self.fuel)
        accel_kmh2 = accel_ms2 * 3.6 * 3600

        remaining_distance = self.total_distance - self.distance_traveled

        # stopping distance: v2/2a
        stopping_distance = (self.velocity ** 2) / (2 * accel_kmh2)

        if remaining_distance <= stopping_distance and self.velocity > 0:
            self.is_engine_on = True
            self.thrust_direction = -1
            if self.alerts['braking'] == 0:
                self.add_log("GNC", "Calculated braking burn initiated.")
                self.alerts['braking'] = 1
            
        # turn off engine
        if self.orbit_percent >= 100:
            self.is_engine_on = False
            self.velocity = 0

            if self.alerts['docking'] == 0:
                self.alerts["docking"] = 1
                self.add_log("GNC", "Arrival confirmed. Parking orbit established.")
            

        # convert traveled distance to AU
        # traveled_au = self.distance_traveled / self.AU_KM
        # self.distance_from_sun = 1.0 + traveled_au


    def update_propulsion(self, delta_time):
        """Simulates propulsion physics and fuel consumption."""

        if self.is_engine_on and self.fuel > 0:
            total_mass = self.dry_mass + self.fuel

            # calc current acceleration
            # F = m * a => a = F/m
            accel_ms = (self.thrust_power * 1000) / total_mass

            # convert m/s to km/h
            accel_kmh = accel_ms * 3.6
            self.velocity += accel_kmh * self.thrust_direction * delta_time

            if self.thrust_direction == -1 and self.velocity < 0:
                if self.orbit_percent < 100:
                    self.velocity = 300
                else:
                    self.velocity = 0
                    self.is_engine_on = False

            # decrease fuel
            self.fuel -= self.fuel_burn_rate * delta_time
            self.fuel = max(0, self.fuel)

            if self.fuel <= 0:
                self.is_engine_on = False
                self.add_log("PROP", "Fuel exhausted. Engine cutoff.")
        
        else: self.is_engine_on = False # if out of fuel


    def add_log(self, source, message):
            """Formats and adds a message to the ship's log."""
            self.logs.append(f"{source}: {message}")

    def handle_command(self, cmd_text):
        """Processes CLI inputs from the terminal."""
        cmd = cmd_text.lower().strip()

        if cmd == '/engine on':
            if self.fuel > 0:
                self.is_engine_on = True
                self.add_log("GNC", "Thrusters engaged.")
                return True
            self.add_log("INTEL", "Thruster ignition failed: Low fuel.")

        if cmd == '/scrubber on':
            self.is_scrubber_on = True
            self.add_log("ECLSS", "CO2 Scrubber ON.")
            return True

        if cmd == '/engine off':
            self.is_engine_on = False
            self.add_log("GNC", "Engine shutdown.")
            return True
        
        if cmd.startswith('/set o2'):
            try:
                val = float(cmd.split()[-1])
                self.oxygen_tank = val
                self.add_log("ECLSS", f"Oxygen levels manually set to {val}%")
                return True
            except:
                self.add_log("INTEL", "Invalid O2 value.")

        if cmd.startswith('/set co2'):
            try:
                val = float(cmd.split()[-1])
                self.co2 = val
                self.add_log("ECLSS", f"CO2 levels manually set to {val}ppm")
                return True
            except:
                self.add_log("INTEL", "Invalid CO2 value.")

        if cmd.startswith('/set battery'):
            try:
                val = float(cmd.split()[-1])
                self.battery_charge = val
                self.add_log("EPS", f"Battery percentage manually set to {val}%")
                return True
            except:
                self.add_log("INTEL", "Invalid value.")

        if cmd.startswith('/set velocity'): 
            try:
                val = float(cmd.split()[-1])
                self.velocity = val
                self.add_log("GNC", f"Velocity manually set to {val}km/h")
                return True
            except:
                self.add_log("INTEL", "Invalid value.")

        if cmd.startswith('/set fuel'): 
            try:
                val = float(cmd.split()[-1])
                self.fuel = val
                self.add_log("PROP", f"Fuel manually set to {val}kg")
                return True
            except:
                self.add_log("INTEL", "Invalid value.")

        if cmd.startswith('/set pressure'): 
            try:
                val = float(cmd.split()[-1])
                self.pressure = val
                self.add_log("PROP", f"Pressure manually set to {val}kpsi")
                return True
            except:
                self.add_log("INTEL", "Invalid value.")

        if cmd.startswith('/set pitch'): 
            try:
                val = float(cmd.split()[-1])
                self.pitch = val
                self.add_log("PROP", f"Pitch orientation corrected to {val}°")
                return True
            except:
                self.add_log("INTEL", "Invalid value.")

        if cmd == '/reset':
            self.__init__()
            self.add_log("SYS", "Hard reset complete. All systems nominal.")
            return True

        return False


