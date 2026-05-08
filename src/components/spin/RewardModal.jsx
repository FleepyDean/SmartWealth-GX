import React from 'react';
import { X, Sparkles, PartyPopper, RotateCw } from 'lucide-react';

const CONFETTI_COLORS = ['#FBBF24', '#FF66C4', '#9F5BFF', '#3DDC97', '#fff'];

function Confetti() {
  const pieces = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const dur = 1.4 + Math.random() * 1.4;
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const size = 6 + Math.random() * 6;
        const rot = Math.random() * 360;
        return (
          <span
            key={i}
            className="absolute top-0"
            style={{
              left: left + '%',
              width: size,
              height: size * 0.4,
              background: color,
              transform: 'rotate(' + rot + 'deg)',
              animation: 'confettiFall ' + dur + 's ' + delay + 's ease-in forwards',
              borderRadius: 2,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(520px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function RewardModal({ open, prize, onAddToPocket, onClose }) {
  if (!open || !prize) return null;
  const isTryAgain = prize.id?.includes('tryagain');
  const isGrand = prize.grand;

  const headline = isTryAgain
    ? 'So close! Try again next time'
    : isGrand
    ? 'JACKPOT! You won the iPhone 16 Pro!'
    : `Congratulations! You won a ${prize.label}${prize.sub ? ' ' + prize.sub : ''}!`;

  const PrizeIcon = prize.icon || Sparkles;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-5">
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-[3px] animate-floatUp"
      />

      <div className="relative w-full max-w-sm animate-floatUp">
        <div
          className={`glass relative overflow-hidden rounded-3xl p-6 ring-1 ${
            isGrand ? 'ring-amber-300/50' : 'ring-white/15'
          } shadow-[0_20px_70px_rgba(0,0,0,0.7)]`}
        >
          {/* Celebration backdrop */}
          {!isTryAgain && <Confetti />}
          <div
            className={`pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full blur-3xl ${
              isGrand ? 'bg-amber-300/40' : 'bg-violet-glow/35'
            }`}
          />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 text-text-muted hover:text-white"
          >
            <X size={18} />
          </button>

          <div className="relative flex flex-col items-center text-center">
            {/* Prize medallion */}
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full blur-2xl ${
                  isGrand ? 'bg-amber-300/60' : 'bg-violet-glow/50'
                }`}
              />
              <div
                className={`relative h-24 w-24 rounded-full flex items-center justify-center ring-4 ring-white/20 ${
                  isTryAgain
                    ? 'bg-bg-700'
                    : isGrand
                    ? 'bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 animate-pulseGlow'
                    : 'bg-violet-grad animate-pulseGlow'
                }`}
              >
                {isTryAgain ? (
                  <RotateCw size={40} className="text-text-secondary" />
                ) : (
                  <PrizeIcon
                    size={42}
                    className={isGrand ? 'text-bg-900' : 'text-white'}
                    strokeWidth={2.2}
                  />
                )}
              </div>
            </div>

            {/* Headline */}
            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
              {!isTryAgain && <PartyPopper size={12} className="text-amber-300" />}
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                {isTryAgain ? 'Better luck next spin' : isGrand ? 'Grand Prize' : 'You Won'}
              </span>
            </div>
            <h3 className="mt-3 text-[20px] font-extrabold text-white leading-tight">
              {headline}
            </h3>
            {!isTryAgain && (
              <p className="mt-2 text-[13px] text-text-secondary leading-snug">
                {isGrand
                  ? "We'll be in touch to deliver your prize. Keep saving to unlock more chances!"
                  : 'Add it straight to your saving pocket and keep building that streak.'}
              </p>
            )}

            {/* Actions */}
            <div className="mt-6 w-full flex flex-col gap-2">
              {isTryAgain ? (
                <button
                  onClick={onClose}
                  className="w-full rounded-2xl bg-violet-grad py-3 text-[14px] font-semibold text-white shadow-[0_8px_28px_rgba(124,58,237,0.55)] hover:brightness-110"
                >
                  Keep Saving
                </button>
              ) : (
                <button
                  onClick={onAddToPocket}
                  className="w-full rounded-2xl bg-violet-grad py-3 text-[14px] font-semibold text-white shadow-[0_8px_28px_rgba(124,58,237,0.55)] hover:brightness-110"
                >
                  Add to Saving Pocket
                </button>
              )}
              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-transparent ring-1 ring-white/20 py-3 text-[14px] font-semibold text-white hover:bg-white/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
