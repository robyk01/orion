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
import { useState, useEffect } from 'react'
import GNCWindow from './components/systems/GNCWindow'
import IntelWindow from './components/systems/IntelWindow'
import ECLSSWindow from './components/systems/ECLSSWindow'
import EPSWindow from './components/systems/EPSWindow'

function App() {
  const telemetry = useShipData();

  const [loading, setLoading] = useState(true);

  const [openedGNC, setOpenedGNC] = useState(false);
  const [openedIntel, setOpenedIntel] = useState(false);
  const [openedECLSS, setOpenedECLSS] = useState(false);
  const [openedEPS, setOpenedEPS] = useState(false);

  const onToggleGNC = () => {
    setOpenedGNC(v => !v);
    setOpenedIntel(false)
    setOpenedECLSS(false)
    setOpenedEPS(false)
  }

  const onToggleIntel = () => {
    setOpenedIntel(v => !v);
    setOpenedGNC(false)
    setOpenedECLSS(false)
    setOpenedEPS(false)
  }

  const onToggleECLSS = () => {
    setOpenedECLSS(v => !v);
    setOpenedGNC(false)
    setOpenedIntel(false)
    setOpenedEPS(false)
  }

  const onToggleEPS = () => {
    setOpenedEPS(v => !v);
    setOpenedGNC(false)
    setOpenedIntel(false)
    setOpenedECLSS(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="relative w-full h-screen text-white overflow-hidden">

      {/* <div 
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-orion-void transition-all duration-1000 ease-in-out ${
          loading ? 'opacity-100' : 'opacity-0 pointer-events-none scale-110'
        }`}
      >
        <div className="relative animate-in fade-in zoom-in-95 duration-1000 ease-out">
          <div className="absolute inset-0 bg-orion-pink/10 blur-3xl rounded-full scale-125 animate-pulse" />
          <img 
            src="loading_logo.png" 
            className="w-84 h-84 relative z-10 opacity-90" 
            alt="Icon" 
          />
        </div>

        <p className="font-orbitron text-orion-pink/60 text-[10px] mt-12 tracking-[0.3em] uppercase animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300">
          Initializing Flight Systems
        </p>

        <div className="w-32 h-px bg-white/10 mt-4 overflow-hidden">
          <div className="h-full bg-orion-pink animate-progress-fast" />
        </div>
      </div> */}

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
              <LifeSupport label="Oxygen" percent={telemetry.eclss.oxygen_tank} unit="%" max={100} />
              <LifeSupport label="CO2 Concentration" percent={telemetry.eclss.co2} unit="ppm" max={2000} />
              <LifeSupport label="Cabin Pressure" percent={telemetry.eclss.pressure} unit="psi" max={100} />
            </div>
        </div>

        <div className="col-start-1 col-span-2 row-start-9 row-span-4 pointer-events-auto">
          <Terminal />
        </div>

        <div className="col-start-1 col-span-12 row-start-12 row-span-1 self-end flex justify-center pointer-events-auto">
          <Menu
            onToggleGNC={onToggleGNC}
            onToggleEPS={onToggleEPS}
            onToggleECLSS={onToggleECLSS}
            onToggleIntel={onToggleIntel} />
        </div>

        <div className="row-start-11 row-span-2 col-start-10 col-span-3 self-center pointer-events-auto">
          <HealthBar
            integrity={telemetry.systems.integrity}
            battery_charge={telemetry.eps.battery_charge}
            net_power={telemetry.eps.net_power}
            is_engine_on={telemetry.prop.is_engine_on}
            fuel={telemetry.prop.fuel}
            thrust={telemetry.prop.thrust} />
        </div>

      </div>


      {openedGNC && (
        <div className="fixed inset-0 flex items-center justify-center">
          <GNCWindow onToggleGNC={onToggleGNC} data={telemetry.gnc}/>
        </div>
      )}

      {openedIntel && (
        <div className="fixed inset-0 flex items-center justify-center">
          <IntelWindow onToggleIntel={onToggleIntel} data={telemetry}/>
        </div>
      )}

      {openedECLSS && (
        <div className="fixed inset-0 flex items-center justify-center">
          <ECLSSWindow onToggleECLSS={onToggleECLSS} data={telemetry.eclss}/>
        </div>
      )}

      {openedEPS && (
        <div className="fixed inset-0 flex items-center justify-center">
          <EPSWindow onToggleEPS={onToggleEPS} data={telemetry}/>
        </div>
      )}

    </div>
  )
}

export default App
