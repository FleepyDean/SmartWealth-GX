import React from 'react';
import { CalendarDays, ChevronRight, Sparkles } from 'lucide-react';
import BudgetDonut from './BudgetDonut.jsx';

const SEGMENTS = [
  { key: 'food', value: 50, color: '#F5A524' },
  { key: 'transport', value: 8, color: '#818CF8' },
  { key: 'entertainment', value: 25, color: '#EC4899' },
  { key: 'others', value: 12, color: '#34D399' },
];

export default function TomorrowTeaserCard({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="lift tap group card-premium w-full text-left rounded-3xl p-4 ring-1 ring-white/8 hover:ring-violet-glow/25 transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <BudgetDonut segments={SEGMENTS} total={95} size={88} stroke={9} centerLabel="" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-violet-glow font-semibold">
            <Sparkles size={11} /> Tomorrow's plan
          </p>
          <p className="text-[18px] font-bold mt-0.5">RM95 · estimated</p>
          <p className="inline-flex items-center gap-1 text-[11px] text-text-secondary mt-1">
            <CalendarDays size={11} /> 1 calendar event · plan ready
          </p>
          <div className="mt-2 flex gap-1">
            {SEGMENTS.map((s) => (
              <span
                key={s.key}
                className="h-1 flex-1 rounded-full"
                style={{ backgroundColor: s.color, opacity: 0.85 }}
              />
            ))}
          </div>
        </div>
        <ChevronRight size={18} className="text-text-secondary shrink-0" />
      </div>
    </button>
  );
}
