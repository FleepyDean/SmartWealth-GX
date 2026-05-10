import React from 'react';
import {
  Coffee,
  ShoppingBag,
  Bus,
  Utensils,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';

const SAMPLE_TXNS = [
  { id: 1, merchant: 'ZUS Coffee', category: 'Coffee', icon: Coffee, iconBg: 'from-amber-500/25 to-orange-500/15', iconColor: 'text-amber-300', amount: -14.50, time: 'Today, 09:32', status: 'Settled' },
  { id: 2, merchant: 'Grab Transport', category: 'Ride', icon: Bus, iconBg: 'from-emerald-500/25 to-teal-500/15', iconColor: 'text-emerald-300', amount: -8.20, time: 'Today, 08:14', status: 'Settled' },
  { id: 3, merchant: 'Payday — Kollect', category: 'Salary', icon: ArrowDownLeft, iconBg: 'from-violet-500/30 to-fuchsia-500/15', iconColor: 'text-violet-glow', amount: 3200.00, time: 'Yesterday, 17:00', status: 'Credited' },
  { id: 4, merchant: 'Serai', category: 'Lunch', icon: Utensils, iconBg: 'from-rose-500/25 to-pink-500/15', iconColor: 'text-rose-300', amount: -22.00, time: 'Yesterday, 12:48', status: 'Settled' },
  { id: 5, merchant: 'TNB Bill', category: 'Utilities', icon: Zap, iconBg: 'from-sky-500/25 to-blue-500/15', iconColor: 'text-sky-300', amount: -78.40, time: '7 May, 19:02', status: 'Auto-paid' },
];

export default function TransactionList({ transactions = SAMPLE_TXNS }) {
  return (
    <div className="px-5 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold text-white">Recent activity</h2>
        <button className="text-[12px] text-text-secondary hover:text-white transition-colors">
          See all
        </button>
      </div>

      <div className="rounded-3xl bg-card-soft/60 ring-1 ring-white/6 overflow-hidden">
        {transactions.map((t, i) => (
          <TransactionRow key={t.id} txn={t} isLast={i === transactions.length - 1} />
        ))}
      </div>
    </div>
  );
}

function TransactionRow({ txn, isLast }) {
  const Icon = txn.icon;
  const isIncome = txn.amount > 0;

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors ${
        !isLast ? 'border-b border-white/[0.05]' : ''
      }`}
    >
      {/* Merchant icon */}
      <div
        className={`relative h-10 w-10 rounded-xl bg-gradient-to-br ${txn.iconBg} ring-1 ring-white/8 flex items-center justify-center flex-shrink-0`}
      >
        <Icon size={17} className={txn.iconColor} strokeWidth={2.2} />
      </div>

      {/* Merchant + time */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[13.5px] font-semibold text-white truncate">{txn.merchant}</p>
          {txn.status === 'Auto-paid' && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300/80 bg-sky-500/10 ring-1 ring-sky-400/20 rounded-full px-1.5 py-0.5">
              Auto
            </span>
          )}
        </div>
        <p className="text-[11px] text-text-muted truncate">
          {txn.category} · {txn.time}
        </p>
      </div>

      {/* Amount */}
      <div className="text-right">
        <p
          className={`text-[14px] font-bold ${
            isIncome ? 'text-accent-mint' : 'text-white'
          }`}
        >
          {isIncome ? '+' : '−'}RM{Math.abs(txn.amount).toFixed(2)}
        </p>
        <p className="text-[10px] text-text-muted">
          {isIncome ? 'Credited' : 'Settled'}
        </p>
      </div>
    </div>
  );
}
