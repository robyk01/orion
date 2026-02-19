export default function TankLevel ({ label, percentage, colorClass }) {
  return (
    <div className="flex flex-col gap-2 h-64">
      <div className="flex justify-center">
        <span className="text-[10px] uppercase tracking-widest text-white/50">{label}</span>
      </div>
      
      {/* Container */}
      <div className="h-full bg-black/40 border border-white/10 rounded-sm p-1 relative">
        <div 
          className={`absolute bottom-1 left-1 right-1 transition-all duration-1000 ease-in-out rounded-xs ${colorClass} ${percentage < 15 ? 'animate-pulse' : ''}`}
          style={{ height: `calc(${percentage}% - 8px)` }}
        />
        
        <div className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent pointer-events-none" />
      </div>

      <div className="flex justify-center">
        <span className="text-sm font-black text-white">{percentage}%</span>
      </div>
      
    </div>
  );
};