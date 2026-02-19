
export default function IntelWindow({onToggleIntel, data }){
    const eta = (data.gnc.total_distance - data.gnc.distance_traveled) / data.gnc.velocity

    const getSystemStatus = (system, data) => {
        let issues = []
        let level = 'GREEN'

        if (system === 'EPS') {
            if (data.eps.battery_charge < 10) issues.push("Low Battery.")

            if (issues.length > 0) level = 'RED';
            else {
                if (data.eps.net_power < 0) issues.push("Power drain higher than solar input.") 
                if (issues.length > 0) level = 'ORANGE';
            }
        }

        const y = Math.abs(data.gnc.y)
        const z = Math.abs(data.gnc.z)
        if (system === 'GNC') {
            if (y > 200 || z > 200) issues.push("Trajectory significantly changed. Ship is drifting")

            if (issues.length > 0) level = 'RED';
            else {
                if (y > 50 || z > 50) issues.push("Trajectory changed. Ship is drifting")
                if (issues.length > 0) level = 'ORANGE';
            }
        }

        if (system === "ECLSS") {
            if (data.eclss.oxygen < 18.0) issues.push("Critical oxygen level.")
            if (data.eclss.co2 > 2000.0) issues.push("Critical CO2 level.")
            if (data.eclss.pressure < 10.0) issues.push("Critical cabin pressure.")
            if (data.eclss.oxygen_tank <= 0) issues.push("Empty oxygen tank.")

            if (issues.length > 0) level = 'RED';
            else {
                if (data.eclss.oxygen < 19.5) issues.push("Low oxygen level.")
                if (data.eclss.co2 > 1000.0) issues.push("High CO2 level.")
                if (data.eclss.pressure < 12.0) issues.push("Low cabin pressure.")
                if (data.eclss.oxygen_tank < 15) issues.push("Low oxygen tank level.")
                if (issues.length > 0) level = 'ORANGE';
            }
        }

        if (system == "PROP") {
            if (data.prop.fuel < 100) issues.push("Critical fuel level.")
            if (data.prop.thrust < 10) issues.push("No thrust power.")
            
            if (issues.length > 0) level = 'RED';
            else  {
                if (data.prop.fuel < 1000) issues.push("Low fuel level.")
                if (data.prop.thrust < 100) issues.push("Low thrust power.")
                if (issues.length > 0) level = 'ORANGE';
            }

        }

        const styles = {
            RED: 'border-red-500 shadow-red-600 shadow-[0_5px_30px_-15px]',
            ORANGE: 'border-orange-400 shadow-orange-600 shadow-[0_5px_30px_-15px]',
            GREEN: 'border-green-400 shadow-green-600 shadow-[0_5px_30px_-15px]',
        }

        return {style: styles[level], issues};
    };

    return(
        <div className="w-[60%] h-[60%] flex flex-col rounded-sm bg-linear-to-br from-orion-pink/10 to-orion-void/10 backdrop-blur-lg border border-white/10 p-6">

            {/* Header */}
            <div className="flex flex-col gap-1 mt-6">
                <h2 className="text-xl font-orbitron uppercase ">Intel</h2>
                <span className="text-[10px] text-white/40">Information and Comms</span>

                {/* Close button */}
                <button
                    className="absolute right-6 bg-red-400 rounded-sm text-black px-1.5 text-sm"
                    onClick={onToggleIntel}>
                        <b>x</b>
                </button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-6">
                <div className="flex flex-col gap-2">
                    <p className="text-white text-[9px] uppercase tracking-widest mb-4">Mission Progress</p>
                    <div className="flex text-xs justify-between">
                        <p>Mission Phase: </p>
                        <span>{data.gnc.orbit < 5 ? "Ascent" : data.gnc.orbit < 85 ? "Trans-Lunar Coast" : data.gnc.orbit < 100 ? "Landing" : ""}</span>
                    </div>
                    <div className="flex text-xs justify-between">
                        <p>ETA: </p>
                        <span>{eta.toFixed(2)}</span>
                    </div>
                    <div className="flex text-xs justify-between">
                        <p>Total Mass: </p>
                        <span>{(data.prop.dry_mass + data.prop.fuel).toLocaleString()} kg</span>
                    </div>
                    <div className="flex text-xs justify-between">
                        <p>Thrust Vector: </p>
                        <span className={data.prop.direction === -1 ? "text-orange-400" : "text-green-400"}>
                            {data.prop.direction === 1 ? "PROGRADE" : "RETROGRADE"}
                        </span>
                    </div>
                </div>

                <div className="">
                    <p className="text-white text-[9px] uppercase tracking-widest mb-4">Command Center</p>
                    <div className="flex flex-col justify-start items-start gap-4">
                        {['GNC', 'EPS', 'ECLSS', 'PROP'].map((sys) => {
                            const status = getSystemStatus(sys, data); 
                            
                            return (
                                <div key={sys} className={`flex items-center bg-black/50 w-full rounded-sm gap-6 border ${status.style}`}>
                                    <div className={`p-8 border-r border-white/40 w-12 h-12 rounded-sm flex items-center justify-center `}>
                                        <p className="font-black text-sm">{sys}</p>
                                    </div>
                                
                                    <div className="flex flex-col">
                                        {status.issues.map((issue, i) => (
                                        <span key={i} className="text-sm text-red-400 font-bold uppercase animate-pulse">
                                            {issue}
                                        </span>
                                        ))}
                                        {status.issues.length === 0 && (
                                        <span className="text-sm text-green-400 uppercase">Nominal</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}                        
                    </div>
                </div>

                <div className="">
                    <p className="text-white text-[9px] uppercase tracking-widest mb-4">Logs</p>
                    <div className="flex flex-col gap-1 text-xs font-mono opacity-80">
                        {data.logs?.map((log, i) => {
                            const [source, message] = log.split(': ');
                            return (
                                <div key={i} className="grid grid-cols-[15%_85%] gap-2">
                                    <span className="text-blue-400">[{source}]</span>
                                    <span className="text-gray-300">{message}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}