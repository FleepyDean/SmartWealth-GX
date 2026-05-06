import React from 'react';
import HeaderBar from '../components/home/HeaderBar.jsx';
import QuickActions from '../components/home/QuickActions.jsx';
import AccountSection from '../components/home/AccountSection.jsx';
import StreakCard from '../components/home/StreakCard.jsx';
import TomorrowTeaserCard from '../components/tomorrow/TomorrowTeaserCard.jsx';
import DexFab from '../components/ui/DexFab.jsx';
import BottomNav from '../components/ui/BottomNav.jsx';

export default function HomeScreen({ onOpenDex, onOpenTomorrow, onNavigate }) {
  return (
    <div className="relative h-full w-full text-white">
      <div className="h-full w-full overflow-y-auto pb-40 no-scrollbar">
        <HeaderBar />
        <QuickActions />
        <AccountSection />
        <StreakCard />

        {/* Tomorrow's predicted spend teaser */}
        <div className="px-5 mt-5">
          <TomorrowTeaserCard onOpen={onOpenTomorrow} />
        </div>

        {/* Insights teaser */}
        <div className="px-5 mt-5">
          <div className="card-hi rounded-3xl bg-card p-4 ring-1 ring-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-text-secondary">This week</p>
                <p className="text-[15px] font-semibold mt-0.5">Spending insights</p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-violet/20 text-violet-glow font-semibold">
                -12% vs last
              </span>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1.5 items-end h-16">
              {[40, 65, 30, 80, 50, 25, 35].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`rounded-md ${
                    i === 3 ? 'bg-violet-grad' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <DexFab onClick={onOpenDex} />
      <BottomNav active="home" onChange={onNavigate} />
    </div>
  );
}
