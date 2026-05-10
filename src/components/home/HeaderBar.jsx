import React, { useState } from 'react';
import { Bell, HelpCircle, Eye, EyeOff, TrendingUp } from 'lucide-react';
import SafeToSpendBar from './SafeToSpendBar.jsx';

export default function HeaderBar({ balance = 'RM10,900.00', name = 'Danish' }) {
  const [hidden, setHidden] = useState(false);
  return (
    <div className="px-5 pt-3 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-violet-grad ring-2 ring-white/15 flex items-center justify-center text-[14px] font-bold shadow-glowSm">
              {name[0]}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent-mint ring-2 ring-bg-900" />
          </div>
          <div>
            <p className="text-[12px] text-text-secondary">Hi, <span className="text-white font-semibold">{name}</span></p>
            <p className="text-[11px] text-text-muted">Welcome back!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconBtn><HelpCircle size={18} /></IconBtn>
          <IconBtn>
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent-pink ring-2 ring-bg-900" />
          </IconBtn>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-text-secondary font-semibold">
            Total balance
          </p>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-accent-mint/12 ring-1 ring-accent-mint/25 px-1.5 py-0.5 text-[9px] font-bold text-accent-mint">
            <TrendingUp size={9} strokeWidth={2.8} /> +2.4%
          </span>
        </div>
        <div className="flex items-end gap-3 mt-1.5">
          <h1 className="text-[36px] leading-none font-bold tracking-tight text-white">
            {hidden ? 'RM••••••' : balance}
          </h1>
          <button
            onClick={() => setHidden((v) => !v)}
            className="mb-1.5 text-text-secondary hover:text-white tap p-1"
            aria-label="Toggle balance visibility"
          >
            {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <SafeToSpendBar />
    </div>
  );
}

function IconBtn({ children }) {
  return (
    <button className="tap relative h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 text-white/90 flex items-center justify-center hover:bg-white/10 hover:ring-white/20">
      {children}
    </button>
  );
}
