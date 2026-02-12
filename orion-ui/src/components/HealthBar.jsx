
export default function HealthBar({integrity}){
    const totalSegments = 30;
    const activeSegments = Math.round((integrity / 100) * totalSegments);
    const isCritical = integrity <= 20

    return(
        <div className="flex flex-col justify-center text-lg font-orbitron gap-2">
            <div className="flex justify-between w-[90%]">
                <span>System Health</span>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <img src="engine.svg" className="w-6"></img>
                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="shield.svg" className="w-6"></img>
                        <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="sensor.svg" className="w-6"></img>
                        <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                    </div>
                </div>
                
            </div>

            <div className="flex gap-1">
                {[...Array(totalSegments)].map((_, i) => {
                    const isActive = i < activeSegments;
                    const activeClass = isCritical ? 'bg-red-400' : 'bg-orion-purple3';

                    return(
                        <div key={i}
                         className={`h-8 w-2.5 transition-all duration-500 ${isActive ? activeClass : 'bg-white/30'}`}></div>
                    ) 
                })}
            </div>
        </div>
    )
}