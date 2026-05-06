import React, { useState } from 'react';
import {
  Wallet,
  Sparkles,
  CalendarClock,
  Users,
  CheckCircle2,
  ArrowRight,
  Repeat,
  Star,
  MapPin,
  TrendingDown,
} from 'lucide-react';

/**
 * Smart Spend-Aware Lifestyle Planner
 * Shown inside a Dex chat bubble. The AI doesn't just recommend places —
 * it recommends what the user can afford while protecting their goals.
 */
export default function LifestyleRecsCard({
  intent = 'Dinner with friends',
  userBudget = 30,
  onBook,
  onSubstitute,
}) {
  // Mocked "AI analysis" context — would be derived from real spend data.
  const dailyRemaining = 35;
  const diningWeekUsedPct = 80;
  const safeToSpend = Math.min(userBudget, dailyRemaining);

  const options = [
    {
      id: 'a',
      name: 'Mama Kim Kopitiam',
      tag: 'Local · Comfort',
      price: 22,
      rating: 4.6,
      distance: '0.4 km',
      affordable: true,
      best: true,
      note: 'Within budget · matches your usual taste',
    },
    {
      id: 'b',
      name: 'Hao Wei Noodle Bar',
      tag: 'Asian · Casual',
      price: 28,
      rating: 4.4,
      distance: '0.8 km',
      affordable: true,
      note: 'Comfortable spend tonight',
    },
    {
      id: 'c',
      name: 'Kura Sushi (your usual)',
      tag: 'Japanese',
      price: 45,
      rating: 4.7,
      distance: '1.2 km',
      affordable: false,
      note: 'Over today’s safe-to-spend by RM10',
    },
  ];

  const usual = options.find((o) => o.id === 'c');
  const swap = options.find((o) => o.id === 'a');
  const savings = usual.price - swap.price;
  const goalDelayDays = Math.round(usual.price / 30); // mock: RM30/day toward Langkawi

  const [selected, setSelected] = useState(swap.id);
  const chosen = options.find((o) => o.id === selected);

  return (
    <div className="card-hi rounded-3xl bg-card-soft ring-1 ring-violet/30 overflow-hidden animate-floatUp">
      {/* Header / context */}
      <div className="relative p-4 bg-[linear-gradient(135deg,#3B1170_0%,#7C3AED_60%,#EC4899_100%)]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_85%_20%,#fff_0%,transparent_50%)]" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/80">Spend-aware plan</p>
            <p className="text-[16px] font-bold text-white mt-0.5">{intent}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/30 backdrop-blur px-2.5 py-1 text-[11px] text-white">
            <Sparkles size={12} /> by Dex
          </span>
        </div>

        <div className="relative mt-3 grid grid-cols-3 gap-2">
          <Stat icon={<Wallet size={12} />} label="Safe to spend" value={`RM${safeToSpend}`} />
          <Stat label="Today left" value={`RM${dailyRemaining}`} />
          <Stat label="Dining (wk)" value={`${diningWeekUsedPct}%`} warn={diningWeekUsedPct >= 80} />
        </div>
      </div>

      <div className="p-4">
        <p className="text-[12px] text-text-secondary mb-2">
          Based on your budget <span className="text-white font-semibold">RM{userBudget}</span>,
          here are options that protect your{' '}
          <span className="text-violet-glow font-semibold">Langkawi</span> goal:
        </p>

        {/* Options list */}
        <ul className="space-y-2">
          {options.map((o) => {
            const isSel = selected === o.id;
            return (
              <li key={o.id}>
                <button
                  disabled={!o.affordable}
                  onClick={() => setSelected(o.id)}
                  className={[
                    'w-full text-left rounded-2xl p-3 ring-1 transition-colors flex items-center gap-3',
                    o.affordable
                      ? isSel
                        ? 'bg-violet/15 ring-violet/50'
                        : 'bg-white/5 ring-white/10 hover:bg-white/10'
                      : 'bg-white/[0.03] ring-white/5 opacity-70 cursor-not-allowed',
                  ].join(' ')}
                >
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center ring-1 shrink-0 ${
                      o.affordable
                        ? 'bg-violet/20 ring-violet/40 text-violet-glow'
                        : 'bg-white/5 ring-white/10 text-text-muted'
                    }`}
                  >
                    {o.best ? <Star size={16} /> : <MapPin size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-white truncate">{o.name}</p>
                      {o.best && (
                        <span className="text-[10px] font-bold tracking-wide rounded-full bg-accent-mint/20 text-accent-mint px-1.5 py-0.5">
                          BEST FIT
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-text-secondary truncate">
                      {o.tag} · {o.distance} · ★ {o.rating}
                    </p>
                    <p
                      className={`text-[11px] mt-0.5 ${
                        o.affordable ? 'text-text-muted' : 'text-accent-flame'
                      }`}
                    >
                      {o.note}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[14px] font-bold text-white">RM{o.price}</p>
                    {o.affordable ? (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-accent-mint">
                        <CheckCircle2 size={10} /> in budget
                      </span>
                    ) : (
                      <span className="text-[10px] text-accent-flame">over budget</span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Smart substitution */}
        <div className="mt-3 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-violet/10 ring-1 ring-emerald-400/25 p-3 flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/20 ring-1 ring-emerald-400/40 text-accent-mint flex items-center justify-center shrink-0">
            <Repeat size={16} />
          </div>
          <div className="flex-1">
            <p className="text-[12px] text-white">
              Choose <span className="font-semibold">{swap.name}</span> over your usual{' '}
              <span className="font-semibold">{usual.name}</span> and save{' '}
              <span className="text-accent-mint font-bold">RM{savings}</span>.
            </p>
            <button
              onClick={() => {
                setSelected(swap.id);
                onSubstitute?.(swap);
              }}
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-accent-mint"
            >
              Apply substitution <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Spending impact preview */}
        <div className="mt-3 rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
          <div className="flex items-center gap-2 text-[12px] text-text-secondary">
            <CalendarClock size={14} className="text-violet-glow" />
            Spending impact preview
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Impact
              label="If you pick this"
              value={`RM${chosen.price}`}
              sub={
                chosen.price <= safeToSpend
                  ? 'On track for Langkawi 🎯'
                  : `Delays goal by ~${goalDelayDays} day${goalDelayDays > 1 ? 's' : ''}`
              }
              good={chosen.price <= safeToSpend}
            />
            <Impact
              label="vs your usual"
              value={`-RM${usual.price - chosen.price}`}
              sub={
                chosen.price < usual.price
                  ? `Saves ${Math.round(((usual.price - chosen.price) / usual.price) * 100)}%`
                  : 'No change'
              }
              good={chosen.price < usual.price}
              icon={<TrendingDown size={12} />}
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onBook?.(chosen)}
            disabled={!chosen.affordable}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-grad py-3 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(124,58,237,0.55)] hover:brightness-110 disabled:opacity-50"
          >
            Book {chosen.name.split(' ')[0]} · RM{chosen.price}
            <ArrowRight size={14} />
          </button>
          <button className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-white/5 ring-1 ring-white/10 px-3 py-3 text-[12px] font-medium text-white hover:bg-white/10">
            <Users size={14} /> Split
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, warn }) {
  return (
    <div className="rounded-xl bg-black/25 backdrop-blur px-2.5 py-1.5 ring-1 ring-white/10">
      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/70">
        {icon} {label}
      </p>
      <p className={`text-[13px] font-bold mt-0.5 ${warn ? 'text-accent-flame' : 'text-white'}`}>
        {value}
      </p>
    </div>
  );
}

function Impact({ label, value, sub, good, icon }) {
  return (
    <div className="rounded-xl bg-black/25 ring-1 ring-white/10 px-2.5 py-2">
      <p className="text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      <p
        className={`text-[14px] font-bold mt-0.5 inline-flex items-center gap-1 ${
          good ? 'text-accent-mint' : 'text-white'
        }`}
      >
        {icon}
        {value}
      </p>
      <p className={`text-[11px] mt-0.5 ${good ? 'text-accent-mint/80' : 'text-text-secondary'}`}>
        {sub}
      </p>
    </div>
  );
}
