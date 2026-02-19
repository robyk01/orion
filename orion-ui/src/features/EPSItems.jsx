export default function EPSItems({label, wattage, isActive}){
    return(
        <div className="flex flex-col gap-1 mb-4">
            <div className="flex justify-between text-xs uppercase tracking-tight">
            <span className={isActive ? "text-white" : "text-white/30"}>{label}</span>
            <span className={isActive ? "text-orion-purple3" : "text-white/30"}>
                {isActive ? `${wattage} W` : "OFF"}
            </span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                    className={`h-full transition-all duration-500 ${isActive ? 'bg-orion-purple3' : 'bg-transparent'}`}
                    style={{ width: isActive ? `${(wattage / 3000) * 100}%` : '0%' }}
                />
            </div>
        </div>
    )
}