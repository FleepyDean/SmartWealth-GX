import React from 'react';
import { Check, Ticket } from 'lucide-react';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function WeeklyTracker({ completed = 5, spins = 1 }) {
  return (
    <div className="card-hi rounded-3xl bg-card p-5 ring-1 ring-white/5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[18px] font-bold text-white tracking-tight">
            Weekly Savings Challenge
          </p>
          <p className="mt-1 text-[12px] text-text-secondary">
            Save RM30 daily to earn a spin!{' '}
            <span className="text-white font-semibold">({completed}/7 Days completed)</span>
          </p>
        </div>
        <SpinsBadge count={spins} />
      </div>

      {/* Stepper row */}
      <div className="mt-5 relative">
        {/* connector */}
        <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-glow via-accent-pink to-amber-300 transition-all duration-700"
            style={{ width: `${(Math.min(completed, 7) / 7) * 100}%` }}
          />
        </div>
        <div className="relative flex items-center justify-between">
          {DAYS.map((d, i) => {
            const done = i < completed;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold ring-1 transition-all ${
                    done
                      ? 'bg-violet-grad ring-white/30 text-white shadow-[0_0_14px_rgba(159,91,255,0.7)]'
                      : 'bg-bg-700 ring-white/10 text-text-muted'
                  }`}
                >
                  {done ? <Check size={14} strokeWidth={3} /> : d}
                </div>
                <span className={`text-[9px] font-medium ${done ? 'text-white/80' : 'text-text-muted'}`}>
                  {d}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SpinsBadge({ count }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-2xl bg-amber-300/30 blur-xl" />
      <div className="relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 px-3 py-2 ring-1 ring-amber-200/50 shadow-[0_8px_24px_rgba(251,191,36,0.45)] animate-pulseGlow">
        <Ticket size={16} className="text-bg-900" strokeWidth={2.5} />
        <div className="leading-tight">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-bg-900/70">
            Available Spins
          </p>
          <p className="text-[16px] font-extrabold text-bg-900 -mt-0.5">{count}</p>
        </div>
      </div>
    </div>
  );
}
