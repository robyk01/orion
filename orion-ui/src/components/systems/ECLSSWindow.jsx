
export default function ECLSSWindow(){
    return(
        <div className="w-[60%] h-[60%] flex flex-col rounded-sm bg-linear-to-br from-orion-pink/10 to-orion-void/10 backdrop-blur-lg border border-white/10 p-6">

            {/* Header */}
            <div className="flex flex-col gap-1 mt-6">
                <h2 className="text-xl font-orbitron uppercase ">Intel</h2>
                <span className="text-[10px] text-white/40">Information and Comms</span>
            </div>
        </div>
    )
}