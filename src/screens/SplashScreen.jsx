import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('enter'); // enter | hold | exit

  useEffect(() => {
    // Total visible: 3 s  →  fade-out starts at 2500ms, screen calls onDone at 3000ms
    const hold = setTimeout(() => setPhase('hold'), 200);
    const exit = setTimeout(() => setPhase('exit'), 2500);
    const done = setTimeout(() => onDone(),         3000);
    return () => { clearTimeout(hold); clearTimeout(exit); clearTimeout(done); };
  }, [onDone]);

  return (
    <div
      className={`absolute inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'radial-gradient(120% 80% at 0% 0%, #4A148C 0%, transparent 55%), radial-gradient(120% 100% at 100% 100%, #2A1352 0%, transparent 60%), linear-gradient(180deg, #1A0B2E 0%, #0E0518 100%)' }}
    >
      {/* Ambient blobs */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-violet-glow/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-accent-pink/20 blur-3xl pointer-events-none" />

      {/* Logo image */}
      <div
        className={`relative transition-all duration-700 ${
          phase === 'enter' ? 'opacity-0 scale-90 translate-y-3' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Subtle glow behind the logo */}
        <div className="absolute inset-0 rounded-full bg-violet-glow/30 blur-3xl scale-125 pointer-events-none" />
        <img
          src="/gxbank-logo.jpg"
          alt="GXBank"
          className="relative h-28 w-28 drop-shadow-[0_0_28px_rgba(159,91,255,0.7)]"
          draggable={false}
        />
      </div>

      {/* Wordmark + slogan */}
      <div
        className={`mt-7 text-center transition-all duration-700 delay-200 ${
          phase === 'enter' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
        }`}
      >
        <p className="text-[30px] font-black tracking-tight text-white leading-none">
          GX<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Bank</span>
        </p>
        <p className="mt-2 text-[13px] text-text-secondary tracking-wide">
          Your wealth, intelligently managed.
        </p>
      </div>

      {/* Animated dots */}
      <div
        className={`absolute bottom-14 transition-all duration-700 delay-400 ${
          phase === 'enter' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <Dot delay="0s" />
          <Dot delay="0.18s" />
          <Dot delay="0.36s" />
        </div>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.75); }
          40%            { opacity: 1;   transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function Dot({ delay }) {
  return (
    <span
      className="h-[7px] w-[7px] rounded-full"
      style={{
        background: 'linear-gradient(135deg, #9F5BFF, #FF66C4)',
        animation: `dotPulse 1.2s ${delay} ease-in-out infinite`,
      }}
    />
  );
}
