import React from 'react';
import { ChevronRight, Palmtree, Laptop, Heart } from 'lucide-react';

export default function AccountSection() {
  return (
    <div className="px-5 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold text-white">Your everyday account</h2>
        <button className="text-[12px] text-text-secondary">Manage</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* Main account */}
        <div className="card-hi rounded-3xl bg-card p-4 ring-1 ring-white/5 flex flex-col justify-between min-h-[148px]">
          <div>
            <p className="text-[12px] text-text-secondary">Main account</p>
            <p className="mt-2 text-[20px] font-bold text-white tracking-tight">RM8,420.10</p>
          </div>
          <button className="mt-3 inline-flex items-center gap-1 text-[12px] text-violet-glow font-medium">
            View transactions <ChevronRight size={14} />
          </button>
        </div>

        {/* Saving Pockets */}
        <div className="card-hi rounded-3xl bg-card p-4 ring-1 ring-white/5 flex flex-col justify-between min-h-[148px]">
          <div>
            <p className="text-[12px] text-text-secondary">Saving Pockets</p>
            <p className="mt-2 text-[20px] font-bold text-white tracking-tight">RM2,479.90</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-2">
              <Avatar bg="bg-gradient-to-br from-cyan-400 to-blue-600"><Palmtree size={14} /></Avatar>
              <Avatar bg="bg-gradient-to-br from-fuchsia-400 to-violet-600"><Laptop size={14} /></Avatar>
              <Avatar bg="bg-gradient-to-br from-rose-400 to-pink-600"><Heart size={14} /></Avatar>
              <div className="h-7 w-7 rounded-full bg-card-soft ring-2 ring-card text-[10px] font-semibold flex items-center justify-center text-text-secondary">
                +2
              </div>
            </div>
            <ChevronRight size={16} className="text-text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ children, bg }) {
  return (
    <div className={`h-7 w-7 rounded-full ring-2 ring-card flex items-center justify-center text-white ${bg}`}>
      {children}
    </div>
  );
}
