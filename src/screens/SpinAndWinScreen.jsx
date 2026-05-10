import React, { useState } from 'react';
import { ChevronLeft, Info, Trophy } from 'lucide-react';
import WeeklyTracker from '../components/spin/WeeklyTracker.jsx';
import SpinWheel from '../components/spin/SpinWheel.jsx';
import RewardModal from '../components/spin/RewardModal.jsx';

export default function SpinAndWinScreen({ onBack }) {
  const [spins, setSpins] = useState(1);
  const [prize, setPrize] = useState(null);
  const [history, setHistory] = useState([]);

  const handleResult = (winner) => {
    setPrize(winner);
    setSpins((s) => Math.max(0, s - 1));
    setHistory((h) => [winner, ...h].slice(0, 5));
  };

  return (
    <div className="relative h-full w-full text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-violet-glow/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent-pink/20 blur-3xl" />

      <div className="h-full w-full overflow-y-auto pb-10 no-scrollbar">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="tap h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/15"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            <p className="text-[15px] font-bold tracking-wide">Spin & Win</p>
          </div>
          <button className="tap h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/15">
            <Info size={18} />
          </button>
        </div>

        {/* Weekly tracker */}
        <div className="px-5 mt-3">
          <WeeklyTracker completed={5} spins={spins} />
        </div>

        {/* Wheel */}
        <div className="px-5 mt-7">
          <SpinWheel hasSpins={spins > 0} onResult={handleResult} />
        </div>

        {/* Recent prizes */}
        <div className="px-5 mt-7">
          <p className="text-[12px] font-semibold uppercase tracking-widest text-text-secondary mb-2">
            Recent Wins
          </p>
          {history.length === 0 ? (
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-[12px] text-text-muted">
              Your prizes will appear here after you spin.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {history.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl bg-card-soft ring-1 ring-white/10 p-3"
                  >
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                        p.grand
                          ? 'bg-gradient-to-br from-amber-300 to-orange-500 text-bg-900'
                          : 'bg-violet-grad text-white'
                      }`}
                    >
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold">
                        {p.label} {p.sub && <span className="text-text-secondary font-normal">· {p.sub}</span>}
                      </p>
                      <p className="text-[11px] text-text-muted">Just now</p>
                    </div>
                    {!p.id?.includes('tryagain') && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-mint">
                        Claimed
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer fine print */}
        <p className="px-5 mt-6 text-[11px] text-text-muted leading-relaxed text-center">
          Save at least RM30 every day to unlock spins. Prizes are credited within 24 hours.
        </p>
      </div>

      <RewardModal
        open={!!prize}
        prize={prize}
        onAddToPocket={() => setPrize(null)}
        onClose={() => setPrize(null)}
      />
    </div>
  );
}
