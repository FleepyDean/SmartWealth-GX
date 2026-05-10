import React from 'react';
import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import BudgetDonut from '../tomorrow/BudgetDonut.jsx';

const SEGMENTS = [
  { key: 'food', value: 50, color: '#F5A524' },
  { key: 'transport', value: 8, color: '#818CF8' },
  { key: 'entertainment', value: 25, color: '#EC4899' },
  { key: 'others', value: 12, color: '#34D399' },
];

export default function TomorrowPreviewCard({ onOpen }) {
  return (
    <div className="card-hi rounded-3xl bg-card-soft ring-1 ring-violet/30 overflow-hidden animate-floatUp">
      <div className="p-4">
        <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-violet-glow font-semibold">
          <Sparkles size={12} /> Tomorrow's Budget
        </p>

        <div className="mt-3 flex items-center gap-4">
          <BudgetDonut segments={SEGMENTS} total={95} size={88} stroke={10} centerLabel="" />
          <div className="flex-1 min-w-0">
            <p className="text-[18px] font-bold">RM95</p>
            <p className="text-[11px] text-text-secondary mt-0.5 inline-flex items-center gap-1">
              <CalendarDays size={11} /> Mama Kim Kopitiam · 12:30 PM
            </p>
            <ul className="mt-2 space-y-0.5 text-[11px] text-text-secondary">
              <li className="flex items-center justify-between">
                <span>Food</span>
                <span className="text-white font-semibold">RM50</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Transportation</span>
                <span className="text-white font-semibold">RM8</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Entertainment</span>
                <span className="text-white font-semibold">RM25</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={onOpen}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-grad py-3 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(124,58,237,0.55)] hover:brightness-110"
        >
          Open full plan
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
