import { useEffect, useState } from "react"

export default function Navigation() {
    const [stats, setStats] = useState({
        rotation: 0,
        velocity: 0,
        orbit: "0.00"
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            setStats({
                rotation: Math.floor(Math.random() * 10) + 140,
                velocity: Math.floor(Math.random() * 500) + 2000,
                orbit: (Math.random() * 10).toFixed(2)
            })
        }, 150);

        return () => clearInterval(intervalId)
    }, []);

    return (
        <div className="flex flex-col gap-2 mt-2">
            <div>
                <h2 className="text-[10px] uppercase font-bold tracking-wider">Rotation</h2>
                <p className="font-oxanium text-lg text-white/90">{stats.rotation}°</p>
            </div>
            
            <div>
                <h2 className="text-[10px] uppercase font-bold tracking-wider">Velocity</h2>
                <p className="font-oxanium text-lg text-white/90">{stats.velocity} <span className="text-xs text-white/50">km/s</span></p>
            </div>
            
            <div>
                <h2 className="text-[10px] uppercase font-bold tracking-wider">Orbit</h2>
                <p className="font-oxanium text-lg text-white/90">{stats.orbit} <span className="text-xs text-white/50">%</span></p>
            </div>
        </div>
    )
}