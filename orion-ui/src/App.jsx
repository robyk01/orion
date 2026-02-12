import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import ShipModel from './features/ShipModel'
import Navigation from './components/Navigation'
import LifeSupport from './components/LifeSupport'

function App() {

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      <div className="scanline" />

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
        <div className="bg-orion-void/5 backdrop-blur-sm col-span-2 row-span-3 border-l border-t border-orion-pink p-2">
          <h2 className="font-orbitron text-xs text-orion-pink
           uppercase">
            Navigation
          </h2>
          <Navigation />
        </div>

        <div className="bg-orion-void/5 backdrop-blur-sm col-start-11 col-span-2 row-span-7 flex flex-col">
          <div className="border-r border-t border-orion-pink p-2 text-center h-fit">
            <h2 className="font-orbitron text-xs text-orion-pink uppercase">
              Life Support
            </h2>
            <div className="flex flex-col gap-4 p-4">
              <LifeSupport label="Oxygen" percent={98} unit="%" />
              <LifeSupport label="CO2 Concentration" percent={15} unit="ppm" />
              <LifeSupport label="Cabin Pressure" percent={101} unit="kPa" />
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default App
