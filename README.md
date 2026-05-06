# GXBank · Dex Prototype

High-fidelity React prototype for the **GXBank "Youth Resilience"** hackathon entry. Features a dark purple→magenta theme, an AI assistant ("Dex"), automated savings pockets, and a behavioural-nudge overlay.

## Stack

- React 18 + Vite
- Tailwind CSS (custom GXBank theme tokens)
- lucide-react for stroke icons

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`). The app is rendered inside a 390×844 mobile frame for fidelity.

## Screens

- `src/screens/HomeScreen.jsx` — dashboard, balance, quick actions, accounts, streak, FAB, bottom nav
- `src/screens/DexChatScreen.jsx` — Dex chat with AI tone chips and interactive Trip Draft card
- `src/screens/GoalPlannerScreen.jsx` — circular progress ring + automation toggles
- `src/components/overlays/NudgeOverlay.jsx` — glassmorphism behavioural nudge

## Demo flow

1. Tap the glowing **Sparkles FAB** on Home → opens **Dex**.
2. Tap **Create Savings Pocket & Automate** in the trip card → opens **Goal Planner**.
3. Tap **Confirm & Start Saving** → returns home and triggers the **Nudge** overlay.
4. Use the **Nudge** chip top-left to manually trigger the overlay anytime.

## Theme

Tokens live in `tailwind.config.js`:

- `bg-app-gradient` — deep purple radial app background
- `bg-violet-grad` — primary CTA / accent gradient
- `shadow-glow` + `animate-pulseGlow` — Dex FAB glow
- `glass` utility — for the nudge modal
