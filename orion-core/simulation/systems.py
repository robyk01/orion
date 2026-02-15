import math
import random
from collections import deque

class ShipSystems:
    def __init__(self):
        # Initial states

        # ECLSS
        self.oxygen = 21.0 # percentage
        self.co2 = 400.0 # ppm
        self.pressure = 101.3 # kPa

        # EPS
        self.battery_capacity = 100.0 # kWh
        self.battery_charge = 100.0 # percentage
        self.solar_base_output = 5000 # W (1 AU / Earth distance)
        self.base_drain = 1200 # W (Life support + essential electronics)
        self.distance_from_sun = 1 # AU (Earth distance)
        self.net_power = 0.0

        # GNC
        self.pitch = 141.00
        self.roll = 0.0
        self.yaw = 0.0
        self.distance_traveled = 0.0 # Km
        self.total_distance = 150000000 # Km
        self.velocity = 2344.0 # Km/h
        self.orbit_percent = 0.0 # Percentage
        self.AU_KM = 149000000 # Km

        # PROP
        self.fuel = 1000.0 # Kg
        self.is_engine_on = False
        self.thrust_power = 0.0098 # Km/s^2 (1g)
        self.fuel_burn_rate = 0.1 # Kg/s

        # INTEL
        self.logs = deque([ 
            "SYS: All systems nominal.",
            "INTEL: Welcome back, Pilot."
        ], maxlen=6)



    def update_eclss(self, delta_time, crew_count=1):
        """Simulates O2 consumption and CO2 buildup + scrubbing."""
        consumption = 0.001 * crew_count * delta_time
        self.oxygen = max(0, self.oxygen - consumption)

        self.co2 += (consumption * 2000)

        # Scrubber removes CO2
        scrub_rate = 1.5
        self.co2 = max(400, self.co2 - (scrub_rate * delta_time))


    def update_eps(self, delta_time):
        """Simulates solar panels power and battery charging/draining."""
        # scale 5000w based on distance
        solar_input = self.solar_base_output / (self.distance_from_sun ** 2)

        # calculate profit/loss
        current_drain = self.base_drain

        if self.is_engine_on:
            current_drain += 1000

        self.net_power = solar_input - current_drain

        # convert watts to watt-seconds, then to watt-hours
        # energy = power * hours passed
        self.battery_charge += (self.net_power * (delta_time / 3600) / self.battery_capacity) * 100
        self.battery_charge = max(0, min(100, self.battery_charge))


    def update_gnc(self, delta_time):
        """Simulates real rotation and distance progress."""
        # sensor noise for rotation and velocity
        self.pitch += random.uniform(-0.1, 0.1)
        self.velocity += random.uniform(-1, 1)

        # distance progress
        self.distance_traveled += self.velocity * delta_time
        self.orbit_percent = min(100, (self.distance_traveled / self.total_distance) * 100)

        # convert traveled distance to AU
        traveled_au = self.distance_traveled / self.AU_KM
        self.distance_from_sun = 1.0 + traveled_au


    def update_propulsion(self, delta_time):
        """Simulates propulsion physics and fuel consumption."""

        if self.is_engine_on and self.fuel > 0:
            # add velocity when thrusting
            self.velocity += self.thrust_power * delta_time

            # decrease fuel
            self.fuel -= self.fuel_burn_rate * delta_time
            self.fuel = max(0, self.fuel)
        
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

        if cmd == '/engine off':
            self.is_engine_on = False
            self.add_log("GNC", "Engine shutdown.")
            return True
        
        if cmd.startswith('/set o2'):
            try:
                val = float(cmd.split()[-1])
                self.oxygen = val
                self.add_log("ECLSS", f"Oxygen levels manually set to {val}%")
                return True
            except:
                self.add_log("INTEL", "Invalid O2 value.")

        return False


