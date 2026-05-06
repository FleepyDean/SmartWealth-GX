import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  X,
  Pencil,
  Sparkles,
  CalendarDays,
  UtensilsCrossed,
  Bus,
  Car,
  Send,
  MapPin,
} from 'lucide-react';
import BudgetDonut from '../components/tomorrow/BudgetDonut.jsx';
import CategoryRow from '../components/tomorrow/CategoryRow.jsx';
import useHorizontalScroll from '../hooks/useHorizontalScroll.js';

const COLORS = {
  food: '#F5A524',
  transport: '#818CF8',
  entertainment: '#EC4899',
  others: '#34D399',
};

const BASE_PLAN = {
  food: 50,
  transport: 8,
  entertainment: 25,
  others: 12,
  meal: { name: 'Chicken Chop', price: 15, place: 'Restaurant AA' },
  transportMode: { name: 'Public Bus', price: 8, sub: 'per trip (est.)', icon: 'bus' },
  rationale:
    'Based on your Google Calendar, you are likely to visit Restaurant AA tomorrow. Your food budget is expected to increase by RM20.00. Suggested option: Chicken Chop (RM15.00) to keep costs lean. Recommended transport: Public Bus (approx. RM8.00 return).',
};

export default function TomorrowBudgetScreen({ onBack }) {
  const [plan, setPlan] = useState(BASE_PLAN);
  const [revised, setRevised] = useState(false);
  const [chat, setChat] = useState([]); // {from:'user'|'dex', text}
  const [input, setInput] = useState('');
  const [adjustOpen, setAdjustOpen] = useState(false);
  const chipsRef = useHorizontalScroll();
  const chatRef = useRef(null);

  const total = plan.food + plan.transport + plan.entertainment + plan.others;
  const pct = (v) => Math.round((v / total) * 100);

  const segments = useMemo(
    () => [
      { key: 'food', value: plan.food, color: COLORS.food },
      { key: 'transport', value: plan.transport, color: COLORS.transport },
      { key: 'entertainment', value: plan.entertainment, color: COLORS.entertainment },
      { key: 'others', value: plan.others, color: COLORS.others },
    ],
    [plan]
  );

  const pushChat = (msgs) => {
    setChat((c) => [...c, ...msgs]);
    setTimeout(() => chatRef.current?.scrollTo({ top: 9e9, behavior: 'smooth' }), 50);
  };

  const applyAdjustment = (text) => {
    const t = text.toLowerCase();
    pushChat([{ from: 'user', text }]);

    setTimeout(() => {
      if (t.includes('grab') || t.includes('e-hail') || t.includes('uber')) {
        setPlan((p) => ({
          ...p,
          transport: 22,
          transportMode: { name: 'Grab Car', price: 22, sub: 'per trip (est.)', icon: 'car' },
        }));
        setRevised(true);
        pushChat([
          {
            from: 'dex',
            text: `Done! Switched to Grab Car. Transport revised to RM22.00 — your new total is RM${
              plan.food + 22 + plan.entertainment + plan.others
            }.00.`,
          },
        ]);
      } else if (t.includes('cheaper') || t.includes('cheap meal')) {
        setPlan((p) => ({
          ...p,
          food: 35,
          meal: { name: 'Nasi Lemak Combo', price: 8, place: 'Mama Kim Kopitiam' },
        }));
        setRevised(true);
        pushChat([
          {
            from: 'dex',
            text: 'Found a cheaper option: Nasi Lemak Combo (RM8) at Mama Kim Kopitiam. Food budget revised to RM35.00.',
          },
        ]);
      } else if (t.includes('skip ent') || (t.includes('skip') && t.includes('entertain'))) {
        setPlan((p) => ({ ...p, entertainment: 0 }));
        setRevised(true);
        pushChat([
          {
            from: 'dex',
            text: 'Entertainment skipped for tomorrow. That frees up RM25 — I can route it to your Langkawi pocket if you want.',
          },
        ]);
      } else {
        pushChat([
          {
            from: 'dex',
            text: "Got it — I'll factor that in. Anything else you'd like me to adjust?",
          },
        ]);
      }
    }, 400);
  };

  const send = () => {
    if (!input.trim()) return;
    applyAdjustment(input.trim());
    setInput('');
  };

  const SUGGESTIONS = [
    'I prefer Grab instead of the bus',
    'Find me a cheaper meal',
    'Skip entertainment tomorrow',
  ];

  const TransportIcon = plan.transportMode.icon === 'car' ? Car : Bus;

  return (
    <div className="relative h-full w-full text-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <p className="text-[12px] uppercase tracking-wider text-text-muted">Predicted spend</p>
        <div className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-5">
        {/* Title */}
        <h1 className="text-[28px] leading-tight font-bold tracking-tight mt-1">
          Tomorrow's
          <br />
          Budget
        </h1>

        {/* Donut + categories */}
        <div className="mt-4 grid grid-cols-[auto,1fr] gap-3 items-center">
          <BudgetDonut segments={segments} total={total} size={130} stroke={14} />
          <div className="space-y-2 min-w-0">
            <CategoryRow
              icon={<UtensilsCrossed size={14} />}
              label="Food"
              amount={plan.food}
              pct={pct(plan.food)}
              color={COLORS.food}
            />
            <CategoryRow
              icon={<TransportIcon size={14} />}
              label="Transport"
              amount={plan.transport}
              pct={pct(plan.transport)}
              color={COLORS.transport}
            />
            <CategoryRow
              icon={<Sparkles size={14} />}
              label="Entertainment"
              amount={plan.entertainment}
              pct={pct(plan.entertainment)}
              color={COLORS.entertainment}
            />
            <CategoryRow
              icon={<CalendarDays size={14} />}
              label="Others"
              amount={plan.others}
              pct={pct(plan.others)}
              color={COLORS.others}
            />
          </div>
        </div>

        {/* AI Budget Plan */}
        <div className="mt-5 rounded-3xl bg-card ring-1 ring-white/5 p-4 card-hi">
          <div className="flex items-center justify-between">
            <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-violet-glow font-semibold">
              <Sparkles size={12} /> AI Budget Plan
            </p>
            {revised && (
              <span className="text-[10px] font-bold tracking-wide rounded-full bg-accent-mint/20 text-accent-mint px-2 py-0.5">
                REVISED
              </span>
            )}
          </div>

          {/* Calendar event */}
          <div className="mt-3 rounded-2xl bg-violet/10 ring-1 ring-violet/30 p-3">
            <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-violet-glow font-semibold">
              <CalendarDays size={12} /> Calendar event detected
            </p>
            <p className="text-[14px] font-semibold text-white mt-1">
              {plan.meal.place} · Tomorrow, 12:30 PM
            </p>
          </div>

          <p className="text-[12px] text-text-secondary mt-3 leading-relaxed">
            {revised
              ? `Plan revised. Your updated total is RM${total}.00 — we still recommend ${plan.meal.name} (RM${plan.meal.price}.00) at ${plan.meal.place}.`
              : plan.rationale}
          </p>

          {/* Suggestion tiles */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Tile
              icon={<UtensilsCrossed size={12} />}
              label="Meal suggestion"
              title={plan.meal.name}
              amount={`RM${plan.meal.price}.00`}
              sub={
                <span className="inline-flex items-center gap-1">
                  <MapPin size={10} /> {plan.meal.place}
                </span>
              }
            />
            <Tile
              icon={<TransportIcon size={12} />}
              label="Transport"
              title={plan.transportMode.name}
              amount={`RM${plan.transportMode.price}.00`}
              sub={plan.transportMode.sub}
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() =>
              pushChat([
                {
                  from: 'dex',
                  text: `Plan applied. I'll remind you 30 minutes before each event tomorrow.`,
                },
              ])
            }
            className="rounded-2xl bg-violet-grad py-3.5 text-[14px] font-semibold text-white shadow-[0_8px_28px_rgba(124,58,237,0.55)] hover:brightness-110 inline-flex items-center justify-center gap-2"
          >
            <Bell size={15} /> Apply & Remind
          </button>
          <button
            onClick={() => {
              const next = !adjustOpen;
              setAdjustOpen(next);
              if (next) {
                setTimeout(
                  () => chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                  60
                );
              }
            }}
            className="rounded-2xl bg-white/5 ring-1 ring-white/15 py-3.5 text-[14px] font-semibold text-white hover:bg-white/10 inline-flex items-center justify-center gap-2"
          >
            {adjustOpen ? <X size={15} /> : <Pencil size={15} />}{' '}
            {adjustOpen ? 'Close' : 'Adjust Plan'}
          </button>
        </div>

        {/* Adjust your plan */}
        {adjustOpen && (
        <div className="mt-5 rounded-3xl bg-card ring-1 ring-white/5 p-4 card-hi animate-floatUp" ref={chatRef}>
          <p className="text-[11px] uppercase tracking-wider text-text-muted">Adjust your plan</p>

          {/* Chat history */}
          {chat.length > 0 && (
            <div className="mt-3 space-y-2">
              {chat.map((m, i) => (
                <div
                  key={i}
                  className={`w-full flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 text-[12.5px] leading-snug rounded-2xl ${
                      m.from === 'user'
                        ? 'bg-violet-grad text-white rounded-br-md'
                        : 'bg-white/5 ring-1 ring-white/10 rounded-bl-md'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestion chips */}
          <div
            ref={chipsRef}
            className="mt-3 flex gap-2 overflow-x-auto no-scrollbar cursor-grab select-none"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => applyAdjustment(s)}
                className="shrink-0 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-[11px] text-text-secondary hover:bg-white/10 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="mt-3 flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 pl-4 pr-1.5 py-1.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Tell me your preferences…"
              className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-text-muted text-white py-1.5"
            />
            <button
              onClick={send}
              className="h-8 w-8 rounded-full bg-violet-grad flex items-center justify-center"
              aria-label="Send"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
        )}

        <p className="text-center text-[10px] text-text-muted mt-4">
          Powered by AI · Estimates from your calendar & spending history
        </p>
      </div>
    </div>
  );
}

function Tile({ icon, label, title, amount, sub }) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
      <p className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-violet-glow font-semibold">
        {icon} {label}
      </p>
      <p className="text-[13px] font-semibold text-white mt-1">{title}</p>
      <p className="text-[18px] font-bold text-accent-flame mt-0.5 tabular-nums">{amount}</p>
      <p className="text-[10px] text-text-muted mt-0.5">{sub}</p>
    </div>
  );
}
