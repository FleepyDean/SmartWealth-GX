import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  Plus,
  Palmtree,
  Watch,
  Cpu,
  ChevronRight,
  Sparkles,
  TrendingUp,
  PiggyBank,
  Coins,
  Wallet,
  X,
  CheckCircle2,
  Dices,
  Delete,
} from 'lucide-react';
import BottomNav from '../components/ui/BottomNav.jsx';

function buildPockets(langkawiAuto) {
  return [
  {
    id: 1,
    name: 'Apple Watch 12',
    icon: Watch,
    iconBg: 'from-sky-500/30 to-blue-500/20',
    iconColor: 'text-sky-300',
    accentGlow: 'bg-sky-400/20',
    barColor: 'from-sky-400 to-blue-500',
    target: 1299,
    saved: 629.9,
    roundUp: true,
    salary: true,
    eta: '23 days left',
    streak: 18,
  },
  {
    id: 2,
    name: 'RTX 5080',
    icon: Cpu,
    iconBg: 'from-emerald-500/30 to-teal-500/20',
    iconColor: 'text-emerald-300',
    accentGlow: 'bg-emerald-400/20',
    barColor: 'from-emerald-400 to-teal-500',
    target: 4200,
    saved: 1850,
    roundUp: true,
    salary: false,
    eta: '~3 months left',
    streak: 11,
  },
  {
    id: 3,
    name: 'Langkawi Trip',
    icon: Palmtree,
    iconBg: 'from-fuchsia-500/30 to-violet-500/20',
    iconColor: 'text-fuchsia-300',
    accentGlow: 'bg-fuchsia-400/20',
    barColor: 'from-fuchsia-400 to-violet-500',
    target: 900,
    saved: 0,
    roundUp: langkawiAuto.roundUp,
    salary: langkawiAuto.salary,
    eta: 'Just started',
    streak: 0,
    isNew: true,
  },
  ];
}

export default function SavingPocketsScreen({
  onBack,
  onAddNew,
  langkawiAuto = { roundUp: false, salary: false },
  pocketSavings = { 1: 629.9, 2: 1850, 3: 0 },
  pocketActivity = { 1: [], 2: [], 3: [] },
  onAddMoney = () => {},
}) {
  const [activePocket, setActivePocket] = useState(null);
  const BASE_POCKETS = buildPockets(langkawiAuto);
  // Merge shared saved amounts into pocket definitions
  const POCKETS = BASE_POCKETS.map((p) => ({ ...p, saved: pocketSavings[p.id] ?? p.saved }));
  const totalSaved = POCKETS.reduce((s, p) => s + p.saved, 0);

  if (activePocket !== null) {
    const pocket = POCKETS.find((p) => p.id === activePocket);
    return (
      <PocketDetail
        pocket={pocket}
        activity={pocketActivity[pocket.id] ?? []}
        onBack={() => setActivePocket(null)}
        onAddMoney={(amount) => onAddMoney(pocket.id, amount)}
      />
    );
  }

  return (
    <div className="relative h-full w-full text-white">
      <div className="h-full overflow-y-auto no-scrollbar pb-28">
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="tap h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/15"
          >
            <ChevronLeft size={20} />
          </button>
          <p className="text-[16px] font-bold">Saving Pockets</p>
          <button
            onClick={onAddNew}
            className="tap h-9 w-9 rounded-full bg-violet-grad ring-1 ring-white/20 flex items-center justify-center shadow-[0_4px_14px_rgba(124,58,237,0.5)]"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Total summary */}
        <div className="mx-5 mt-3 rounded-3xl card-premium ring-1 ring-white/8 p-5 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-accent-pink/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-violet-glow/15 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <PiggyBank size={14} className="text-accent-pink" />
              <p className="text-[11px] uppercase tracking-widest text-text-muted font-semibold">Total saved</p>
            </div>
            <p className="text-[34px] font-bold tracking-tight">
              RM{totalSaved.toLocaleString('en-MY', { minimumFractionDigits: 2 })}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <TrendingUp size={12} className="text-accent-mint" />
              <p className="text-[12px] text-accent-mint font-medium">RM320 added this month</p>
              <span className="ml-auto text-[11px] text-text-muted">{POCKETS.length} pockets</span>
            </div>
          </div>
        </div>

        {/* Pocket cards */}
        <div className="px-5 mt-5 space-y-3">
          {POCKETS.map((pocket) => (
            <PocketCard
              key={pocket.id}
              pocket={pocket}
              onOpen={() => setActivePocket(pocket.id)}
            />
          ))}
        </div>

        {/* Add new CTA */}
        <div className="px-5 mt-4">
          <button
            onClick={onAddNew}
            className="tap w-full rounded-3xl border-2 border-dashed border-white/15 py-4 flex items-center justify-center gap-2 text-[13px] text-text-secondary hover:border-violet-glow/40 hover:text-white transition-all"
          >
            <Plus size={16} />
            Add new pocket
          </button>
        </div>
      </div>

      <BottomNav active="home" onNavigate={() => {}} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pocket Card
// ---------------------------------------------------------------------------
function PocketCard({ pocket, onOpen }) {
  const Icon = pocket.icon;
  const pct = pocket.target > 0 ? Math.min(100, Math.round((pocket.saved / pocket.target) * 100)) : 0;

  return (
    <button
      onClick={onOpen}
      className="lift tap w-full text-left rounded-3xl card-premium ring-1 ring-white/8 p-4 relative overflow-hidden hover:ring-white/15"
    >
      {/* Ambient glow */}
      <div className={`absolute -top-6 -right-6 h-28 w-28 rounded-full ${pocket.accentGlow} blur-2xl pointer-events-none`} />

      {pocket.isNew && (
        <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-300 ring-1 ring-fuchsia-400/30 px-2 py-0.5 rounded-full">
          New
        </span>
      )}

      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${pocket.iconBg} ring-1 ring-white/10 flex items-center justify-center shrink-0`}>
          <Icon size={20} className={pocket.iconColor} strokeWidth={2} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold text-white">{pocket.name}</p>
            <ChevronRight size={16} className="text-text-muted shrink-0" />
          </div>

          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-[18px] font-bold text-white">
              RM{pocket.saved.toLocaleString('en-MY')}
            </span>
            <span className="text-[11px] text-text-muted">
              / RM{pocket.target.toLocaleString('en-MY')}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 rounded-full bg-white/8 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${pocket.barColor} transition-all`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[11px] text-text-muted">{pocket.eta}</span>
            <span className={`text-[11px] font-semibold ${pct > 0 ? 'text-white' : 'text-text-muted'}`}>
              {pct}%
            </span>
          </div>
        </div>
      </div>

      {/* Auto-save chip */}
      {(pocket.roundUp || pocket.salary) && (
        <div className="relative mt-3 flex items-center gap-1.5 rounded-xl bg-white/5 ring-1 ring-white/8 px-2.5 py-1.5">
          <Sparkles size={10} className="text-violet-glow" />
          <span className="text-[11px] text-text-secondary">Auto-saving active</span>
          {pocket.streak > 0 && (
            <span className="ml-auto text-[11px] font-semibold text-amber-300">
              🔥 {pocket.streak}-day streak
            </span>
          )}
        </div>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Pocket Detail
// ---------------------------------------------------------------------------
const DAILY_GOAL = 30;

function PocketDetail({ pocket, activity, onBack, onAddMoney }) {
  const Icon = pocket.icon;
  const [showSheet, setShowSheet] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);

  const pct = pocket.target > 0 ? Math.min(100, Math.round((pocket.saved / pocket.target) * 100)) : 0;
  const remaining = Math.max(0, pocket.target - pocket.saved);

  function handleAddMoney(amount) {
    setLastAdded(amount);
    onAddMoney(amount);
    setShowSheet(false);
    setTimeout(() => setShowSuccess(true), 300);
  }

  return (
    <div className="relative h-full w-full text-white">
      <div className="h-full overflow-y-auto no-scrollbar pb-28">
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="tap h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/15"
          >
            <ChevronLeft size={20} />
          </button>
          <p className="text-[16px] font-bold">{pocket.name}</p>
          <div className="h-9 w-9" />
        </div>

        {/* Hero */}
        <div className="mx-5 mt-3 rounded-3xl card-premium ring-1 ring-white/8 p-5 relative overflow-hidden">
          <div className={`absolute -top-10 -right-10 h-44 w-44 rounded-full ${pocket.accentGlow} blur-3xl pointer-events-none`} />
          <div className="relative flex items-center gap-4">
            <div className={`h-16 w-16 rounded-3xl bg-gradient-to-br ${pocket.iconBg} ring-1 ring-white/10 flex items-center justify-center shrink-0`}>
              <Icon size={30} className={pocket.iconColor} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-text-muted font-semibold">Saved so far</p>
              <p className="text-[32px] font-bold tracking-tight text-white">
                RM{pocket.saved.toLocaleString('en-MY', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[12px] text-text-muted">
                of RM{pocket.target.toLocaleString('en-MY')} goal
              </p>
            </div>
          </div>

          {/* Big progress bar */}
          <div className="mt-5 h-3 rounded-full bg-white/8 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${pocket.barColor}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[12px] text-text-muted">{pct}% reached</span>
            <span className="text-[12px] text-text-muted">RM{remaining.toLocaleString('en-MY', { minimumFractionDigits: 2 })} to go</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="mx-5 mt-3 grid grid-cols-3 gap-2">
          {[
            { label: 'Target', value: `RM${pocket.target.toLocaleString('en-MY')}` },
            { label: 'ETA', value: pocket.eta },
            { label: 'Streak', value: pocket.streak > 0 ? `🔥 ${pocket.streak}d` : '—' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/[0.04] ring-1 ring-white/8 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">{s.label}</p>
              <p className="mt-1 text-[14px] font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Automated savings — two separate rows */}
        <div className="mx-5 mt-3">
          <p className="text-[13px] font-semibold text-white mb-2">Automated savings</p>
          <div className="space-y-2">
            <AutoRow
              icon={<Coins size={18} />}
              title="Round-up Daily Spends"
              subtitle="Spare change from every spend is auto-saved here."
              on={pocket.roundUp}
            />
            <AutoRow
              icon={<Wallet size={18} />}
              title="Smart Salary Deduction"
              subtitle="Auto-pull 5% the moment your salary lands."
              on={pocket.salary}
            />
          </div>
        </div>

        {/* Activity log */}
        <div className="mx-5 mt-4">
          <p className="text-[13px] font-semibold text-white mb-2">Activity</p>
          <div className="rounded-3xl bg-white/[0.03] ring-1 ring-white/6 overflow-hidden">
            {activity.length > 0 ? (
              activity.map((a, i) => (
                <ActivityRow key={a.id} label={a.label} amount={a.amount} date={a.date} isLast={i === activity.length - 1} />
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-[13px] text-text-muted">No activity yet</p>
                <p className="text-[11px] text-text-muted mt-1">Add money to start saving</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-5 mt-5">
          <button
            onClick={() => setShowSheet(true)}
            className="tap w-full rounded-3xl bg-violet-grad py-4 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(124,58,237,0.55)] hover:brightness-110 active:scale-[0.98] transition-all"
          >
            Add Money
          </button>
        </div>
      </div>

      {/* Add Money bottom sheet */}
      <AddMoneySheet
        open={showSheet}
        pocketName={pocket.name}
        onClose={() => setShowSheet(false)}
        onConfirm={handleAddMoney}
      />

      {/* Success modal */}
      {showSuccess && (
        <SuccessModal
          amount={lastAdded}
          pocketName={pocket.name}
          onDismiss={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}

function AutoRow({ icon, title, subtitle, on }) {
  return (
    <div className="card-hi rounded-3xl bg-card p-4 ring-1 ring-white/5 flex items-start gap-3">
      <div className="h-10 w-10 rounded-2xl bg-violet/15 ring-1 ring-violet/30 text-violet-glow flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-white">{title}</p>
        <p className="text-[12px] text-text-secondary mt-0.5 leading-snug">{subtitle}</p>
      </div>
      <div
        className={`relative h-7 w-[52px] rounded-full shrink-0 transition-colors duration-300 ${
          on ? 'bg-violet-grad shadow-[0_0_12px_rgba(124,58,237,0.5)]' : 'bg-white/15'
        }`}
      >
        <span
          className={`absolute top-[3px] left-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-md transition-transform duration-300 ${
            on ? 'translate-x-[25px]' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  );
}

function ActivityRow({ label, amount, date, isLast }) {
  return (
    <div className={`flex items-center px-4 py-3 gap-3 ${!isLast ? 'border-b border-white/[0.05]' : ''}`}>
      <div className="h-8 w-8 rounded-xl bg-accent-mint/10 ring-1 ring-accent-mint/20 flex items-center justify-center">
        <TrendingUp size={14} className="text-accent-mint" />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-medium text-white">{label}</p>
        <p className="text-[11px] text-text-muted">{date}</p>
      </div>
      <p className="text-[13px] font-bold text-accent-mint">+RM{amount.toFixed(2)}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Add Money — numpad bottom sheet
// ---------------------------------------------------------------------------
const QUICK_AMOUNTS = [10, 30, 50, 100];
const PAD = ['1','2','3','4','5','6','7','8','9','.','0','⌫'];

function AddMoneySheet({ open, pocketName, onClose, onConfirm }) {
  const [input, setInput] = useState('0');

  function press(key) {
    setInput((prev) => {
      if (key === '⌫') return prev.length > 1 ? prev.slice(0, -1) : '0';
      if (key === '.' && prev.includes('.')) return prev;
      if (prev === '0' && key !== '.') return key;
      if (prev.includes('.') && prev.split('.')[1].length >= 2) return prev;
      return prev + key;
    });
  }

  function confirm() {
    const amt = parseFloat(input);
    if (!amt || amt <= 0) return;
    onConfirm(amt);
    setInput('0');
  }

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative bg-[#1a1030] rounded-t-[32px] ring-1 ring-white/10 px-5 pt-5 pb-8 animate-slideUp">
        {/* Handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />

        <div className="flex items-center justify-between mb-5">
          <p className="text-[15px] font-bold">Add to {pocketName}</p>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {/* Amount display */}
        <div className="text-center mb-4">
          <p className="text-[11px] uppercase tracking-widest text-text-muted mb-1">Amount</p>
          <p className="text-[44px] font-bold tracking-tight">
            RM{parseFloat(input || '0').toLocaleString('en-MY', { minimumFractionDigits: input.includes('.') ? (input.split('.')[1]?.length || 0) : 0 })}
          </p>
        </div>

        {/* Quick amounts */}
        <div className="flex gap-2 mb-5">
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setInput(String(a))}
              className="flex-1 rounded-2xl bg-white/8 ring-1 ring-white/10 py-2 text-[13px] font-semibold text-white hover:bg-white/15 transition-colors"
            >
              RM{a}
            </button>
          ))}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {PAD.map((k) => (
            <button
              key={k}
              onClick={() => press(k)}
              className="tap rounded-2xl bg-white/5 ring-1 ring-white/8 py-4 text-[20px] font-semibold text-white hover:bg-white/12 active:scale-95 transition-all flex items-center justify-center"
            >
              {k === '⌫' ? <Delete size={20} /> : k}
            </button>
          ))}
        </div>

        {/* Confirm */}
        <button
          onClick={confirm}
          disabled={!parseFloat(input) || parseFloat(input) <= 0}
          className="tap w-full rounded-3xl bg-violet-grad py-4 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(124,58,237,0.5)] hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          Confirm — Add RM{parseFloat(input || '0').toFixed(2)}
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.32,0.72,0,1) both; }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Success modal — daily goal reached + spin reward
// ---------------------------------------------------------------------------
function SuccessModal({ amount, pocketName, onDismiss }) {
  const [confettiDone, setConfettiDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setConfettiDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const metDaily = amount >= DAILY_GOAL;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Floating confetti dots */}
      {!confettiDone && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${6 + (i % 4) * 3}px`,
                height: `${6 + (i % 4) * 3}px`,
                left: `${5 + (i * 17) % 90}%`,
                top: `-${10 + (i * 7) % 20}%`,
                background: ['#a855f7','#ec4899','#34d399','#f59e0b','#818cf8'][i % 5],
                animation: `confettiFall ${1.4 + (i % 5) * 0.22}s ${(i % 7) * 0.12}s ease-in forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Card */}
      <div className="relative w-full rounded-t-[32px] bg-[#1a1030] ring-1 ring-white/10 px-6 pt-6 pb-10 animate-slideUp text-center">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />

        {/* Success icon */}
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-accent-mint/15 ring-2 ring-accent-mint/40 flex items-center justify-center">
          <CheckCircle2 size={34} className="text-accent-mint" strokeWidth={1.8} />
        </div>

        <p className="text-[22px] font-bold mb-1">RM{amount.toFixed(2)} added!</p>
        <p className="text-[13px] text-text-secondary mb-5">
          Saved to your <span className="text-white font-semibold">{pocketName}</span> pocket
        </p>

        {/* Daily goal badge */}
        {metDaily && (
          <div className="mb-5 mx-auto max-w-xs rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-400/10 ring-1 ring-amber-400/30 px-4 py-3">
            <p className="text-[13px] font-bold text-amber-300">🎯 Daily saving goal reached!</p>
            <p className="text-[11px] text-amber-200/70 mt-0.5">
              You hit your RM{DAILY_GOAL} daily target — great discipline!
            </p>
          </div>
        )}

        {/* Spin reward */}
        {metDaily && (
          <div className="mb-6 mx-auto max-w-xs rounded-2xl bg-gradient-to-r from-violet-600/25 to-fuchsia-500/15 ring-1 ring-violet-400/30 px-4 py-4 flex items-center gap-3 text-left">
            <div className="h-12 w-12 rounded-2xl bg-violet-grad flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(124,58,237,0.6)]">
              <Dices size={22} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white">🎉 You earned 1 free spin!</p>
              <p className="text-[11px] text-text-secondary mt-0.5">
                Head to Spin & Win to redeem your reward.
              </p>
            </div>
          </div>
        )}

        {!metDaily && (
          <div className="mb-6 mx-auto max-w-xs rounded-2xl bg-white/5 ring-1 ring-white/8 px-4 py-3">
            <p className="text-[12px] text-text-secondary">
              Save <span className="text-white font-semibold">RM{(DAILY_GOAL - amount).toFixed(2)}</span> more today to hit your daily goal and earn a free spin!
            </p>
          </div>
        )}

        <button
          onClick={onDismiss}
          className="tap w-full rounded-3xl bg-violet-grad py-4 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(124,58,237,0.5)] hover:brightness-110 transition-all"
        >
          {metDaily ? 'Awesome, let\'s go! 🎉' : 'Got it'}
        </button>
      </div>

      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
