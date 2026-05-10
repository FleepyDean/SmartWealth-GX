import React from 'react';
import { Sparkles } from 'lucide-react';

export default function DexFab({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Summon Dex"
      className="tap group absolute bottom-28 right-5 z-40 h-16 w-16 rounded-full bg-violet-grad text-white flex items-center justify-center shadow-glow animate-pulseGlow ring-2 ring-white/25 hover:ring-white/40 hover:scale-105 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-violet-grad blur-xl opacity-60" />
      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-300 ring-2 ring-bg-900 animate-sparkle" />
      <Sparkles className="relative" size={26} strokeWidth={2.2} />
    </button>
  );
}
