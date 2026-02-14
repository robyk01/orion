import { useState, useEffect } from "react";

export function useShipData(){
    const [telemetry, setTelemetry] = useState({
        eclss: { oxygen: 0, co2: 0, pressure: 0 },
        systems: { integrity: 100 },
        gnc: { rotation: 0, velocity: 0, orbit: 0 },
        eps: { battery_charge: 0, net_power: 0 }
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