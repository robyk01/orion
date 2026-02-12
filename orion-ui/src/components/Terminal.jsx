
export default function Terminal(){
    return(
        <div className="bg-linear-to-b from-white/5 to-transparent flex flex-col justify-between w-full h-full p-4 text-xs font-jetbrains rounded-sm border-t border-white/10 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
                <span>ECLSS: <span className="text-white/60">Oxygen level dropped to 20%.</span></span>
                <span>GNC: <span className="text-white/60">200km until reaching destination.</span></span>
                <span>EPS: <span className="text-white/60">Solar panels efficiency decreased.</span></span>
            </div>
            
            <input className="bg-black/40 p-2 border border-white/10 focus:outline focus:outline-orion-purple3" type="text" placeholder="Type here.." />
        </div>
    )
}