# SmartWealth GX — GXBank Prototype

A high-fidelity mobile app prototype built for the **GXBank "Youth Resilience"** hackathon. Designed to look and feel like a real production app — dark purple/magenta glassmorphism theme, AI financial assistant ("Dex"), dynamic saving pockets, gamified saving streaks, and intelligent budget nudges.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS (custom GXBank design tokens) |
| Icons | lucide-react |
| State | React hooks (`useState`, `useEffect`, `useRef`) |
| Fonts | System sans-serif (Inter-style) |

---

## Getting Started

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).  
The app renders inside a **390 × 844 px** iPhone-style phone frame for full fidelity.

---

## Screens

### `SplashScreen.jsx`
Branded loading screen shown on first launch.
- GXBank logo with violet glow drop-shadow
- Animated scale-in entrance, pulsing gradient dots
- 3-second total duration, smooth fade-out exit

### `HomeScreen.jsx`
Main dashboard.
- Live **Total Balance** (main account + all saving pockets combined)
- Safe-to-spend bar, quick actions (Add / Send)
- **Account section** — Main account + Saving Pockets card with live totals
- Recent transactions list
- Spin & Win teaser card, Tomorrow Budget teaser card
- AI weekly spending insights panel
- Dex FAB (floating action button), bottom navigation

### `DexChatScreen.jsx`
AI financial assistant chat interface.
- Message bubbles with typing indicator
- Intent detection for common finance queries
- AI tone selector chips (Friendly / Formal / Motivate)
- **Trip Draft Card** — interactive trip savings proposal
- **Tomorrow Preview Card** — tomorrow's predicted budget summary
- **Lifestyle Recs Card** — personalised spending recommendations

### `GoalPlannerScreen.jsx`
New savings pocket creation flow.
- Circular animated progress ring (ProgressRing component)
- Goal name, target amount, timeline inputs
- **Round-up Daily Spends** toggle (default: **OFF**)
- **Smart Salary Deduction** toggle (default: OFF)
- Confirm passes both toggle states up to `App.jsx`

### `SavingPocketsScreen.jsx`
Full saving pockets management screen.
- Summary banner — live total across all pockets
- Three pockets: **Apple Watch 12**, **RTX 5080**, **Langkawi Trip**
- Each card shows saved amount, progress bar, %, ETA, streak, auto-save chip
- Pocket detail view with hero balance, progress, stats, automated savings toggles, activity log
- **Add Money** — numpad bottom sheet with quick-select amounts (RM10 / 30 / 50 / 100)
- **Success modal** — confetti animation, daily goal badge (RM30 target), 1 free spin reward notification
- All balances and activity are shared state (lifted to `App.jsx`) — persists across navigation

### `SpinAndWinScreen.jsx`
Gamified savings reward screen.
- Interactive spin wheel with prize segments
- Weekly savings challenge tracker (7-day progress)
- Win history / recent prizes log
- Earn spins by saving RM30+ daily

### `TomorrowBudgetScreen.jsx`
Predictive budget screen.
- AI-predicted spend for tomorrow
- Category breakdown with recommendations
- Adjustable budget sliders

### `SnapAndLogScreen.jsx`
Receipt/expense capture screen.
- Camera-style capture interface
- AI expense analysis overlay (`DexAnalysisOverlay`)
- Parsed receipt data with category tagging

### `VisualExpenseGalleryScreen.jsx`
Visual expense history gallery.
- Masonry-style image grid of logged expenses
- Category filters, total savings counter
- Links to snap/log flow

---

## Component Map

```
src/components/
├── dex/
│   ├── ChatBubble.jsx          — individual message bubble
│   ├── TypingIndicator.jsx     — animated three-dot indicator
│   ├── TripDraftCard.jsx       — Langkawi trip savings proposal card
│   ├── TomorrowPreviewCard.jsx — tomorrow budget preview card
│   └── LifestyleRecsCard.jsx   — AI lifestyle recommendations card
├── home/
│   ├── HeaderBar.jsx           — greeting, live balance, eye toggle
│   ├── SafeToSpendBar.jsx      — daily safe-to-spend progress bar
│   ├── AccountSection.jsx      — main account + saving pockets cards (live totals)
│   ├── QuickActions.jsx        — Add Money / Send Money buttons
│   ├── TransactionList.jsx     — recent activity feed
│   ├── SpinAndWinTeaserCard.jsx — spin streak teaser
│   └── StreakCard.jsx          — saving streak display
├── overlays/
│   ├── NudgeOverlay.jsx        — glassmorphism behavioural nudge popup
│   └── DexAnalysisOverlay.jsx  — AI receipt analysis overlay
├── planner/
│   ├── AutoToggle.jsx          — animated on/off toggle switch
│   └── ProgressRing.jsx        — circular SVG progress ring
├── spin/
│   ├── SpinWheel.jsx           — interactive prize wheel
│   ├── RewardModal.jsx         — win celebration modal
│   └── WeeklyTracker.jsx       — 7-day savings challenge tracker
├── tomorrow/
│   └── TomorrowTeaserCard.jsx  — tomorrow budget teaser for home screen
└── ui/
    ├── PhoneFrame.jsx          — 390×844 device chrome wrapper
    ├── BottomNav.jsx           — Home / Upload / Me navigation bar
    └── DexFab.jsx              — glowing Dex AI floating action button
```

---

## Shared State (App.jsx)

All cross-screen data is lifted to `App.jsx`:

| State | Type | Purpose |
|---|---|---|
| `screen` | string | Active screen router |
| `langkawiAuto` | `{roundUp, salary}` | Auto-save settings from GoalPlanner → SavingPockets |
| `pocketSavings` | `{id: number}` | Live saved amount per pocket — updates all screens |
| `pocketActivity` | `{id: array}` | Transaction log per pocket — persists across navigation |
| `galleryExpenses` | array | Confirmed snapped expenses |

---

## Key Demo Flow

1. **Splash** — 3-second branded loading screen on launch
2. **Home** — see live balance, saving pockets total, streak, spending insights
3. **Dex FAB** → chat with AI, view trip draft card → **Create Savings Pocket**
4. **Goal Planner** — configure Langkawi Trip, toggle Round-up / Salary Deduction, **Confirm**
5. **Home** — nudge overlay appears; Saving Pockets card balance updates
6. **Saving Pockets** — see all 3 pockets; open Langkawi Trip → **Add Money**
7. **Numpad sheet** — enter amount, confirm → success modal with confetti + spin reward if RM30+ met
8. **Home** — Total Balance and Saving Pockets card reflect the addition instantly
9. **Spin & Win** — redeem earned spin, win rewards

---

## Design Tokens (`tailwind.config.js`)

| Token | Use |
|---|---|
| `bg-app-gradient` | Deep purple radial app background |
| `bg-violet-grad` | Primary CTA / accent buttons gradient |
| `text-violet-glow` | Accent purple highlight text |
| `text-accent-mint` | Positive amounts / success states |
| `text-accent-pink` | Secondary accent, Saving Pockets |
| `shadow-glow` | Dex FAB outer glow |
| `animate-pulseGlow` | Pulsing ring on Dex FAB |
| `card-premium` | Glassmorphism card base style |

---

## Logo

Place `gxbank-logo.png` (or `.svg`) in the `/public` folder.  
The splash screen references it at `/gxbank-logo.png` — update `src/screens/SplashScreen.jsx` line 34 if the filename differs.
