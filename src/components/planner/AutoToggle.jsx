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
        className={`relative h-7 w-[52px] rounded-full transition-colors duration-300 shrink-0 ${
          on ? 'bg-violet-grad shadow-[0_0_12px_rgba(124,58,237,0.5)]' : 'bg-white/15'
        }`}
      >
        <span
          className={`absolute top-[3px] left-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-md transition-transform duration-300 ${
            on ? 'translate-x-[25px]' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
