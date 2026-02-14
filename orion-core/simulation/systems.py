import math
import random

class ShipSystems:
    def __init__(self):
        # Initial states
        self.oxygen = 98.0 # percentage
        self.co2 = 400.0 # ppm
        self.power_level = 100.0 # percentage
        self.solar_input = 5000.0 # watts
        self.distance_from_sun = 1.0 # astronomical units
        self.pressure = 101.3

    def update_eclss(self, delta_time, crew_count=1):
        """Simulates O2 consumption and CO2 buildup + scrubbing."""
        consumption = 0.001 * crew_count * delta_time
        self.oxygen = max(0, self.oxygen - consumption)

        self.co2 += (consumption * 2000)

        # Scrubber removes CO2
        scrub_rate = 1.5
        self.co2 = max(400, self.co2 - (scrub_rate * delta_time))