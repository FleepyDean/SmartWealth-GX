import React, { useState } from 'react';
import { ChevronLeft, Plus, Sparkles, X } from 'lucide-react';
import BottomNav from '../components/ui/BottomNav.jsx';

// Sample expense data with real Unsplash food photos
export const SAMPLE_EXPENSES = [
  { id: 1, emoji: '🍜', name: 'Nasi Goreng', price: 20, saved: 12, date: '2026-5-9', category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1637759079728-3f900db7a782?w=400&q=80' },
  { id: 2, emoji: '☕', name: 'Flat White', price: 8, saved: 2, date: '2026-5-9', category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80' },
  { id: 3, emoji: '🍕', name: 'Margherita Pizza', price: 35, saved: 5, date: '2026-5-8', category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
  { id: 4, emoji: '🥗', name: 'Caesar Salad', price: 18, saved: 3, date: '2026-5-8', category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
  { id: 5, emoji: '🍔', name: 'Smash Burger', price: 15, saved: 4, date: '2026-5-7', category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
  { id: 6, emoji: '🍱', name: 'Bento Box', price: 25, saved: 8, date: '2026-5-7', category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80' },
];

export default function VisualExpenseGalleryScreen({ onBack, onSnapPhoto, onOpenAnalysis, expenses = SAMPLE_EXPENSES }) {
  const [selectedExpense, setSelectedExpense] = useState(null);

  const totalLogged = expenses.reduce((sum, e) => sum + e.price, 0);
  const totalSaved = expenses.reduce((sum, e) => sum + e.saved, 0);
  const isEmpty = expenses.length === 0;

  return (
    <div className="relative h-full w-full text-white overflow-hidden">
      <div className="absolute inset-0 bg-app-gradient" />

      <div className="relative h-full w-full overflow-y-auto pb-24 no-scrollbar">
        {/* Header */}
        <div className="sticky top-0 z-20 glass-strong px-5 pt-4 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="tap h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/15"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-center">
              <p className="text-[16px] font-bold">Food Diary</p>
              <p className="text-[11px] text-text-secondary">May 2026</p>
            </div>
            <button
              onClick={onSnapPhoto}
              className="tap h-9 w-9 rounded-full bg-violet-grad ring-1 ring-white/15 flex items-center justify-center hover:brightness-110 shadow-[0_4px_14px_rgba(124,58,237,0.5)]"
            >
              <Plus size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Stat strip */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 rounded-2xl bg-white/6 ring-1 ring-white/8 px-4 py-3">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Spent</p>
              <p className="text-[20px] font-extrabold text-white leading-tight">RM{totalLogged.toFixed(0)}</p>
            </div>
            <div className="h-10 w-px bg-white/8" />
            <div className="flex-1 rounded-2xl bg-accent-mint/8 ring-1 ring-accent-mint/20 px-4 py-3">
              <p className="text-[10px] text-accent-mint uppercase tracking-widest font-semibold">AI Saved</p>
              <div className="flex items-center gap-1.5">
                <p className="text-[20px] font-extrabold text-white leading-tight">RM{totalSaved.toFixed(0)}</p>
                <Sparkles size={13} className="text-accent-mint mb-0.5" />
              </div>
            </div>
            <div className="h-10 w-px bg-white/8" />
            <div className="flex-1 rounded-2xl bg-white/6 ring-1 ring-white/8 px-4 py-3">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Meals</p>
              <p className="text-[20px] font-extrabold text-white leading-tight">{expenses.length}</p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {isEmpty ? (
          <div className="h-full flex items-center justify-center px-5">
            <div className="text-center">
              <div className="text-[72px] mb-4">📸</div>
              <p className="text-[18px] font-bold text-white mb-2">Your gallery is empty!</p>
              <p className="text-[13px] text-text-secondary mb-6 leading-relaxed">
                Snap your next meal to start tracking the fun way.
              </p>
              <button
                onClick={onSnapPhoto}
                className="tap inline-flex items-center gap-2 rounded-2xl bg-violet-grad px-6 py-3 text-[14px] font-bold text-white shadow-[0_8px_28px_rgba(124,58,237,0.55)] hover:brightness-110"
              >
                <Plus size={18} strokeWidth={2.5} />
                Snap Your First Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="px-3 pt-4 pb-2">
            {/* Masonry-style 2-col grid with alternating tall/short */}
            <div className="grid grid-cols-2 gap-2.5">
              {expenses.map((expense, idx) => {
                const isTall = idx % 3 === 0;
                return (
                  <div
                    key={expense.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedExpense(expense)}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedExpense(expense); }}
                    className={`group tap relative overflow-hidden rounded-2xl cursor-pointer ring-1 ring-white/5 ${
                      isTall ? 'row-span-1' : ''
                    }`}
                    style={{ aspectRatio: isTall ? '3/4' : '1/1' }}
                  >
                    {/* Photo */}
                    <img
                      src={expense.image}
                      alt={expense.name}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    {/* Category chip top-left */}
                    {expense.category && (
                      <div className="absolute top-2.5 left-2.5">
                        <span className="rounded-full bg-black/50 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/80 ring-1 ring-white/10">
                          {expense.category}
                        </span>
                      </div>
                    )}

                    {/* Savings badge top-right */}
                    {expense.saved > 0 && (
                      <div className="absolute top-2.5 right-2.5">
                        <div className="flex items-center gap-0.5 rounded-full bg-accent-mint/80 backdrop-blur-sm px-2 py-1 shadow-sm">
                          <Sparkles size={10} className="text-bg-900" strokeWidth={2.5} />
                          <span className="text-[9px] font-extrabold text-bg-900">-RM{expense.saved}</span>
                        </div>
                      </div>
                    )}

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6">
                      <p className="text-[13px] font-bold text-white leading-tight truncate">{expense.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[18px] font-extrabold text-white leading-none">RM{expense.price}</span>
                        <span className="text-[10px] text-white/60">
                          {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-[11px] text-text-muted mt-5 mb-1">
              {expenses.length} meals logged · May 2026
            </p>
          </div>
        )}
      </div>

      {/* Expense Detail Bottom Sheet */}
      {selectedExpense && (
        <div className="absolute inset-0 z-40 flex items-end">
          <div
            onClick={() => setSelectedExpense(null)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
          />

          <div className="relative w-full animate-floatUp">
            {/* Hero image strip */}
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={selectedExpense.image}
                alt={selectedExpense.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E] via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedExpense(null)}
                className="tap absolute right-4 top-4 h-8 w-8 rounded-full bg-black/50 backdrop-blur ring-1 ring-white/20 flex items-center justify-center"
              >
                <X size={16} />
              </button>
              {selectedExpense.category && (
                <span className="absolute top-4 left-4 rounded-full bg-black/50 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 ring-1 ring-white/10">
                  {selectedExpense.category}
                </span>
              )}
            </div>

            {/* Sheet body */}
            <div className="glass-strong ring-1 ring-white/10 px-5 pt-5 pb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[20px] font-extrabold text-white">{selectedExpense.name}</p>
                  <p className="text-[12px] text-text-secondary mt-0.5">
                    {new Date(selectedExpense.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[26px] font-extrabold text-white leading-none">RM{selectedExpense.price}</p>
                  {selectedExpense.saved > 0 && (
                    <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-accent-mint/20 ring-1 ring-accent-mint/40 px-2.5 py-0.5">
                      <Sparkles size={10} className="text-accent-mint" />
                      <span className="text-[11px] font-bold text-accent-mint">Saved RM{selectedExpense.saved}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Stat row */}
              <div className="flex gap-2 mb-5">
                <div className="flex-1 rounded-2xl bg-white/5 ring-1 ring-white/8 p-3 text-center">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">You Paid</p>
                  <p className="text-[18px] font-bold text-white">RM{selectedExpense.price}</p>
                </div>
                <div className="flex-1 rounded-2xl bg-accent-mint/8 ring-1 ring-accent-mint/20 p-3 text-center">
                  <p className="text-[10px] text-accent-mint uppercase tracking-widest font-semibold">AI Saved</p>
                  <p className="text-[18px] font-bold text-white">RM{selectedExpense.saved}</p>
                </div>
                <div className="flex-1 rounded-2xl bg-white/5 ring-1 ring-white/8 p-3 text-center">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Saved</p>
                  <p className="text-[18px] font-bold text-white">
                    {selectedExpense.price > 0 ? Math.round((selectedExpense.saved / selectedExpense.price) * 100) : 0}%
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedExpense(null)}
                  className="tap flex-1 rounded-2xl bg-violet-grad py-3.5 text-[14px] font-bold text-white shadow-[0_8px_24px_rgba(124,58,237,0.45)] hover:brightness-110"
                >
                  Done
                </button>
                <button
                  onClick={() => { onOpenAnalysis?.(selectedExpense); setSelectedExpense(null); }}
                  className="tap flex-1 rounded-2xl bg-white/8 ring-1 ring-white/15 py-3.5 text-[14px] font-semibold text-white hover:bg-white/12"
                >
                  Re-analyse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav
        active="upload"
        onChange={(tab) => {
          if (tab === 'home') onBack?.();
          if (tab === 'upload') onSnapPhoto?.();
        }}
      />
    </div>
  );
}
