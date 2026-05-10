import React from 'react';
import { ChevronRight, Palmtree, Watch, Cpu, Wallet, PiggyBank } from 'lucide-react';

export default function AccountSection({ onOpenPockets, pocketTotal = 2479.90 }) {
  return (
    <div className="px-5 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold text-white">Your everyday account</h2>
        <button className="text-[12px] text-text-secondary hover:text-white transition-colors">Manage</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* Main account */}
        <button className="lift tap card-premium relative overflow-hidden rounded-3xl p-4 ring-1 ring-white/8 flex flex-col justify-between min-h-[148px] text-left hover:ring-violet-glow/25">
          <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-violet-glow/15 blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-violet/20 ring-1 ring-violet/30 flex items-center justify-center text-violet-glow">
                <Wallet size={14} strokeWidth={2.4} />
              </div>
              <p className="text-[12px] text-text-secondary font-medium">Main account</p>
            </div>
            <p className="mt-3 text-[22px] font-bold text-white tracking-tight">RM8,420.10</p>
          </div>
          <span className="relative inline-flex items-center gap-1 text-[12px] text-violet-glow font-medium">
            View transactions <ChevronRight size={14} />
          </span>
        </button>

        {/* Saving Pockets */}
        <button onClick={onOpenPockets} className="lift tap card-premium relative overflow-hidden rounded-3xl p-4 ring-1 ring-white/8 flex flex-col justify-between min-h-[148px] text-left hover:ring-accent-pink/25">
          <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-accent-pink/15 blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-accent-pink/20 ring-1 ring-accent-pink/30 flex items-center justify-center text-accent-pink">
                <PiggyBank size={14} strokeWidth={2.4} />
              </div>
              <p className="text-[12px] text-text-secondary font-medium">Saving Pockets</p>
            </div>
            <p className="mt-3 text-[22px] font-bold text-white tracking-tight">
              RM{pocketTotal.toLocaleString('en-MY', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="relative mt-1 flex items-center justify-between">
            <div className="flex -space-x-2">
              <Avatar bg="bg-gradient-to-br from-sky-400 to-blue-600"><Watch size={13} /></Avatar>
              <Avatar bg="bg-gradient-to-br from-emerald-400 to-teal-600"><Cpu size={13} /></Avatar>
              <Avatar bg="bg-gradient-to-br from-fuchsia-400 to-violet-600"><Palmtree size={13} /></Avatar>
            </div>
            <ChevronRight size={16} className="text-text-secondary" />
          </div>
        </button>
      </div>
    </div>
  );
}

function Avatar({ children, bg }) {
  return (
    <div className={`h-7 w-7 rounded-full ring-2 ring-bg-800 flex items-center justify-center text-white ${bg}`}>
      {children}
    </div>
  );
}
