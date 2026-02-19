import AtmosphereDonut from "../../features/Atmosphere";
import PressureGauge from "../../features/PressureBar";
import TankLevel from "../../features/TankBar"
import ScrubberModule from "../../features/Scrubber";

export default function ECLSSWindow({ onToggleECLSS, data }){
    const o2Color = data.oxygen < 19.5 ? "#f87171" : "#876aff"; 
    return(
        <div className="w-[60%] h-[60%] flex flex-col rounded-sm bg-linear-to-br from-orion-pink/10 to-orion-void/10 backdrop-blur-lg border border-white/10 p-6">

            {/* Header */}
            <div className="flex flex-col gap-1 mt-6">
                <h2 className="text-xl font-orbitron uppercase ">ECLSS</h2>
                <span className="text-[10px] text-white/40">Life Support</span>

                <button
                    className="absolute right-6 bg-red-400 rounded-sm text-black px-1.5 text-sm"
                    onClick={onToggleECLSS}>
                        <b>x</b>
                </button>
            </div>


            <div className="flex justify-between mt-6 text-white text-[10px] uppercase tracking-widest mb-4 gap-8 ">

                <div className="flex flex-col items-center w-full space-y-4">
                    <p>Oxygen Components</p>
                    <div className="flex">
                        <AtmosphereDonut 
                        value={data.oxygen} 
                        label="Oxygen" 
                        color={o2Color} 
                        />

                        <AtmosphereDonut 
                        value={data.nitrogen} 
                        label="Nitrogen" 
                        color={o2Color} 
                        />
                    </div>

                    <div className="flex flex-col space-y-4 items-center">
                        <p>Scrubber</p>
                        <div className="flex justify-center w-full gap-12">
                            <ScrubberModule isActive={data.is_scrubber_on} co2Level={data.co2} powerDraw={500} />
                        </div>
                    </div>
                    
                </div>

                <div className="flex flex-col w-full space-y-4 items-center border-r border-l border-white/15 ">
                    <p>Pressure</p>
                    <div className="flex justify-center w-full gap-12 ">
                        <PressureGauge text={"Cabin"} value={data.pressure} threshold={15} warning={12} critical={10}/>

                        <PressureGauge text={"Oxygen Tank"} value={3200} threshold={5000} warning={400} critical={200}/>

                        <PressureGauge text={"Nitrogen"} value={4500} threshold={5000} warning={400} critical={200}/>
                    </div>
                </div>

                <div className="flex flex-col w-full space-y-4 items-center">
                    <p>Tank Levels</p>
                    <div className="flex justify-center w-full gap-12">
                        <TankLevel label={"Oxygen Tank"} percentage={data.oxygen_tank} colorClass={"bg-blue-400"} />

                        <TankLevel label={"Nitrogen Tank"} percentage={data.nitrogen_tank} colorClass={"bg-white"} />
                    </div>
                </div>

                
            </div>
        </div>
    )
}