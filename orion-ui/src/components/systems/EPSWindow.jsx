import SolarWing from "../../features/SolarWing"
import EnergyCore from "../../features/EnergyCore"
import EPSItems from "../../features/EPSItems"

export default function EPSWindow({ onToggleEPS, data }){
    return(
        <div className="w-[60%] h-[60%] flex flex-col rounded-sm bg-linear-to-br from-orion-pink/10 to-orion-void/10 backdrop-blur-lg border border-white/10 p-6">

            {/* Header */}
            <div className="flex flex-col gap-1 mt-6">
                <h2 className="text-xl font-orbitron uppercase ">EPS</h2>
                <span className="text-[10px] text-white/40">Electric Grid</span>

                <button
                    className="absolute right-6 bg-red-400 rounded-sm text-black px-1.5 text-sm"
                    onClick={onToggleEPS}>
                        <b>x</b>
                </button>
            </div>


            <div className="flex justify-between mt-6 text-white text-[10px] uppercase tracking-widest mb-4 gap-8 ">
                <div className="flex flex-col gap-6 w-1/3 px-4">
                    <p className="text-[10px] uppercase tracking-widest text-center opacity-60">Generation</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <SolarWing id="A" power={data.eps.solar_wings[0]} />
                        <SolarWing id="B" power={data.eps.solar_wings[1]} />
                        <SolarWing id="C" power={data.eps.solar_wings[2]} />
                        <SolarWing id="D" power={data.eps.solar_wings[3]} />
                    </div>

                    <div className="mt-4 p-3 border-t border-white/10 text-center">
                        <span className="text-[8px] opacity-50 uppercase">Total Output</span>
                        <p className="text-xl font-black text-orion-purple3">
                        {data.eps.solar_wings.reduce((a, b) => a + b, 0).toFixed(2)} <span className="text-xs">kW</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-1/3 border-x border-white/15">
                    <EnergyCore charge={data.eps.battery_charge} netPower={data.eps.net_power} />
                </div>

                <div className="flex flex-col w-1/3">
                    <p className="text-[10px] text-center uppercase mb-6 opacity-60">Distribution</p>
                    <div className="border-b border-white/15 pb-4">
                        <EPSItems label="Avionics & HUD" wattage={1200} isActive={true} />
                        <EPSItems label="ECLSS Scrubber" wattage={500} isActive={data.eclss.is_scrubber_on} />
                        <EPSItems label="Propulsion Sys" wattage={1000} isActive={data.prop.is_engine_on} />
                        <EPSItems label="Comm & Comms" wattage={300} isActive={true} />
                    </div>
                    
                    <div className="flex justify-between pt-4 ">
                        <p className="text-xs uppercase tracking-tight">Total:</p>
                        <p>{data.eps.total_drain}W</p>
                    </div>
                </div>
            </div>
        </div>
    )
}