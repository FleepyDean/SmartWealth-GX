import React, { useState } from 'react';
import PhoneFrame from './components/ui/PhoneFrame.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import DexChatScreen from './screens/DexChatScreen.jsx';
import GoalPlannerScreen from './screens/GoalPlannerScreen.jsx';
import TomorrowBudgetScreen from './screens/TomorrowBudgetScreen.jsx';
import NudgeOverlay from './components/overlays/NudgeOverlay.jsx';
import { Bell } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState('home'); // home | dex | planner
  const [nudgeOpen, setNudgeOpen] = useState(false);

  return (
    <>
      {/* Demo-only trigger, rendered on the desktop chrome (outside the phone) */}
      <DevDock onNudge={() => setNudgeOpen(true)} />

    <PhoneFrame>
      {screen === 'home' && (
        <HomeScreen
          onOpenDex={() => setScreen('dex')}
          onOpenTomorrow={() => setScreen('tomorrow')}
          onNavigate={() => {}}
        />
      )}
      {screen === 'dex' && (
        <DexChatScreen
          onBack={() => setScreen('home')}
          onCreatePocket={() => setScreen('planner')}
          onOpenTomorrow={() => setScreen('tomorrow')}
        />
      )}
      {screen === 'tomorrow' && (
        <TomorrowBudgetScreen onBack={() => setScreen('home')} />
      )}
      {screen === 'planner' && (
        <GoalPlannerScreen
          onBack={() => setScreen('dex')}
          onConfirm={() => {
            setScreen('home');
            setTimeout(() => setNudgeOpen(true), 600);
          }}
        />
      )}

      <NudgeOverlay
        open={nudgeOpen}
        onPause={() => setNudgeOpen(false)}
        onDismiss={() => setNudgeOpen(false)}
      />
    </PhoneFrame>
    </>
  );
}

function DevDock({ onNudge }) {
  return (
    <div className="fixed top-4 left-4 z-[100] flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-wider text-white/40">Demo controls</span>
      <button
        onClick={onNudge}
        title="Trigger behavioural nudge"
        className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium text-white/90 ring-1 ring-white/15 hover:bg-white/20"
      >
        <Bell size={12} /> Trigger Nudge
      </button>
    </div>
  );
}
