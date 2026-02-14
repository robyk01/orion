import math
import random

class ShipSystems:
    def __init__(self):
        # Initial states
        self.oxygen = 98.0 # percentage
        self.co2 = 400.0 # ppm
        self.pressure = 101.3 # kPa

        self.battery_capacity = 100.0 # kWh
        self.battery_charge = 100.0 # percentage
        self.solar_base_output = 5000 # W (1 AU / Earth distance)
        self.base_drain = 1200 # W (Life support + essential electronics)
        self.distance_from_sun = 1 # AU (Earth distance)
        self.net_power = 0.0

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
        self.net_power = solar_input - self.base_drain

        # convert watts to watt-seconds, then to watt-hours
        # energy = power * hours passed
        self.battery_charge += (self.net_power * (delta_time / 3600) / self.battery_capacity) * 100
        self.battery_charge = max(0, min(100, self.battery_charge))