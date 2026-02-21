import csv
import os

def record_telemetry(self, filename="mission_data.csv"):
    # this defines which features the AI will look at
    data = {
        "timestamp": self.mission_time,
        "pitch": self.pitch,
        "y_pos": self.y,
        "z_pos": self.z,
        "o2_level": self.oxygen_tank,
        "co2_level": self.co2,
        "total_drain": self.total_drain,
        "solar_input": sum(self.solar_wings) * 1000,
        "is_scrubber_on": 1 if self.is_scrubber_on else 0,
        "is_engine_on": 1 if self.is_engine_on else 0,
        "is_anomaly": 1 if (self.oxygen_leak_rate > 1 or self.power_leak > 0 or self.instability > 0) else 0
    }

    file_exists = os.path.isfile(filename)
    with open(filename, 'a', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=data.keys())
        if not file_exists:
            writer.writeheader()
        writer.writerow(data)