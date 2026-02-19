
export default function Menu({ onToggleGNC, onToggleEPS, onToggleIntel, onToggleECLSS }){
    return(
        <>
            <div className="bg-orion-void/5 flex justify-center items-center w-fit border border-white/20 rounded-sm px-8 pt-3 pb-1 justify-self-center backdrop-blur-sm">
                <div className="flex gap-8">
                    <button
                    type="button"
                    className="rounded-sm"
                    aria-label="Open GNC menu"
                    onClick={onToggleGNC}
                    >
                        <img className="rounded-sm border-2 border-transparent hover:border-orion-pink hover:scale-115 origin-bottom transition-all duration-100" src="/gnc.jpg" alt="GNC" />
                        <span className="text-xs text-white/60">GNC</span>
                    </button>

                    <button
                    type="button"
                    className="rounded-sm"
                    aria-label="Open EPS menu"
                    onClick={onToggleEPS}
                    >
                        <img className="rounded-sm border-2 border-transparent hover:border-orion-pink hover:scale-115 origin-bottom transition-all duration-100" src="/eps.jpg" alt="GNC" />
                        <span className="text-xs text-white/60">EPS</span>
                    </button>

                    <button
                    type="button"
                    className="rounded-sm"
                    aria-label="Open ECLSS menu"
                    onClick={onToggleECLSS}
                    >
                        <img className="rounded-sm border-2 border-transparent hover:border-orion-pink hover:scale-115 origin-bottom transition-all duration-100" src="/bio.jpg" alt="GNC" />
                        <span className="text-xs text-white/60">ECLSS</span>
                    </button>

                    <button
                    type="button"
                    className="rounded-sm"
                    aria-label="Open INTEL menu"
                    onClick={onToggleIntel}
                    >
                        <img className="rounded-sm border-2 border-transparent hover:border-orion-pink hover:scale-115 origin-bottom transition-all duration-100" src="/intel.jpg" alt="GNC" />
                        <span className="text-xs text-white/60">INTEL</span>
                    </button>
                </div>
            </div>

        </>
    )
}