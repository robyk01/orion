import asyncio
from fastapi import FastAPI, WebSocket
from simulation.systems import ShipSystems

app = FastAPI()
ship = ShipSystems()

@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Update simulation
            ship.update_eclss(delta_time=1)
            
            # Create data packet
            data = {
                "oxygen": round(ship.oxygen, 2),
                "co2": round(ship.co2, 0),
                "pressure": round(ship.pressure, 0),
                "integrity": 100
            }

            await websocket.send_json(data)

            await asyncio.sleep(1)

    except Exception as e:
        print(f"Connection closed: {e}")