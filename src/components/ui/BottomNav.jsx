import React from 'react';
import { Home, User, Upload } from 'lucide-react';

export default function BottomNav({ active = 'home', onChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'me', label: 'Me', icon: User },
  ];
  return (
    <div className="absolute bottom-0 inset-x-0 z-30 px-6 pb-6">
      <div className="glass-strong card-hi rounded-3xl px-2 py-2 flex items-center justify-between ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {tabs.map((t) => {
          const isActive = active === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onChange?.(t.id)}
              className={`tap relative flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition-all duration-200 ${
                isActive ? 'text-white bg-white/8' : 'text-text-muted hover:text-white/80'
              }`}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-violet-glow shadow-glowSm" />
              )}
              <Icon size={22} strokeWidth={isActive ? 2.4 : 2} />
              <span className={`text-[11px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
