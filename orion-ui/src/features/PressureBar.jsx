export default function PressureGauge ({ text, threshold, warning, critical, value }) {
  const heightPercent = (value / threshold) * 100;
  
  const getBarColor = (val) => {
    if (val < critical) return "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
    if (val < warning) return "bg-orange-400";
    return "bg-orion-purple3";
  };

  return (
    <div className="flex flex-col items-center gap-4 h-64">
      <p className="text-[9px] uppercase tracking-widest opacity-60">{text}</p>
      
      <div className="relative w-4 h-full bg-black/40 rounded-full border border-white/5 overflow-hidden">
        {/* The Pressure Level */}
        <div 
          className={`absolute bottom-0 w-full transition-all duration-700 ease-out ${getBarColor(value)}`}
          style={{ height: `${Math.min(100, heightPercent)}%` }}
        />
        
        <div className="absolute bottom-[98%] w-full border-t border-white/40 border-dashed" />
      </div>

      <div className="flex flex-col items-center">
        <span className="text-lg font-black">{value.toFixed(1)}</span>
        <span className="text-[8px] opacity-60">PSI</span>
      </div>
    </div>
  );
};