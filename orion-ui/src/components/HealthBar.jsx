
export default function HealthBar({integrity, battery_charge, net_power, is_engine_on, fuel, thrust}){
    const totalSegments = 30;
    const activeSegments = Math.round((integrity / 100) * totalSegments);
    const isCritical = integrity <= 20

    const getBatteryIcon = () => {
        if (battery_charge <= 20) return "battery-red.png";
        if (net_power < 0) return "battery-orange.png";
        return "battery-green.png";
    };

    return(
        <div className="flex flex-col justify-center text-lg font-orbitron gap-2 w-full pr-6">
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-6">
                    <span className="shrink-0">System Health</span>

                    
                </div>
                
                <div className="flex gap-4 flex-wrap items-center">

                    <div className="flex items-center gap-2">
                        <img src="engine.svg" className="w-6"></img>
                        <div className={`w-3 h-3 ${is_engine_on ? 'bg-green-500' : 'bg-red-500'} rounded-sm`}></div>
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

            <div className="flex gap-1 w-full">
                {[...Array(totalSegments)].map((_, i) => {
                    const isActive = i < activeSegments;
                    const activeClass = isCritical ? 'bg-red-400' : 'bg-orion-purple3';

                    return(
                        <div key={i}
                         className={`h-8 flex-1 transition-all duration-500 ${isActive ? activeClass : 'bg-white/30'}`}></div>
                    ) 
                })}
            </div>

            <div className="flex gap-4 text-sm justify-between">
                <div className="flex gap-1 items-center">
                    <img src={getBatteryIcon()} className="w-6 "></img>
                    <p className="text-xs">{battery_charge}%</p>
                </div>
                <div className="flex gap-4">
                    <span>Fuel: {fuel}</span>
                </div>
            </div>
        </div>
    )
}