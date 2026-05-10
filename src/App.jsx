import React, { useState } from 'react';
import PhoneFrame from './components/ui/PhoneFrame.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import DexChatScreen from './screens/DexChatScreen.jsx';
import GoalPlannerScreen from './screens/GoalPlannerScreen.jsx';
import TomorrowBudgetScreen from './screens/TomorrowBudgetScreen.jsx';
import SpinAndWinScreen from './screens/SpinAndWinScreen.jsx';
import SnapAndLogScreen from './screens/SnapAndLogScreen.jsx';
import VisualExpenseGalleryScreen, { SAMPLE_EXPENSES } from './screens/VisualExpenseGalleryScreen.jsx';
import SavingPocketsScreen from './screens/SavingPocketsScreen.jsx';
import SplashScreen from './screens/SplashScreen.jsx';
import NudgeOverlay from './components/overlays/NudgeOverlay.jsx';
import DexAnalysisOverlay from './components/overlays/DexAnalysisOverlay.jsx';
import { Bell, Dices } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState('home'); // home | dex | planner | tomorrow | spin | snap | gallery | pockets
  const [splashDone, setSplashDone] = useState(false);
  const [nudgeOpen, setNudgeOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [capturedData, setCapturedData] = useState(null);
  const [galleryExpenses, setGalleryExpenses] = useState(SAMPLE_EXPENSES);
  const [langkawiAuto, setLangkawiAuto] = useState({ roundUp: false, salary: false });
  // Shared pocket savings: id → current saved amount
  const [pocketSavings, setPocketSavings] = useState({ 1: 629.9, 2: 1850, 3: 0 });
  // Shared pocket activity log: id → array of {id, label, amount, date}
  const [pocketActivity, setPocketActivity] = useState({
    1: [
      { id: 'a1', label: 'Round-up saved', amount: 12.30, date: 'Today' },
      { id: 'a2', label: 'Auto salary deduction', amount: 200.00, date: 'Yesterday' },
      { id: 'a3', label: 'Manual top-up', amount: 50.00, date: '7 May' },
    ],
    2: [
      { id: 'b1', label: 'Round-up saved', amount: 18.50, date: 'Today' },
      { id: 'b2', label: 'Auto salary deduction', amount: 160.00, date: 'Yesterday' },
      { id: 'b3', label: 'Manual top-up', amount: 100.00, date: '6 May' },
    ],
    3: [],
  });

  function addToPocket(id, amount) {
    setPocketSavings((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + amount }));
    setPocketActivity((prev) => ({
      ...prev,
      [id]: [
        { id: Date.now(), label: 'Manual top-up', amount, date: 'Just now' },
        ...(prev[id] ?? []),
      ],
    }));
  }

  const totalPocketSaved = Object.values(pocketSavings).reduce((s, v) => s + v, 0);
  const MAIN_ACCOUNT = 8420.10;
  const totalBalance = MAIN_ACCOUNT + totalPocketSaved;

  const addConfirmedExpenseToGallery = (data) => {
    const currentPrice = Number.parseFloat(data?.price ?? '0') || 0;
    const suggestedPrice = 8;
    const saved = Math.max(currentPrice - suggestedPrice, 0);
    const emoji = data?.category === 'receipt' ? '🧾' : '🍜';

    setGalleryExpenses((current) => [
      {
        id: Date.now(),
        emoji,
        name: data?.description?.trim() || 'Meal',
        price: currentPrice,
        saved,
        date: new Date().toISOString().slice(0, 10),
        image: data?.image || null,
      },
      ...current,
    ]);
  };

  return (
    <>
      {/* Demo-only trigger, rendered on the desktop chrome (outside the phone) */}
      <DevDock onNudge={() => setNudgeOpen(true)} />

    <PhoneFrame>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      {screen === 'home' && (
        <HomeScreen
          onOpenDex={() => setScreen('dex')}
          onOpenSpin={() => setScreen('spin')}
          onOpenTomorrow={() => setScreen('tomorrow')}
          onOpenPockets={() => setScreen('pockets')}
          pocketTotal={totalPocketSaved}
          totalBalance={totalBalance}
          onNavigate={(tab) => {
            if (tab === 'upload') {
              setScreen('gallery');
            }
          }}
        />
      )}
      {screen === 'pockets' && (
        <SavingPocketsScreen
          onBack={() => setScreen('home')}
          onAddNew={() => setScreen('planner')}
          langkawiAuto={langkawiAuto}
          pocketSavings={pocketSavings}
          pocketActivity={pocketActivity}
          onAddMoney={addToPocket}
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
          onConfirm={(autoSettings) => {
            setLangkawiAuto(autoSettings);
            setScreen('home');
            setTimeout(() => setNudgeOpen(true), 600);
          }}
        />
      )}
      {screen === 'spin' && (
        <SpinAndWinScreen
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'snap' && (
        <SnapAndLogScreen
          onBack={() => setScreen('home')}
          onCapture={(data) => {
            setCapturedData(data);
            setAnalysisOpen(true);
          }}
        />
      )}
      {screen === 'gallery' && (
        <VisualExpenseGalleryScreen
          onBack={() => setScreen('home')}
          onSnapPhoto={() => setScreen('snap')}
          expenses={galleryExpenses}
          onOpenAnalysis={(expense) => {
            // Open the existing analysis overlay pre-filled with this expense
            setCapturedData({
              image: expense.image || null,
              description: expense.name,
              price: String(expense.price),
            });
            setAnalysisOpen(true);
          }}
        />
      )}

      <DexAnalysisOverlay
        open={analysisOpen}
        image={capturedData?.image}
        mealName={capturedData?.description || 'Meal'}
        currentPrice={capturedData?.price || '0.00'}
        suggestedPrice="8.00"
        savingsAmount="12.00"
        onConfirm={() => {
          if (capturedData) {
            addConfirmedExpenseToGallery(capturedData);
          }
          setAnalysisOpen(false);
          setScreen('gallery');
        }}
        onRetake={() => setAnalysisOpen(false)}
      />

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
