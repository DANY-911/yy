
import React from 'react';
import { Prize } from '../types';

interface SpinWheelProps {
  rotation: number;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ rotation }) => {
  const prizes: Prize[] = [
    { label: "ลด 20 บาท", color: "#0a0a0a" },
    { label: "ส่วนลด 50%", color: "#0077b3" },
    { label: "ส่วนลด 100.-", color: "#1a1a1a" },
    { label: "ส่งฟรีทุกออเดอร์", color: "#00d9e6" },
    { label: "LIMITED BADGE", color: "#262626" },
    { label: "ลด 50 บาท", color: "#0088cc" }
  ];

  const size = prizes.length;
  const step = 360 / size;

  return (
    <div className="relative w-80 h-80 md:w-[620px] md:h-[620px] flex items-center justify-center group">
      {/* Atmosphere Glow */}
      <div className="absolute inset-[-60px] bg-gradient-to-br from-[#0088cc]/10 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity duration-1000"></div>
      
      {/* Outer Scale Calibration */}
      <div className="absolute inset-[-20px] rounded-full pointer-events-none opacity-30 select-none">
        {[...Array(72)].map((_, i) => (
          <div 
            key={i} 
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1px] origin-[0_330px] md:origin-[0_330px] ${i % 6 === 0 ? 'h-5 bg-[#00f3ff] w-[2px]' : 'h-3 bg-zinc-300'}`}
            style={{ transform: `rotate(${i * 5}deg)` }}
          />
        ))}
      </div>

      {/* Pointer Unit - Laser Precision Design */}
      <div className="absolute top-[-45px] left-1/2 -translate-x-1/2 z-40">
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-20 bg-zinc-900 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center border border-zinc-700/80 p-1">
             <div className="w-10 h-1 bg-zinc-800 rounded-full mb-3"></div>
             <div className="w-3 h-10 bg-gradient-to-b from-[#00f3ff] via-[#00f3ff] to-transparent rounded-full shadow-[0_0_20px_#00f3ff] animate-pulse"></div>
          </div>
          <div className="w-8 h-8 bg-[#00f3ff] rotate-45 -mt-4 shadow-[0_0_30px_#00f3ff] border-[3px] border-white ring-4 ring-black/5"></div>
          {/* Virtual Target Line */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1.5px] h-48 bg-gradient-to-b from-[#00f3ff] to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* The Wheel Container */}
      <div 
        className="w-full h-full rounded-full overflow-hidden transition-transform duration-[7000ms] cubic-bezier(0.1, 0, 0, 1) shadow-[0_80px_150px_-30px_rgba(0,0,0,0.4)] ring-[18px] ring-white ring-inset relative"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full scale-[1.03]">
          <defs>
            {/* Elegant Radial Reflection */}
            <radialGradient id="glassReflection" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.25" />
              <stop offset="60%" stopColor="transparent" stopOpacity="0" />
              <stop offset="100%" stopColor="black" stopOpacity="0.3" />
            </radialGradient>

            {/* Premium Metallic Panel Colors */}
            {prizes.map((p, i) => (
              <linearGradient id={`panel-${i}`} key={i} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={p.color} />
                <stop offset="100%" stopColor={p.color} stopOpacity="0.8" />
              </linearGradient>
            ))}
          </defs>

          {prizes.map((prize, i) => {
            const startAngle = i * step;
            const endAngle = (i + 1) * step;
            const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
            const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
            const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
            const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

            return (
              <g key={i} className="select-none">
                {/* Segment Path with added Stroke for "Borders" */}
                <path
                  d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                  fill={`url(#panel-${i})`}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.4"
                  className="transition-opacity duration-300"
                />
                
                {/* Typography Layer - Switched to Inter (Sans-serif) Bold White */}
                <text
                  x="50"
                  y="15"
                  transform={`rotate(${startAngle + step / 2}, 50, 50)`}
                  fill="white"
                  fontSize="2.8"
                  fontWeight="900"
                  textAnchor="middle"
                  className="font-inter uppercase tracking-wider"
                  style={{ 
                    filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.6))',
                  }}
                >
                  {prize.label}
                </text>
              </g>
            );
          })}

          {/* Depth Overlays */}
          <circle cx="50" cy="50" r="50" fill="url(#glassReflection)" pointerEvents="none" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" pointerEvents="none" />
        </svg>

        {/* Global Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-black/10 pointer-events-none rounded-full"></div>
      </div>

      {/* Central Command Hub */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div className="relative w-28 h-28 md:w-44 md:h-44 flex items-center justify-center">
            {/* Outer Hub Case */}
            <div className="absolute inset-0 rounded-full bg-white shadow-2xl border border-zinc-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <div className="w-[88%] h-[88%] rounded-full bg-zinc-900 border-[6px] border-white shadow-inner flex items-center justify-center relative overflow-hidden">
                    {/* Animated Energy Field */}
                    <div className="absolute inset-0 opacity-30 bg-[conic-gradient(#00f3ff_0deg,#0088cc_120deg,#00f3ff_240deg,#0088cc_360deg)] animate-[spin_3s_linear_infinite]"></div>
                    
                    {/* Brand Core */}
                    <div className="relative z-10 flex flex-col items-center">
                        <span className="font-syncopate text-white font-black text-2xl md:text-5xl tracking-tighter drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">Y</span>
                        <div className="w-10 h-[2.5px] bg-[#00f3ff] mt-2 shadow-[0_0_15px_#00f3ff]"></div>
                    </div>
                </div>
            </div>
            
            {/* Perimeter Hardware Detail */}
            {[...Array(8)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-2.5 h-2.5 rounded-full bg-zinc-200 border border-zinc-300 shadow-sm"
                    style={{
                        transform: `rotate(${i * 45}deg) translateY(-52px)`
                    }}
                />
            ))}
        </div>
      </div>

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
         <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-40"></div>
         <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-[#00f3ff] rounded-full animate-ping opacity-20"></div>
      </div>
    </div>
  );
};

export default SpinWheel;
