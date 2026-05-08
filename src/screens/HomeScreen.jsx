import React from 'react';
import HeaderBar from '../components/home/HeaderBar.jsx';
import QuickActions from '../components/home/QuickActions.jsx';
import AccountSection from '../components/home/AccountSection.jsx';
import StreakCard from '../components/home/StreakCard.jsx';
import SpinAndWinTeaserCard from '../components/home/SpinAndWinTeaserCard.jsx';
import TomorrowTeaserCard from '../components/tomorrow/TomorrowTeaserCard.jsx';
import DexFab from '../components/ui/DexFab.jsx';
import BottomNav from '../components/ui/BottomNav.jsx';
import { CalendarDays, Sparkles, TrendingDown, Users } from 'lucide-react';

export default function HomeScreen({ onOpenDex, onOpenTomorrow, onOpenSpin, onNavigate }) {
  return (
    <div className="relative h-full w-full text-white">
      <div className="h-full w-full overflow-y-auto pb-40 no-scrollbar">
        <HeaderBar />
        <QuickActions />
        <AccountSection />
        {/* <StreakCard /> */}

        {/* Spin & Win teaser */}
        <SpinAndWinTeaserCard onOpen={onOpenSpin} completedDays={5} availableSpins={1} />

        {/* Tomorrow's predicted spend teaser */}
        <div className="px-5 mt-5">
          <TomorrowTeaserCard onOpen={onOpenTomorrow} />
        </div>

        {/* Weekly wrap */}
        <div className="px-5 mt-5">
          <div className="card-hi rounded-3xl bg-card p-4 ring-1 ring-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="inline-flex items-center gap-1.5 text-[12px] text-text-secondary">
                  <CalendarDays size={13} /> Weekly wrap
                </p>
                <p className="text-[15px] font-semibold mt-0.5">AI spending insights</p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-violet/20 text-violet-glow font-semibold">
                -12% vs last week
              </span>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1.5 items-end h-16">
              {[40, 65, 30, 80, 50, 25, 35].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`rounded-md ${i === 3 ? 'bg-violet-grad' : 'bg-white/10'}`}
                />
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/5 p-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-xl bg-violet/15 ring-1 ring-violet/25 flex items-center justify-center text-violet-glow">
                    <Sparkles size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-text-secondary font-semibold">Mindful day</p>
                    <p className="text-[13px] font-medium leading-snug mt-0.5">Your most mindful spending day was Tuesday.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-white/5 p-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-xl bg-accent-mint/15 ring-1 ring-accent-mint/25 flex items-center justify-center text-accent-mint">
                    <TrendingDown size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-text-secondary font-semibold">Next week tip</p>
                    <p className="text-[13px] font-medium leading-snug mt-0.5">You can cut off burger next week.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-white/5 p-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center text-white/80">
                    <Users size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-text-secondary font-semibold">Peer benchmark</p>
                    <p className="text-[13px] font-medium leading-snug mt-0.5">62% of people your age overspent on food this week.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DexFab onClick={onOpenDex} />
      <BottomNav active="home" onChange={onNavigate} />
    </div>
  );
}
