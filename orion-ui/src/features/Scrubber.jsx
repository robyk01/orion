export default function ScrubberModule ({ isActive, co2Level, powerDraw }) {
  return (
    <div className={`p-4 rounded-sm border bg-black/40 transition-all duration-500 ${isActive ? 'border-orion-purple3 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-white/10'}`}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-[10px] uppercase tracking-widest opacity-60">CO2 Scrubber</p>
        <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-orion-purple3 animate-pulse' : 'bg-white/20'}`} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-[8px] uppercase opacity-50">Current Load</span>
          <span className={`text-sm font-bold ${isActive ? 'text-orange-400' : 'text-white/40'}`}>
            {isActive ? `+${powerDraw} kW` : '0.0 kW'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase opacity-50">State</span>
          <span className="text-sm font-bold uppercase">{isActive ? 'Scrubbing' : 'Standby'}</span>
        </div>
      </div>

      {isActive && (
        <div className="mt-4 flex gap-1 justify-center">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="w-1 h-4 bg-orion-purple3/40 rounded-full animate-bounce" 
              style={{ animationDelay: `${i * 0.2}s` }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};