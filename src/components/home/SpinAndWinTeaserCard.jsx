import React from 'react';
import { ChevronRight, Star, Sparkles } from 'lucide-react';

export default function SpinAndWinTeaserCard({ onOpen, completedDays = 5, availableSpins = 1 }) {
  const canSpin = availableSpins > 0;
  
  return (
    <button
      onClick={onOpen}
      className="w-full px-5 mt-5 text-left"
    >
      <div className="card-hi relative overflow-hidden rounded-3xl p-5 ring-1 ring-white/5 bg-[linear-gradient(135deg,#4A148C_0%,#7A1FA2_60%,#9F5BFF_100%)]">
        {/* Ambient glow */}
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-accent-pink/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-violet-glow/20 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-amber-200 to-orange-500 flex items-center justify-center shadow-[0_6px_22px_rgba(251,191,36,0.55)]">
                <Sparkles size={22} className="text-bg-900" strokeWidth={2.4} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-white leading-tight">Spin & Win</p>
                <p className="text-[11px] text-white/80">Save daily, earn spins</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-white/60 group-hover:text-white transition-colors" />
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-300 to-orange-500 transition-all duration-500"
                style={{ width: `${(completedDays / 7) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-white/90">{completedDays}/7</span>
          </div>

          {/* Spins badge */}
          <div className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 ${
            canSpin 
              ? 'bg-white/15 ring-1 ring-white/20' 
              : 'bg-white/10 ring-1 ring-white/10'
          }`}>
            <Star size={12} className={canSpin ? 'text-amber-300 fill-amber-300' : 'text-white/50'} />
            <span className={`text-[10px] font-bold tracking-wider ${
              canSpin ? 'text-white' : 'text-white/50'
            }`}>
              {availableSpins} {availableSpins === 1 ? 'SPIN' : 'SPINS'} READY
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
