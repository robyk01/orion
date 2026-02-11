import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import ShipModel from './features/ShipModel'
import VerticalData from './components/VerticalData'

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

      <div className="grid grid-cols-12 grid-rows-12 h-screen w-full p-4 gap-4 z-10 relative">
        <div className="col-span-3 row-span-2 border-l border-t border-orion-neon/30 p-2">
          <h2 className="font-orbitron text-xs text-orion-neon uppercase">
            Navigation
          </h2>
          <VerticalData />
        </div>
      </div>
    </div>
  )
}

export default App
