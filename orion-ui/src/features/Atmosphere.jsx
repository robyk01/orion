export default function AtmosphereDonut ({ value, label, color }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative w-32 h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background Track */}
        <circle
          cx="50" cy="50" r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="8"
        />
        {/* Data Ring */}
        <circle
          cx="50" cy="50" r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
          strokeLinecap="round"
        />
      </svg>
      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black">{value.toFixed(1)}%</span>
        <span className="text-[8px] uppercase tracking-tighter opacity-60">{label}</span>
      </div>
    </div>
  );
};