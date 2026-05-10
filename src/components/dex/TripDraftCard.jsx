import React from 'react';
import { Plane, Hotel, UtensilsCrossed, Sparkles, ArrowRight } from 'lucide-react';

const ITEMS = [
  { icon: Plane, label: 'Flights (return)', amount: 200 },
  { icon: Hotel, label: 'Hotel · 2 nights', amount: 400 },
  { icon: UtensilsCrossed, label: 'Food & Activities', amount: 300 },
];

export default function TripDraftCard({ onCreate }) {
  const total = ITEMS.reduce((s, i) => s + i.amount, 0);
  return (
    <div className="card-hi rounded-3xl bg-card-soft ring-1 ring-violet/30 overflow-hidden animate-floatUp">
      {/* banner */}
      <div className="relative h-24 bg-[linear-gradient(135deg,#0EA5E9_0%,#7C3AED_60%,#EC4899_100%)]">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,#fff_0%,transparent_50%)]" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/80">Trip draft</p>
            <p className="text-[18px] font-bold text-white">Langkawi · 3 days</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/30 backdrop-blur px-2.5 py-1 text-[11px] text-white">
            <Sparkles size={12} /> by Dex
          </span>
        </div>
      </div>

      <div className="p-4">
        <ul className="space-y-3">
          {ITEMS.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.label} className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-violet/15 ring-1 ring-violet/30 text-violet-glow flex items-center justify-center">
                  <Icon size={16} />
                </span>
                <span className="flex-1 text-[13px] text-white">{it.label}</span>
                <span className="text-[13px] font-semibold text-white">RM{it.amount}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-[12px] text-text-secondary">Estimated target</span>
          <span className="text-[18px] font-bold text-white">RM{total}</span>
        </div>

        <button
          onClick={onCreate}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-grad py-3 text-[14px] font-semibold text-white shadow-[0_8px_28px_rgba(124,58,237,0.55)] hover:brightness-110"
        >
          Create Savings Pocket
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
