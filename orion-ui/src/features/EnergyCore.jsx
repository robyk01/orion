
export default function EnergyCore({charge, netPower}){
    const isDraining = netPower < 0;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-[10px] uppercase tracking-widest mb-6 opacity-60">Energy Core</p>
      
      <div className="relative w-24 h-64 bg-black/40 border-2 border-white/10 rounded-sm p-1">
        <div 
          className={`absolute bottom-1 left-1 right-1 transition-all duration-1000 ease-in-out ${isDraining ? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-orion-purple3 shadow-[0_0_20px_rgba(96,165,250,0.4)]'}`}
          style={{ height: `calc(${charge}% - 8px)` }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-white drop-shadow-md">{charge.toFixed(1)}%</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className={`text-lg font-mono font-bold ${isDraining ? 'text-orange-400' : 'text-orion-purple3'}`}>
          {isDraining ? '▼' : '▲'} {Math.abs(netPower).toFixed(0)} W
        </p>
        <span className="text-[8px] uppercase opacity-50">{isDraining ? 'Discharging' : 'Charging'}</span>
      </div>
    </div>
  );
}