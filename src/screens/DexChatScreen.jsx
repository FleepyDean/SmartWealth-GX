import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, Send, Sparkles, MoreHorizontal } from 'lucide-react';
import ToneChips from '../components/dex/ToneChips.jsx';
import ChatBubble from '../components/dex/ChatBubble.jsx';
import TripDraftCard from '../components/dex/TripDraftCard.jsx';
import LifestyleRecsCard from '../components/dex/LifestyleRecsCard.jsx';
import TomorrowPreviewCard from '../components/dex/TomorrowPreviewCard.jsx';
import useHorizontalScroll from '../hooks/useHorizontalScroll.js';

const TONE_GREETING = {
  professional: "Hello. I'm Dex, your financial assistant. Share a goal or plan and I'll structure it for you.",
  strict: "I'm Dex. State your goal clearly and I'll hold you to a disciplined plan.",
  hype: "YOOO it's Dex! ✨ Drop a goal and let's CRUSH it together!",
};

const TRIP_INTRO = {
  professional: "Understood. I'll prepare a structured savings plan for your Langkawi trip.",
  strict: "Noted. Discipline first — here is the budget you must commit to.",
  hype: "LET'S GOOO! ✨ Langkawi adventure incoming — here's your power plan!",
};

export default function DexChatScreen({ onBack, onCreatePocket, onOpenTomorrow }) {
  const [tone, setTone] = useState('professional');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'dex', type: 'text', text: TONE_GREETING.professional },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: 'smooth' });
  }, [messages.length]);

  // Keep the initial greeting in sync with the selected tone.
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) => (m.id === 1 ? { ...m, text: TONE_GREETING[tone] } : m))
    );
  }, [tone]);

  // Heuristic intent detection — production would call an NLU model.
  const detectIntent = (text) => {
    const t = text.toLowerCase();
    const tomorrowWords = ['tomorrow', 'plan tomorrow', 'schedule', 'calendar', "tmrw"];
    if (tomorrowWords.some((w) => t.includes(w))) return { kind: 'tomorrow', label: text };
    const tripWords = ['langkawi', 'trip', 'vacation', 'holiday', 'travel', 'getaway'];
    if (tripWords.some((w) => t.includes(w))) return { kind: 'trip', label: text };
    const foodWords = ['eat', 'dinner', 'lunch', 'breakfast', 'food', 'restaurant', 'makan', 'cafe', 'coffee', 'movie'];
    if (foodWords.some((w) => t.includes(w))) {
      const m = t.match(/rm\s?(\d+)/);
      const budget = m ? parseInt(m[1], 10) : 30;
      return { kind: 'lifestyle', budget, label: text };
    }
    return { kind: 'text' };
  };

  const sendText = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', type: 'text', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    const intent = detectIntent(text);
    setTimeout(() => {
      if (intent.kind === 'tomorrow') {
        setMessages((m) => [
          ...m,
          {
            id: Date.now() + 1,
            from: 'dex',
            type: 'text',
            text: "Pulled your calendar and recent spend — here's tomorrow's predicted budget:",
          },
          { id: Date.now() + 2, from: 'dex', type: 'tomorrow' },
        ]);
      } else if (intent.kind === 'trip') {
        setMessages((m) => [
          ...m,
          { id: Date.now() + 1, from: 'dex', type: 'text', text: TRIP_INTRO[tone] },
          { id: Date.now() + 2, from: 'dex', type: 'trip' },
        ]);
      } else if (intent.kind === 'lifestyle') {
        setMessages((m) => [
          ...m,
          {
            id: Date.now() + 1,
            from: 'dex',
            type: 'text',
            text: `Got it — "${intent.label}" with ~RM${intent.budget}. Let me check your safe-to-spend and pull options that protect your Langkawi goal…`,
          },
          {
            id: Date.now() + 2,
            from: 'dex',
            type: 'lifestyle',
            intent: intent.label,
            budget: intent.budget,
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: Date.now() + 1,
            from: 'dex',
            type: 'text',
            text: "Got it — I'll fold that into your plan. Want me to adjust the budget?",
          },
        ]);
      }
    }, 600);
  };

  const send = () => sendText(input);

  const SUGGESTIONS = [
    "What's my budget tomorrow?",
    'I want to go to Langkawi next month for 3 days',
    'Dinner with friends, budget RM30',
    'Movie night under RM25',
  ];

  const suggestionsRef = useHorizontalScroll();

  return (
    <div className="relative h-full w-full text-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-3 pb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-violet-grad flex items-center justify-center shadow-[0_4px_18px_rgba(124,58,237,0.55)]">
              <Sparkles size={18} />
            </div>
            <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-accent-mint ring-2 ring-bg-800" />
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-semibold">Dex</p>
            <p className="text-[11px] text-accent-mint">AI Assistant</p>
          </div>
        </div>
        <button className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <ToneChips value={tone} onChange={setTone} />

      {/* Chat scroll */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-3 space-y-3">
        {messages.map((m) => {
          if (m.type === 'trip') {
            return (
              <div key={m.id} className="w-full flex justify-start animate-floatUp">
                <div className="max-w-[88%] w-full">
                  <TripDraftCard onCreate={onCreatePocket} />
                </div>
              </div>
            );
          }
          if (m.type === 'tomorrow') {
            return (
              <div key={m.id} className="w-full flex justify-start animate-floatUp">
                <div className="max-w-[88%] w-full">
                  <TomorrowPreviewCard onOpen={onOpenTomorrow} />
                </div>
              </div>
            );
          }
          if (m.type === 'lifestyle') {
            return (
              <div key={m.id} className="w-full flex justify-start animate-floatUp">
                <div className="max-w-[90%] w-full">
                  <LifestyleRecsCard
                    intent={m.intent}
                    userBudget={m.budget}
                    onBook={(opt) =>
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          from: 'dex',
                          type: 'text',
                          text: `Booked ${opt.name} at RM${opt.price}. Logged to your dining budget — Langkawi pocket still on track ✅`,
                        },
                      ])
                    }
                    onSubstitute={(opt) =>
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          from: 'dex',
                          type: 'text',
                          text: `Smart swap applied — ${opt.name} saves you RM${45 - opt.price} vs your usual.`,
                        },
                      ])
                    }
                  />
                </div>
              </div>
            );
          }
          return (
            <ChatBubble key={m.id} from={m.from}>
              {m.text}
            </ChatBubble>
          );
        })}
      </div>

      {/* Suggestion chips */}
      <div
        ref={suggestionsRef}
        className="px-5 pt-1 pb-1 flex gap-2 overflow-x-auto no-scrollbar cursor-grab select-none"
      >
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => sendText(s)}
            className="shrink-0 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-[11px] text-text-secondary hover:bg-white/10 hover:text-white"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-5 pt-2">
        <div className="glass card-hi flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask Dex anything…"
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-text-muted text-white py-2"
          />
          <button className="h-9 w-9 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/10">
            <Mic size={16} />
          </button>
          <button
            onClick={send}
            className="h-10 w-10 rounded-full bg-violet-grad flex items-center justify-center shadow-[0_4px_18px_rgba(124,58,237,0.55)]"
            aria-label="Send"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
