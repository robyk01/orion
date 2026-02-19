
export default function IntelWindow({onToggleIntel, data }){
    const eta = (data.gnc.total_distance - data.gnc.distance_traveled) / data.gnc.velocity

    const getStatusColor = (system, data) => {
    if (system === 'EPS') {
        if (data.eps.battery < 10) return 'border-red-500 shadow-red-600 shadow-[0_5px_10px]';
        if (data.eps.net_power < 0) return 'border-orange-400 shadow-orange-600 shadow-[0_5px_10px]';
        return 'border-green-400 shadow-green-600 shadow-[0_5px_10px]';
    }
    // ... GNC and ECLSS
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
                    <div className="flex gap-4">
                        <div className={`p-6 bg-white w-12 h-12 rounded-sm flex items-center justify-center border-2 ${getStatusColor("EPS", data)}`}>
                            <p className="text-orion-purple1 font-black text-sm">GNC</p>
                        </div>

                        <div className="p-6 bg-white w-12 h-12 rounded-sm flex items-center justify-center border-2  border-orange-400 shadow-[0_5px_10px] shadow-orange-600">
                            <p className="text-orion-purple1 font-black text-sm">EPS</p>
                        </div>

                        <div className="p-6 bg-white w-12 h-12 rounded-sm flex items-center justify-center border-2  border-red-400 shadow-[0_5px_10px] shadow-red-600">
                            <p className="text-orion-purple1 font-black text-sm">ECLSS</p>
                        </div>
                        
                    </div>
                </div>

                <div className="">
                    <p className="text-white text-[9px] uppercase tracking-widest mb-4">Logs</p>
                    <div className="flex flex-col gap-1 text-xs font-mono opacity-80">
                        {data.logs?.map((log, i) => {
                            const [source, message] = log.split(': ');
                            return (
                                <div key={i} className="flex gap-2">
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