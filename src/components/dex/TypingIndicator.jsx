import React from 'react';

/**
 * Three-dot typing indicator bubble — shown while Dex is "thinking".
 */
export default function TypingIndicator() {
  return (
    <div className="w-full flex justify-start animate-floatUp">
      <div className="bg-card rounded-3xl rounded-bl-md ring-1 ring-white/5 px-4 py-3">
        <div className="flex items-center gap-1">
          <Dot delay="0s" />
          <Dot delay="0.18s" />
          <Dot delay="0.36s" />
        </div>
      </div>
      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Dot({ delay }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-violet-glow"
      style={{
        animation: 'typingDot 1.2s infinite ease-in-out',
        animationDelay: delay,
      }}
    />
  );
}
