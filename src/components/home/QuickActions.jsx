import React from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="px-5 mt-6 grid grid-cols-2 gap-3">
      <ActionPill icon={<Plus size={18} strokeWidth={2.5} />} label="Add Money" />
      <ActionPill icon={<ArrowUpRight size={18} strokeWidth={2.5} />} label="Send Money" />
    </div>
  );
}

function ActionPill({ icon, label }) {
  return (
    <button className="card-hi flex items-center gap-3 rounded-full bg-card pl-2 pr-5 py-2 ring-1 ring-white/5 hover:bg-card-soft transition-colors">
      <span className="h-9 w-9 rounded-full bg-violet-grad flex items-center justify-center shadow-[0_4px_18px_rgba(124,58,237,0.55)]">
        {icon}
      </span>
      <span className="text-[14px] font-semibold text-white">{label}</span>
    </button>
  );
}
