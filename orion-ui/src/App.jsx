import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import ShipModel from './features/ShipModel'
import Navigation from './components/Navigation'
import LifeSupport from './components/LifeSupport'
import Terminal from './components/Terminal'
import Menu from './components/Menu'
import HealthBar from './components/HealthBar'
import { useShipData } from './hooks/useShipData'

function App() {
  const telemetry = useShipData();

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Canvas>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} />

          <Stars 
            radius={100}
            depth={50}
            factor={4}
            saturation={1}
            fade
          />

          <PerspectiveCamera 
            makeDefault 
            position={[0, 0, 20]} 
            fov={45} 
            near={0.1} 
            far={1000} 
          />

          <ShipModel />

          <OrbitControls 
            enablePan={false}
            autoRotate={true} 
            autoRotateSpeed={0.5} 
          />
        </Canvas>
      </div>

      <div className="grid grid-cols-12 grid-rows-12 h-screen w-full p-4 gap-4 justify-between z-10 relative pointer-events-none">

        <div className="bg-orion-void/5 backdrop-blur-sm col-span-1 row-span-3 border-l border-t border-orion-pink p-2">
          <h2 className="font-orbitron text-xs text-orion-pink uppercase">
            Navigation
          </h2>
          <Navigation pitch={telemetry.gnc.pitch} velocity={telemetry.gnc.velocity} orbit={telemetry.gnc.orbit} />
        </div>

        <div className="col-span-10 flex justify-center">
            <img src='/logo.png' className='w-56'></img>
        </div>

        <div className="col-start-12 col-span-1 row-span-3 border-r border-t border-orion-pink flex flex-col">
            <h2 className="font-orbitron text-xs text-orion-pink uppercase text-center pt-4">
              Life Support
            </h2>
            <div className="flex flex-col gap-1 p-2 items-end">
              <LifeSupport label="Oxygen" percent={telemetry.eclss.oxygen} unit="%" />
              <LifeSupport label="CO2 Concentration" percent={telemetry.eclss.co2} unit="ppm" />
              <LifeSupport label="Cabin Pressure" percent={telemetry.eclss.pressure} unit="kPa" />
            </div>
        </div>

        <div className="col-start-1 col-span-2 row-start-10 row-span-3 pointer-events-auto">
          <Terminal />
        </div>

        <div className="col-start-1 col-span-12 row-start-12 row-span-1 self-end pointer-events-auto">
          <Menu />
        </div>

        <div className="row-start-11 row-span-2 col-start-10 col-span-3 self-center pointer-events-auto">
          <HealthBar integrity={telemetry.systems.integrity} battery_charge={telemetry.eps.battery_charge} net_power={telemetry.eps.net_power} />
        </div>

      </div>


    </div>
  )
}

export default App
