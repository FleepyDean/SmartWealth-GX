import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function NudgeOverlay({ open, onPause, onDismiss }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      <div
        onClick={onDismiss}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px] animate-floatUp"
      />
      <div className="relative w-full p-4 animate-floatUp">
        <div className="glass rounded-3xl p-5 ring-1 ring-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-600 flex items-center justify-center shadow-[0_6px_22px_rgba(255,138,61,0.55)]">
              <AlertCircle size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-semibold text-white">You're spending a lot on food delivery</p>
                <button onClick={onDismiss} className="text-text-muted hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <p className="mt-1 text-[13px] text-text-secondary leading-snug">
                This week you've ordered <span className="text-white font-semibold">RM150</span>{' '}
                worth of food delivery. Cook at home tonight and we'll move the savings straight
                into your <span className="text-violet-glow font-semibold">Langkawi Trip</span> pocket.
              </p>
            </div>
          </div>

          {/* Progress impact */}
          <div className="mt-4 rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
            <div className="flex items-center justify-between text-[12px] text-text-secondary">
              <span>You could save this week</span>
              <span className="text-accent-mint font-semibold">+RM35 toward Langkawi</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[42%] bg-gradient-to-r from-violet-glow to-accent-pink" />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <button
              onClick={onPause}
              className="w-full rounded-2xl bg-violet-grad py-3 text-[14px] font-semibold text-white shadow-[0_8px_28px_rgba(124,58,237,0.55)] hover:brightness-110"
            >
              Pause Food Delivery until Sunday
            </button>
            <button
              onClick={onDismiss}
              className="w-full rounded-2xl bg-transparent ring-1 ring-white/20 py-3 text-[14px] font-semibold text-white hover:bg-white/5"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
