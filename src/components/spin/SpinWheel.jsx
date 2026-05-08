import React, { useMemo, useState } from 'react';
import { Sparkles, Coins, ShoppingBag, Smartphone, RotateCw, Banknote } from 'lucide-react';

// 8 segments (45° each). One grand-prize segment for visual impact.
export const SEGMENTS = [
  { id: 'cash5',   label: 'RM5',        sub: 'Cash',     icon: Banknote,    color: '#7C3AED', text: '#fff' },
  { id: 'tryagain',label: 'Try Again',  sub: '',         icon: RotateCw,    color: '#3B1170', text: '#C8B8E6' },
  { id: 'gx500',   label: '500',        sub: 'GX Coins', icon: Coins,       color: '#A855F7', text: '#fff' },
  { id: 'shopee',  label: 'RM10',       sub: 'Shopee',   icon: ShoppingBag, color: '#FF66C4', text: '#fff' },
  { id: 'cash5_2', label: 'RM5',        sub: 'Cash',     icon: Banknote,    color: '#7C3AED', text: '#fff' },
  { id: 'tryagain2',label:'Try Again',  sub: '',         icon: RotateCw,    color: '#3B1170', text: '#C8B8E6' },
  { id: 'gx500_2', label: '500',        sub: 'GX Coins', icon: Coins,       color: '#A855F7', text: '#fff' },
  { id: 'iphone',  label: 'iPhone 16',  sub: 'GRAND',    icon: Smartphone,  color: '#FBBF24', text: '#1A0B2E', grand: true },
];

const SEG_ANGLE = 360 / SEGMENTS.length;

// Build a single SVG sector path, centered at (cx,cy), radius r, from start->end deg.
function sectorPath(cx, cy, r, startDeg, endDeg) {
  const toXY = (deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const [x1, y1] = toXY(startDeg);
  const [x2, y2] = toXY(endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

export default function SpinWheel({ onResult, hasSpins = true }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const size = 300;
  const r = size / 2;

  const paths = useMemo(
    () =>
      SEGMENTS.map((seg, i) => {
        const start = i * SEG_ANGLE;
        const end = start + SEG_ANGLE;
        return { ...seg, d: sectorPath(r, r, r - 4, start, end), mid: start + SEG_ANGLE / 2 };
      }),
    [r]
  );

  const handleSpin = () => {
    if (spinning || !hasSpins) return;
    setSpinning(true);
    const winnerIdx = Math.floor(Math.random() * SEGMENTS.length);
    const winner = SEGMENTS[winnerIdx];
    // Pointer at top (12 o'clock). We want the chosen segment's mid to land at 0deg (top).
    // Final rotation = 6 full turns + (360 - mid)
    const target = 360 * 6 + (360 - (winnerIdx * SEG_ANGLE + SEG_ANGLE / 2));
    setRotation((prev) => prev + target);

    setTimeout(() => {
      setSpinning(false);
      onResult?.(winner);
    }, 4200);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Outer glow ring */}
      <div className="absolute -inset-6 rounded-full bg-violet-glow/20 blur-3xl pointer-events-none" />

      {/* Pointer */}
      <div className="relative z-10 -mb-2">
        <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[22px] border-l-transparent border-r-transparent border-t-amber-300 drop-shadow-[0_4px_10px_rgba(251,191,36,0.7)]" />
      </div>

      {/* Wheel */}
      <div
        className="relative rounded-full p-2 ring-2 ring-white/15"
        style={{
          background: 'conic-gradient(from 0deg, #9F5BFF, #FF66C4, #FBBF24, #9F5BFF)',
          boxShadow:
            '0 0 50px rgba(159,91,255,0.55), inset 0 0 20px rgba(0,0,0,0.4)',
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? 'transform 4.1s cubic-bezier(0.17, 0.67, 0.21, 1)'
              : 'none',
          }}
        >
          <defs>
            {paths.map((p) => (
              <radialGradient key={p.id} id={`grad-${p.id}`} cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor={p.grand ? '#FFF7C2' : p.color} stopOpacity="1" />
                <stop offset="100%" stopColor={p.color} stopOpacity="1" />
              </radialGradient>
            ))}
          </defs>

          {paths.map((p, i) => (
            <g key={p.id}>
              <path
                d={p.d}
                fill={`url(#grad-${p.id})`}
                stroke={p.grand ? '#FBBF24' : 'rgba(255,255,255,0.18)'}
                strokeWidth={p.grand ? 2 : 1}
              />
              {/* Label */}
              <g
                transform={`rotate(${p.mid} ${r} ${r}) translate(${r} ${r * 0.32})`}
              >
                <foreignObject x="-44" y="-22" width="88" height="56">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      color: p.text,
                      fontFamily: 'Inter, sans-serif',
                      textAlign: 'center',
                      lineHeight: 1.05,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                      <p.icon size={p.grand ? 18 : 14} strokeWidth={2.5} />
                    </div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: p.grand ? 12 : 11,
                        letterSpacing: p.grand ? 0.3 : 0,
                      }}
                    >
                      {p.label}
                    </div>
                    {p.sub && (
                      <div
                        style={{
                          fontSize: 8,
                          fontWeight: 600,
                          opacity: 0.85,
                          marginTop: 1,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                        }}
                      >
                        {p.sub}
                      </div>
                    )}
                  </div>
                </foreignObject>
              </g>
            </g>
          ))}

          {/* Inner studs for flair */}
          {paths.map((p, i) => {
            const angle = ((i * SEG_ANGLE - 90) * Math.PI) / 180;
            const x = r + (r - 14) * Math.cos(angle);
            const y = r + (r - 14) * Math.sin(angle);
            return <circle key={`stud-${i}`} cx={x} cy={y} r="2.5" fill="#fff" opacity="0.8" />;
          })}
        </svg>

        {/* Center hub with SPIN button */}
        <button
          onClick={handleSpin}
          disabled={spinning || !hasSpins}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full flex flex-col items-center justify-center font-extrabold text-white ring-4 ring-white/30 transition-all ${
            spinning || !hasSpins
              ? 'bg-bg-700 opacity-70 cursor-not-allowed'
              : 'bg-violet-grad shadow-[0_0_30px_rgba(159,91,255,0.8)] hover:scale-105 active:scale-95 animate-pulseGlow'
          }`}
        >
          <Sparkles size={16} className="mb-0.5" />
          <span className="text-[12px] tracking-wider">
            {spinning ? '...' : 'SPIN'}
          </span>
          <span className="text-[9px] font-semibold opacity-90 -mt-0.5">
            {spinning ? '' : 'NOW'}
          </span>
        </button>
      </div>

      {/* Bottom CTA (mirrors center button for accessibility) */}
      <button
        onClick={handleSpin}
        disabled={spinning || !hasSpins}
        className={`mt-6 w-full rounded-2xl py-3.5 text-[15px] font-bold tracking-wide transition-all ${
          spinning || !hasSpins
            ? 'bg-white/10 text-text-muted cursor-not-allowed'
            : 'bg-violet-grad text-white shadow-[0_10px_30px_rgba(124,58,237,0.6)] hover:brightness-110 active:scale-[0.98]'
        }`}
      >
        {!hasSpins ? 'No Spins Available' : spinning ? 'Spinning…' : 'SPIN NOW'}
      </button>
    </div>
  );
}
