import React from 'react';

export default function CategoryRow({ icon, label, amount, pct, color }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card ring-1 ring-white/5 px-3 py-2.5">
      <div
        className="h-8 w-8 shrink-0 rounded-xl flex items-center justify-center ring-1"
        style={{ backgroundColor: `${color}22`, color, borderColor: `${color}55` }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12.5px] font-medium text-white truncate min-w-0">{label}</p>
          <p className="text-[12.5px] font-semibold text-white tabular-nums shrink-0">
            RM{amount.toFixed(2)}
          </p>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: color }}
            />
          </div>
          <span className="text-[10px] text-text-muted tabular-nums shrink-0">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
