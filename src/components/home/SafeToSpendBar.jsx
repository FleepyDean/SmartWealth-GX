import React from 'react';
import { Shield, TrendingUp } from 'lucide-react';

/**
 * Slim "Safe to spend today" indicator that sits directly under the balance.
 * Shows the AI-computed disposable amount for today + progress of daily budget.
 */
export default function SafeToSpendBar({ amount = 42, dailyBudget = 65, spent = 23 }) {
  const pct = Math.min(100, Math.round((spent / dailyBudget) * 100));
  const safe = Math.max(0, dailyBudget - spent);

  return (
    <div className="mt-4 rounded-2xl bg-white/[0.04] ring-1 ring-white/8 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-accent-mint/15 ring-1 ring-accent-mint/25 flex items-center justify-center">
            <Shield size={13} className="text-accent-mint" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">
              Safe to spend today
            </p>
            <p className="text-[16px] font-bold text-white">
              RM{safe.toFixed(2)}
              <span className="ml-1.5 text-[11px] font-medium text-text-muted">
                of RM{dailyBudget}
              </span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-mint">
            <TrendingUp size={11} /> On track
          </span>
          <p className="text-[10px] text-text-muted mt-0.5">Updated just now</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-2.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-mint via-emerald-400 to-accent-mint transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
