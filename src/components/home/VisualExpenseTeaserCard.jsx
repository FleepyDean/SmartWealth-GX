import React from 'react';
import { ChevronRight, Camera, Sparkles } from 'lucide-react';

export default function VisualExpenseTeaserCard({ onOpen, recentExpenses = 3, totalSaved = 45 }) {
  return (
    <button
      onClick={onOpen}
      className="w-full px-5 mt-5 text-left"
    >
      <div className="card-hi relative overflow-hidden rounded-3xl p-5 ring-1 ring-white/5 bg-[linear-gradient(135deg,#2A1352_0%,#3B1170_60%,#4A148C_100%)]">
        {/* Ambient glow */}
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-violet-glow/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-magenta/20 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-glow to-accent-pink flex items-center justify-center shadow-[0_6px_22px_rgba(159,91,255,0.55)]">
                <Camera size={22} className="text-white" strokeWidth={2.4} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-white leading-tight">Visual Expenses</p>
                <p className="text-[11px] text-white/80">Snap & track meals</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-white/60 group-hover:text-white transition-colors" />
          </div>

          {/* Mini Gallery Preview */}
          <div className="mb-3 flex gap-1.5">
            {['🍜', '☕', '🍕'].map((emoji, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-[14px]"
              >
                {emoji}
              </div>
            ))}
            {recentExpenses > 3 && (
              <div className="h-8 w-8 rounded-lg bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-[10px] font-bold text-text-secondary">
                +{recentExpenses - 3}
              </div>
            )}
          </div>

          {/* Savings Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 bg-white/10 ring-1 ring-white/15">
            <Sparkles size={12} className="text-accent-mint" strokeWidth={2.5} />
            <span className="text-[10px] font-bold text-white">
              Saved RM{totalSaved} this month
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
