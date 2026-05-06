import React from 'react';

/**
 * Mobile-style chrome so the prototype reads as an app on desktop browsers.
 * Renders a 390x844 (iPhone 14 Pro) frame with notch + home indicator.
 */
export default function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[radial-gradient(circle_at_30%_10%,#2A1352_0%,#070110_55%)]">
      <div className="relative w-[390px] h-[844px] rounded-[48px] bg-black p-[6px] shadow-[0_30px_120px_rgba(124,58,237,0.35)] ring-1 ring-white/5">
        <div className="relative w-full h-full overflow-hidden rounded-[44px] bg-app-gradient">
          {/* Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 z-50 h-7 w-32 rounded-full bg-black" />
          {/* Status bar */}
          <div className="absolute top-0 inset-x-0 z-40 h-11 px-7 flex items-center justify-between text-[13px] font-semibold text-white/90">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <SignalIcon /> <WifiIcon /> <BatteryIcon />
            </span>
          </div>
          {/* App content */}
          <div className="absolute inset-0 pt-11">{children}</div>
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 h-1.5 w-32 rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}

const SignalIcon = () => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="7" width="2.5" height="3" rx="0.5"/><rect x="4" y="5" width="2.5" height="5" rx="0.5"/><rect x="8" y="3" width="2.5" height="7" rx="0.5"/><rect x="12" y="0" width="2.5" height="10" rx="0.5"/></svg>
);
const WifiIcon = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 9.5a1 1 0 100-2 1 1 0 000 2zM3.2 6.2a5.5 5.5 0 017.6 0l-1 1a4 4 0 00-5.6 0l-1-1zM.7 3.7a9 9 0 0112.6 0l-1 1a7.5 7.5 0 00-10.6 0l-1-1z"/></svg>
);
const BatteryIcon = () => (
  <svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity="0.5"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor"/><rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.6"/></svg>
);
