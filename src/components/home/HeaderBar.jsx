import React, { useState } from 'react';
import { Bell, HelpCircle, Eye, EyeOff } from 'lucide-react';

export default function HeaderBar({ balance = 'RM10,900.00', name = 'Danish' }) {
  const [hidden, setHidden] = useState(false);
  return (
    <div className="px-5 pt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-violet-grad ring-1 ring-white/20 flex items-center justify-center text-sm font-bold">
            {name[0]}
          </div>
          <div>
            <p className="text-[12px] text-text-secondary">Hi, {name}</p>
            <p className="text-[11px] text-text-muted">Welcome back!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconBtn><HelpCircle size={18} /></IconBtn>
          <IconBtn>
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent-pink" />
          </IconBtn>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[13px] text-text-secondary">Total balance</p>
        <div className="flex items-end gap-3 mt-1">
          <h1 className="text-[34px] leading-none font-bold tracking-tight text-white">
            {hidden ? 'RM••••••' : balance}
          </h1>
          <button
            onClick={() => setHidden((v) => !v)}
            className="mb-1 text-text-secondary hover:text-white"
            aria-label="Toggle balance visibility"
          >
            {hidden ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

function IconBtn({ children }) {
  return (
    <button className="relative h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 text-white/90 flex items-center justify-center hover:bg-white/10">
      {children}
    </button>
  );
}
