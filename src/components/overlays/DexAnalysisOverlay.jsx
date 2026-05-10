import React, { useEffect, useState } from 'react';
import { X, Sparkles, TrendingDown, ScanLine } from 'lucide-react';

const SCAN_DURATION = 2200;

export default function DexAnalysisOverlay({
  open,
  image,
  mealName = 'Nasi Goreng',
  currentPrice = '20.00',
  suggestedPrice = '8.00',
  savingsAmount = '12.00',
  suggestion = 'Next time, try Nasi Goreng Meranti near your campus for RM8. You could have saved RM12 for your Langkawi trip.',
  onConfirm,
  onRetake,
}) {
  const [phase, setPhase] = useState('scanning'); // 'scanning' | 'result'

  useEffect(() => {
    if (!open) return;
    setPhase('scanning');
    const t = setTimeout(() => setPhase('result'), SCAN_DURATION);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const savingsPercent = Math.round((parseFloat(savingsAmount) / parseFloat(currentPrice)) * 100);

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        onClick={onRetake}
        className="absolute inset-0 bg-black/65 backdrop-blur-[3px] animate-floatUp"
      />

      {/* Modal */}
      <div className="relative w-full max-h-[90vh] overflow-y-auto no-scrollbar animate-floatUp">
        <div className="glass card-hi rounded-t-3xl p-6 ring-1 ring-white/15 shadow-[0_-20px_70px_rgba(0,0,0,0.7)]">
          {/* Close Button */}
          <button
            onClick={onRetake}
            className="absolute right-5 top-5 z-10 h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/15 text-white/80 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className="text-white">
            {/* Image Preview with scan animation */}
            {image && (
              <div className="mb-5">
                <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-violet/20 to-magenta/20 ring-1 ring-white/10 overflow-hidden">
                  {typeof image === 'string' && image.length > 0 ? (
                    <img src={image} alt={mealName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-[48px] mb-2">📸</p>
                        <p className="text-[13px] text-text-secondary">{mealName}</p>
                      </div>
                    </div>
                  )}

                  {/* Scanning overlay */}
                  {phase === 'scanning' && (
                    <div className="absolute inset-0 bg-black/30">
                      {/* Corner brackets */}
                      <Bracket pos="top-left" />
                      <Bracket pos="top-right" />
                      <Bracket pos="bottom-left" />
                      <Bracket pos="bottom-right" />

                      {/* Scan line */}
                      <div className="absolute inset-x-2 h-[2px] bg-gradient-to-r from-transparent via-violet-glow to-transparent shadow-[0_0_12px_rgba(159,91,255,0.9)] scan-line" />

                      {/* Detection dots — pulse at food items */}
                      <DetectionDot x="26%" y="42%" delay="0.4s" label="Food" />
                      <DetectionDot x="62%" y="55%" delay="0.9s" label="Side" />

                      {/* Status text */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 rounded-lg bg-black/55 backdrop-blur px-2.5 py-1.5 ring-1 ring-white/10">
                        <ScanLine size={12} className="text-violet-glow animate-pulse" />
                        <span className="text-[11px] font-semibold text-white">Dex is analysing…</span>
                        <span className="ml-auto text-[10px] text-violet-glow font-mono typing-dots">detecting</span>
                      </div>
                    </div>
                  )}
                </div>

                {phase === 'scanning' && (
                  <p className="mt-2.5 text-center text-[11px] text-text-muted">
                    Identifying items · Estimating fair price · Checking savings…
                  </p>
                )}
              </div>
            )}

            {/* Content visible only after scan completes */}
            <div
              className={`transition-all duration-500 ${
                phase === 'result' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none h-0 overflow-hidden'
              }`}
            >
            {/* AI Analysis Card */}
            <div className="mb-6 rounded-2xl bg-gradient-to-br from-violet-glow/20 to-magenta/10 ring-1 ring-violet-glow/40 p-4">
              <div className="flex items-start gap-3">
                {/* AI Icon */}
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-glow to-accent-pink flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(159,91,255,0.4)]">
                  <Sparkles size={20} className="text-white" strokeWidth={2} />
                </div>

                {/* Analysis Content */}
                <div className="flex-1">
                  <p className="text-[12px] font-bold uppercase tracking-widest text-violet-glow mb-2">
                    Dex's Insight
                  </p>
                  <p className="text-[13px] text-text-secondary leading-relaxed">
                    RM{currentPrice} for {mealName}? That's a bit steep! 📉 {suggestion}
                  </p>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              {/* Current Price */}
              <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-3.5">
                <p className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold mb-1">
                  You Paid
                </p>
                <p className="text-[20px] font-bold text-white">RM{currentPrice}</p>
              </div>

              {/* Suggested Price */}
              <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-3.5">
                <p className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold mb-1">
                  Could Pay
                </p>
                <p className="text-[20px] font-bold text-white">RM{suggestedPrice}</p>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="mb-6 rounded-2xl bg-gradient-to-r from-accent-mint/20 to-emerald-500/20 ring-1 ring-accent-mint/40 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={16} className="text-accent-mint" />
                <p className="text-[12px] font-bold uppercase tracking-widest text-accent-mint">
                  Potential Savings
                </p>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-[28px] font-extrabold text-white">RM{savingsAmount}</p>
                <p className="text-[12px] font-semibold text-accent-mint">{savingsPercent}% off</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className="w-full rounded-2xl bg-violet-grad py-3.5 text-[14px] font-bold text-white shadow-[0_8px_28px_rgba(124,58,237,0.55)] hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Log Expense & Update Budget
              </button>
              <button
                onClick={onRetake}
                className="w-full rounded-2xl bg-transparent ring-1 ring-white/20 py-3 text-[14px] font-semibold text-white hover:bg-white/5 active:scale-[0.98] transition-all"
              >
                Retake Photo
              </button>
            </div>

            {/* Footer Note */}
            <p className="mt-4 text-center text-[11px] text-text-muted">
              AI suggestions are based on local market rates and your savings goals.
            </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanSweep {
          0%   { top: 4%;  opacity: 0; }
          10%  { opacity: 1; }
          50%  { top: 96%; opacity: 1; }
          55%  { top: 96%; opacity: 0; }
          60%  { top: 4%;  opacity: 0; }
          70%  { opacity: 1; }
          100% { top: 96%; opacity: 1; }
        }
        .scan-line { animation: scanSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        @keyframes detectPulse {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
          60%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes typingDots {
          0%, 20%   { content: 'detecting'; }
          40%       { content: 'detecting.'; }
          60%       { content: 'detecting..'; }
          80%, 100% { content: 'detecting...'; }
        }
        .typing-dots::after {
          content: '';
          display: inline-block;
          width: 0.9em;
          text-align: left;
          animation: typingDots 1.2s steps(4, end) infinite;
        }
      `}</style>
    </div>
  );
}

function Bracket({ pos }) {
  const corner = {
    'top-left': 'top-2 left-2 border-t-2 border-l-2 rounded-tl-md',
    'top-right': 'top-2 right-2 border-t-2 border-r-2 rounded-tr-md',
    'bottom-left': 'bottom-2 left-2 border-b-2 border-l-2 rounded-bl-md',
    'bottom-right': 'bottom-2 right-2 border-b-2 border-r-2 rounded-br-md',
  }[pos];
  return (
    <span
      className={`absolute ${corner} h-4 w-4 border-violet-glow/80`}
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    />
  );
}

function DetectionDot({ x, y, delay, label }) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        animation: `detectPulse 0.6s ${delay} cubic-bezier(0.2, 0.9, 0.3, 1.4) both`,
      }}
    >
      <div className="relative">
        <span className="absolute inset-0 h-5 w-5 rounded-full bg-violet-glow/40 animate-ping" />
        <span className="relative block h-5 w-5 rounded-full bg-violet-glow ring-2 ring-white shadow-[0_0_12px_rgba(159,91,255,0.8)]" />
        <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-white bg-violet-glow/90 px-1.5 py-0.5 rounded-md">
          {label}
        </span>
      </div>
    </div>
  );
}
