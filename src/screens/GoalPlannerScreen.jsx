import React, { useState } from 'react';
import { ArrowLeft, Plane, Hotel, UtensilsCrossed, Coins, Wallet } from 'lucide-react';
import ProgressRing from '../components/planner/ProgressRing.jsx';
import AutoToggle from '../components/planner/AutoToggle.jsx';

const ITEMS = [
  { icon: Plane, label: 'Flights (return)', amount: 200 },
  { icon: Hotel, label: 'Hotel · 2 nights', amount: 400 },
  { icon: UtensilsCrossed, label: 'Food & Activities', amount: 300 },
];

export default function GoalPlannerScreen({ onBack, onConfirm }) {
  const [roundUp, setRoundUp] = useState(true);
  const [salary, setSalary] = useState(false);
  const total = ITEMS.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="relative h-full w-full text-white flex flex-col">
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <p className="text-[15px] font-semibold">New Savings Pocket</p>
        <div className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
        {/* Title */}
        <div className="mt-2">
          <p className="text-[12px] text-text-secondary">Goal</p>
          <h1 className="text-[24px] font-bold tracking-tight">Langkawi Trip · 3 days</h1>
        </div>

        {/* Visualizer */}
        <div className="mt-5 card-hi rounded-3xl bg-card p-5 ring-1 ring-white/5 flex flex-col items-center">
          <ProgressRing value={0} target={total} />
          <div className="mt-4 grid grid-cols-3 gap-2 w-full">
            <Stat label="Daily" value="RM30" />
            <Stat label="Weekly" value="RM210" />
            <Stat label="ETA" value="30 days" />
          </div>
        </div>

        {/* Goal breakdown */}
        <div className="mt-5">
          <p className="text-[13px] font-semibold text-white mb-2">Goal breakdown</p>
          <div className="card-hi rounded-3xl bg-card ring-1 ring-white/5 divide-y divide-white/5">
            {ITEMS.map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.label} className="flex items-center gap-3 px-4 py-3">
                  <span className="h-9 w-9 rounded-xl bg-violet/15 ring-1 ring-violet/30 text-violet-glow flex items-center justify-center">
                    <Icon size={16} />
                  </span>
                  <span className="flex-1 text-[13px]">{it.label}</span>
                  <span className="text-[13px] font-semibold">RM{it.amount}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Auto savings */}
        <div className="mt-5">
          <p className="text-[13px] font-semibold text-white mb-2">Automated savings</p>
          <div className="space-y-3">
            <AutoToggle
              icon={<Coins size={18} />}
              title="Round-up Daily Spends"
              subtitle="Spend RM8.50 on coffee → RM0.50 auto-saved to Langkawi pocket."
              on={roundUp}
              onChange={setRoundUp}
            />
            <AutoToggle
              icon={<Wallet size={18} />}
              title="Smart Salary Deduction"
              subtitle="Auto-pull 5% the moment your salary lands. Pause anytime."
              on={salary}
              onChange={setSalary}
            />
          </div>
        </div>
      </div>

      {/* Confirm button */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-bg-900 via-bg-900/80 to-transparent">
        <button
          onClick={onConfirm}
          className="w-full rounded-2xl bg-violet-grad py-4 text-[15px] font-semibold text-white shadow-[0_10px_32px_rgba(124,58,237,0.6)] hover:brightness-110"
        >
          Confirm & Start Saving
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/5 px-3 py-2 text-center">
      <p className="text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      <p className="text-[14px] font-semibold mt-0.5">{value}</p>
    </div>
  );
}
