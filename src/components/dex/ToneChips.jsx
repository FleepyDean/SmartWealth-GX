import React from 'react';
import { Briefcase, Coffee, Gavel, Megaphone } from 'lucide-react';
import useHorizontalScroll from '../../hooks/useHorizontalScroll.js';

const TONES = [
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'strict', label: 'Strict', icon: Gavel },
  { id: 'hype', label: 'Hype', icon: Megaphone },
];

export default function ToneChips({ value, onChange }) {
  const scrollRef = useHorizontalScroll();
  return (
    <div className="px-5">
      <p className="text-[11px] uppercase tracking-wider text-text-muted mb-2">AI Tone Preference</p>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1 cursor-grab select-none"
      >
        {TONES.map((t) => {
          const Icon = t.icon;
          const active = value === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange?.(t.id)}
              className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium ring-1 transition-colors ${
                active
                  ? 'bg-violet-grad text-white ring-white/30 shadow-[0_4px_18px_rgba(124,58,237,0.55)]'
                  : 'bg-white/5 text-text-secondary ring-white/10 hover:bg-white/10'
              }`}
            >
              <Icon size={14} strokeWidth={2.2} />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { TONES };
