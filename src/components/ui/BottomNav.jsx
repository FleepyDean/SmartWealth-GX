import React from 'react';
import { Home, User } from 'lucide-react';

const OxoxIcon = ({ active }) => (
  <svg viewBox="0 0 28 12" width="36" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="4" cy="6" r="3" />
    <path d="M9 2l4 8M13 2l-4 8" strokeLinecap="round" />
    <circle cx="18" cy="6" r="3" />
    <path d="M23 2l4 8M27 2l-4 8" strokeLinecap="round" />
  </svg>
);

export default function BottomNav({ active = 'home', onChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: null },
    { id: 'me', label: 'Me', icon: User },
  ];
  return (
    <div className="absolute bottom-0 inset-x-0 z-30 px-6 pb-6">
      <div className="glass card-hi rounded-3xl px-2 py-2 flex items-center justify-between">
        {tabs.map((t) => {
          const isActive = active === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onChange?.(t.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition-colors ${
                isActive ? 'text-white' : 'text-text-muted'
              }`}
            >
              {t.id === 'discover' ? (
                <OxoxIcon active={isActive} />
              ) : (
                <Icon size={22} strokeWidth={2} />
              )}
              <span className="text-[11px] font-medium">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
