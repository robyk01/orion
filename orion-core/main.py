import asyncio
from fastapi import FastAPI, WebSocket
from simulation.systems import ShipSystems
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


ship = ShipSystems()

@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Update simulation
            ship.update_eclss(delta_time=1, crew_count=4)
            ship.update_eps(delta_time=1)
            ship.update_gnc(delta_time=10)
            ship.update_propulsion(delta_time=10)      
            
            # Create data packet
            data = {
                "eclss": {
                    "oxygen": round(ship.oxygen, 2),
                    "co2": round(ship.co2, 0),
                    "pressure": round(ship.pressure, 0),
                },
                "systems": {
                    "integrity": 100, 
                },
                "gnc": {
                    "pitch": round(ship.pitch, 2),
                    "yaw": round(ship.yaw, 2),
                    "roll": round(ship.roll, 2),
                    "velocity": round(ship.velocity, 2),
                    "orbit": round(ship.orbit_percent, 2),
                    "distance_traveled": round(ship.distance_traveled, 2),
                    "total_distance": round(ship.total_distance, 2),
                    "y": round(ship.y, 2),
                    "z": round(ship.z, 2),
                },
                "eps": {
                    "battery_charge": round(ship.battery_charge, 0),
                    "net_power": round(ship.net_power, 2)
                },
                "prop": {
                    "is_engine_on": ship.is_engine_on,
                    "fuel": round(ship.fuel, 2),
                    "thrust": ship.thrust_power if ship.is_engine_on else 0
                },
                "logs": list(ship.logs)
            }

            await websocket.send_json(data)

            await asyncio.sleep(1)

    except Exception as e:
        print(f"Connection closed: {e}")


@app.get("/test/eps")
def test_eps_math(dist: float, drain: float, dt: float = 1.0):
    # Temporarily set the ship's state for the test
    ship.distance_from_sun = dist
    ship.base_drain = drain

    solar_input = ship.solar_base_output / (dist ** 2)
    
    ship.update_eps(delta_time=dt)
    
    return {
        "solar_input_watts": round(solar_input, 2),
        "net_power": round(solar_input - ship.base_drain, 2),
        "new_battery_percentage": round(ship.battery_charge, 4)
    }

@app.post("/command")
async def receive_command(data: dict):
    cmd = data.get("command")
    if cmd:
        success = ship.handle_command(cmd)
        return {'status': 'success' if success else 'invalid'}
    return {'status': 'empty'}