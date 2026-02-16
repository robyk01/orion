import TrajectoryMap from "../../features/TrajectoryMap"

export default function GNCWindow({ onToggleGNC, data }){
    return(
        <div className="w-[60%] h-[60%] flex flex-col justify-between rounded-sm bg-linear-to-br from-orion-pink/10 to-orion-void/10 backdrop-blur-lg border border-white/10 p-6">
            
            {/* Header */}
            <div className="flex flex-col gap-1 mt-6">
                <h2 className="text-xl font-orbitron uppercase ">Guidance & Navigation</h2>
                <span className="text-[10px] text-white/40">TRAJECTORY_STABLE</span>

                {/* Close button */}
                <button
                    className="fixed right-6 bg-red-400 rounded-sm text-black px-1.5 text-sm"
                    onClick={onToggleGNC}>
                        <b>x</b>
                </button>
            </div>

            <div className="flex flex-col mb-6">
                <div className="grid grid-cols-2 gap-8 mb-12">
                    {/* Left */}
                    <div className="flex flex-col gap-4">
                        <div className="space-y-1">
                            <p className="text-white/40 text-[9px] uppercase tracking-widest">Orbital Elements</p>
                            <div className="grid grid-cols-2 text-xs">
                            <span>Velocity Vector:</span>
                            <span className="text-right font-orbitron">{data.velocity.toFixed(2)} KM/H</span>
                            <span>Delta-V Rem:</span>
                            <span className="text-right font-orbitron text-orion-pink">4.2 KM/H</span>
                            </div>
                        </div>

                        <div className="space-y-1 mt-4">
                            <p className="text-white/40 text-[9px] uppercase tracking-widest">Attitude (Degrees)</p>
                            <div className="flex justify-between border-t border-white/5 pt-2">
                            <span>P: {data.pitch.toFixed(1)}°</span>
                            <span className="text-white/40">Y: {data.yaw}°</span>
                            <span className="text-white/40">R: {data.roll}°</span>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="border-l border-white/10 p-4 relative overflow-hidden">
                        <p className="text-white/40 text-[9px] uppercase tracking-widest mb-4">Sun-Relative Coordinates</p>
                        <div className="space-y-2 font-orbitron text-sm">
                            <p className="flex justify-between">X: <span className="text-orion-pink">{data.distance_traveled.toFixed(1)}</span></p>
                            <p className="flex justify-between">Y: <span className="text-white/60">{data.y.toFixed(1)}</span></p>
                            <p className="flex justify-between">Z: <span className="text-white/60">{data.z.toFixed(1)}</span></p>
                        </div>
                        {/* Subtle geometric background detail */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-white/5 rotate-45" />
                        </div>
                </div>

                <div className="flex">
                    <TrajectoryMap percent={data.orbit} total_distance={data.total_distance} distance={data.distance_traveled} velocity={data.velocity}/>
                </div>
            </div>
        </div>
    )
}