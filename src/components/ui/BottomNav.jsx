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
              <Icon size={22} strokeWidth={2} />
              <span className="text-[11px] font-medium">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
