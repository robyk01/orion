import { useState, useEffect } from "react";

export function useShipData(){
    const [telemetry, setTelemetry] = useState({
        oxygen: 0,
        co2: 0,
        pressure: 0,
        integrity: 100
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