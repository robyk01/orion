import { useState, useEffect } from "react";

export function useShipData(){
    const [telemetry, setTelemetry] = useState({
        eclss: { oxygen_tank: 0, oxygen: 0, co2: 0, pressure: 0, nitrogen_tank: 0, nitrogen: 0, is_scrubber_on: 0},
        systems: { integrity: 100 },
        gnc: { pitch: 0, yaw: 0, roll: 0, velocity: 0, orbit: 0, distance_traveled: 0, total_distance: 0, y: 0, z: 0 },
        eps: { battery_charge: 0, net_power: 0 },
        prop: { is_engine_on: 0, fuel: 0, thrust: 0, dry_mass: 0 }
    });

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/telemetry');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTelemetry(data);
        }

        return () => socket.close()
    }, []);

    return telemetry;
}