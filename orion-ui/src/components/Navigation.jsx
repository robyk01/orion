
export default function Navigation({pitch, velocity, orbit}) {
    return (
        <div className="flex flex-col gap-2 mt-2">
            <div>
                <h2 className="text-[10px] uppercase font-bold tracking-wider">Rotation</h2>
                <p className="font-oxanium text-lg text-white/90">{pitch}°</p>
            </div>
            
            <div>
                <h2 className="text-[10px] uppercase font-bold tracking-wider">Velocity</h2>
                <p className="font-oxanium text-lg text-white/90">{velocity} <span className="text-xs text-white/50">km/h</span></p>
            </div>
            
            <div>
                <h2 className="text-[10px] uppercase font-bold tracking-wider">Orbit</h2>
                <p className="font-oxanium text-lg text-white/90">{orbit} <span className="text-xs text-white/50">%</span></p>
            </div>
        </div>
    )
}