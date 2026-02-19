export default function SolarWing ({ id, power }) {
    return(
        <div className="flex flex-col items-center p-2 border border-white/5 bg-white/5 rounded-sm">
            <div className="flex justify-between w-full text-[8px] opacity-50 mb-1">
            <span>WING {id}</span>
            <span>{power.toFixed(2)} kW</span>
            </div>
            
            <div className="grid grid-cols-4 gap-0.5 w-full h-8">
            {[...Array(8)].map((_, i) => (
                <div 
                key={i} 
                className={`h-full ${power > 1 ? 'bg-orion-purple3' : 'bg-white/10'}`} 
                />
            ))}
            </div>
        </div>
    )
  
};