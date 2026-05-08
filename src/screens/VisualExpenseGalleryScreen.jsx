import React, { useState } from 'react';
import { ChevronLeft, Plus, Sparkles, X } from 'lucide-react';
import BottomNav from '../components/ui/BottomNav.jsx';

// Sample expense data
export const SAMPLE_EXPENSES = [
  { id: 1, emoji: '🍜', name: 'Nasi Goreng', price: 20, saved: 12, date: '2024-10-15' },
  { id: 2, emoji: '☕', name: 'Coffee', price: 8, saved: 2, date: '2024-10-14' },
  { id: 3, emoji: '🍕', name: 'Pizza', price: 35, saved: 5, date: '2024-10-13' },
  { id: 4, emoji: '🥗', name: 'Salad', price: 18, saved: 3, date: '2024-10-12' },
  { id: 5, emoji: '🍔', name: 'Burger', price: 15, saved: 4, date: '2024-10-11' },
  { id: 6, emoji: '🍱', name: 'Bento Box', price: 25, saved: 8, date: '2024-10-10' },
];

export default function VisualExpenseGalleryScreen({ onBack, onSnapPhoto, onOpenAnalysis, expenses = SAMPLE_EXPENSES }) {
  const [selectedExpense, setSelectedExpense] = useState(null);

  const totalLogged = expenses.reduce((sum, e) => sum + e.price, 0);
  const totalSaved = expenses.reduce((sum, e) => sum + e.saved, 0);
  const isEmpty = expenses.length === 0;

  return (
    <div className="relative h-full w-full text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-app-gradient" />

      <div className="relative h-full w-full overflow-y-auto pb-24 no-scrollbar">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-app-gradient/95 backdrop-blur px-5 pt-4 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/15 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <p className="text-[16px] font-semibold">October Food Diary</p>
            <button
              onClick={onSnapPhoto}
              className="h-9 w-9 rounded-full bg-violet-grad ring-1 ring-white/15 flex items-center justify-center hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(124,58,237,0.4)]"
            >
              <Plus size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
            {/* Total Logged */}
            <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-3">
              <p className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold mb-0.5">
                Total Logged
              </p>
              <p className="text-[18px] font-bold text-white">RM{totalLogged.toFixed(2)}</p>
            </div>

            {/* AI Savings */}
            <div className="rounded-2xl bg-gradient-to-br from-accent-mint/20 to-emerald-500/20 ring-1 ring-accent-mint/40 p-3">
              <p className="text-[10px] text-accent-mint uppercase tracking-wider font-semibold mb-0.5">
                AI Savings Found
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-[18px] font-bold text-white">RM{totalSaved.toFixed(2)}</p>
                <Sparkles size={14} className="text-accent-mint" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
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
                className="inline-flex items-center gap-2 rounded-2xl bg-violet-grad px-6 py-3 text-[14px] font-bold text-white shadow-[0_8px_28px_rgba(124,58,237,0.55)] hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Plus size={18} strokeWidth={2.5} />
                Snap Your First Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="px-3.5 py-5">
            <div className="grid grid-cols-2 gap-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedExpense(expense)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedExpense(expense); }}
                  className="group relative aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 cursor-pointer"
                >
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet/30 via-magenta/20 to-bg-800 flex items-center justify-center group-hover:brightness-110 transition-all overflow-hidden">
                    {expense.image ? (
                      <img
                        src={expense.image}
                        alt={expense.name}
                        className="h-full w-full object-cover opacity-90"
                      />
                    ) : (
                      <p className="text-[48px]">{expense.emoji}</p>
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Bottom Info Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-black/70 ring-1 ring-white/20 px-2.5 py-1.5 backdrop-blur">
                      <span className="text-[14px] font-bold text-white">RM{expense.price}</span>
                      <span className="text-[12px]">{expense.emoji}</span>
                    </div>
                    {expense.saved > 0 && (
                      <div className="ml-auto inline-flex items-center gap-1 rounded-full bg-accent-mint/20 ring-1 ring-accent-mint/50 px-2 py-1 backdrop-blur">
                        <Sparkles size={12} className="text-accent-mint" strokeWidth={2.5} />
                        <span className="text-[10px] font-bold text-accent-mint">Save RM{expense.saved}</span>
                      </div>
                    )}
                  </div>

                  {/* Item Name (Hidden, shows on hover) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-[13px] font-semibold text-white">{expense.name}</p>
                      <p className="text-[11px] text-text-secondary mt-1">
                        {new Date(expense.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Section */}
            <div className="mt-8 text-center">
              <p className="text-[12px] text-text-secondary">
                Showing {expenses.length} expenses from October
              </p>
              <button className="mt-4 rounded-2xl bg-white/10 ring-1 ring-white/20 px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-white/15 transition-all">
                Load More
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Expense Detail Modal */}
      {selectedExpense && (
        <div className="absolute inset-0 z-40 flex items-end justify-center">
          <div
            onClick={() => setSelectedExpense(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
          />

          <div className="relative w-full max-h-[80vh] overflow-y-auto no-scrollbar animate-floatUp px-5 pb-6">
            <div className="glass card-hi rounded-t-3xl p-5 ring-1 ring-white/15">
              <button
                onClick={() => setSelectedExpense(null)}
                className="absolute right-4 top-4 z-10 h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="text-white pt-2">
                <div className="w-full flex items-center justify-center mb-4">
                  {selectedExpense.image ? (
                    <div className="w-full max-w-[240px] overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                      <img
                        src={selectedExpense.image}
                        alt={selectedExpense.name}
                        className="h-40 w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-violet/20 to-magenta/20 flex items-center justify-center text-[56px]">
                      {selectedExpense.emoji}
                    </div>
                  )}
                </div>

                <div className="text-center mb-4">
                  <p className="text-[18px] font-bold">{selectedExpense.name}</p>
                  <p className="text-[12px] text-text-secondary">{new Date(selectedExpense.date).toLocaleDateString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold mb-1">Price</p>
                    <p className="text-[20px] font-bold">RM{selectedExpense.price}</p>
                  </div>
                  <div className="rounded-2xl bg-accent-mint/10 p-4">
                    <p className="text-[11px] text-accent-mint uppercase tracking-wider font-semibold mb-1">Saved</p>
                    <p className="text-[20px] font-bold text-white">RM{selectedExpense.saved}</p>
                    <p className="text-[12px] text-accent-mint mt-1">
                      {selectedExpense.price > 0 ? Math.round((selectedExpense.saved / selectedExpense.price) * 100) : 0}% saved
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-[13px] text-text-secondary leading-relaxed">
                    This is the AI-estimated saving for this item - the gap between what you paid and the suggested price. Use "Log Expense & Update Budget" in the analysis overlay to add confirmed items to your gallery.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedExpense(null)}
                    className="flex-1 rounded-2xl bg-violet-grad py-3 text-[14px] font-bold text-white"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onOpenAnalysis?.(selectedExpense);
                      setSelectedExpense(null);
                    }}
                    className="flex-1 rounded-2xl bg-transparent ring-1 ring-white/20 py-3 text-[14px] font-semibold text-white"
                  >
                    Edit
                  </button>
                </div>
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
