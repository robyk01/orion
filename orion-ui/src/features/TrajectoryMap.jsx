export default function TrajectoryMap ({ percent, total_distance, distance, velocity }) {
  const formatTime = (seconds) => {
    if (seconds <= 0 || !isFinite(seconds)) return "00:00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
  };

  const time_left = (total_distance - distance) / velocity

  return (
    <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-sm overflow-hidden">
      <svg className="w-full h-full px-10">
        {/* Orbital Path */}
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" strokeDasharray="4" opacity="0.2" />
        
        {/* Earth and Destination */}
        <circle cx="0" cy="50%" r="4" fill="cyan" />
        <circle cx="100%" cy="50%" r="4" fill="orange" />
        
        {/* Ship */}
        <g style={{ transform: `translate(${percent}%, 50%)` }}>
           <path d="M-5 -5 L5 0 L-5 5 " fill="#ff0055" className="drop-shadow-[0_0_5px_#ff0055]" />
        </g>
      </svg>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50">
          <p>Time left: {formatTime(time_left)} </p>
      </div>
    </div>
  );
};