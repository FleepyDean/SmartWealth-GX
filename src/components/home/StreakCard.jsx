import React from 'react';
import { Flame, ChevronRight } from 'lucide-react';

export default function StreakCard() {
  const days = [true, true, true, true, true, false, false];
  return (
    <div className="px-5 mt-5">
      <div className="card-hi relative overflow-hidden rounded-3xl p-4 ring-1 ring-white/5 bg-[linear-gradient(135deg,#2A1352_0%,#3B1170_60%,#4A148C_100%)]">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent-flame/20 blur-3xl" />
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-600 flex items-center justify-center shadow-[0_6px_22px_rgba(255,138,61,0.55)]">
            <Flame size={22} className="text-white" strokeWidth={2.4} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-semibold text-white">5 Days Under Budget</p>
              <ChevronRight size={18} className="text-text-secondary" />
            </div>
            <p className="text-[12px] text-text-secondary mt-0.5">
              Financial Health Streak · Keep it up!
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              {days.map((on, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    on ? 'bg-gradient-to-r from-accent-flame to-rose-500' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
