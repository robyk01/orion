
export default function LifeSupport({label, percent, unit}){
    const radius = 45
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percent / 100) * circumference
    return(
         <div className="relative flex flex-col items-center gap-2 bg-orion-void/5 backdrop-blur-sm p-2 rounded">
            <div className="relative w-28 h-28 flex">
                <svg className="-rotate-90 w-28 h-28" viewBox="0 0 100 100">
                    <circle 
                        r={radius} cx={50} cy={50}
                        stroke="currentColor" strokeWidth={4} fill="transparent"
                        className="text-white/10"
                    />
                    <circle 
                        r={radius} cx={50} cy={50}
                        stroke="currentColor" strokeWidth={4}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        fill="transparent"
                        strokeLinecap="round"
                        className="text-orion-pink transition-all duration-500"
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center text-center">
                    <p className="text-lg font-orbitron">{percent}{unit}</p>
                </div>
            </div>

            <p className="text-[10px] uppercase font-oxanium opacity-50">{label}</p>
        </div>
    )
}