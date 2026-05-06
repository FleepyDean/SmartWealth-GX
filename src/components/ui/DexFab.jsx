import React from 'react';
import { Sparkles } from 'lucide-react';

export default function DexFab({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Summon Dex"
      className="absolute bottom-28 right-5 z-40 h-16 w-16 rounded-full bg-violet-grad text-white flex items-center justify-center shadow-glow animate-pulseGlow ring-1 ring-white/30"
    >
      <span className="absolute inset-0 rounded-full bg-violet-grad blur-xl opacity-60" />
      <Sparkles className="relative" size={26} strokeWidth={2.2} />
    </button>
  );
}
