import React from 'react';

export default function AutoToggle({ icon, title, subtitle, on, onChange }) {
  return (
    <div className="card-hi rounded-3xl bg-card p-4 ring-1 ring-white/5 flex items-start gap-3">
      <div className="h-10 w-10 rounded-2xl bg-violet/15 ring-1 ring-violet/30 text-violet-glow flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-white">{title}</p>
        <p className="text-[12px] text-text-secondary mt-0.5 leading-snug">{subtitle}</p>
      </div>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={`relative h-7 w-12 rounded-full transition-colors shrink-0 ${
          on ? 'bg-violet-grad' : 'bg-white/10'
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            on ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
