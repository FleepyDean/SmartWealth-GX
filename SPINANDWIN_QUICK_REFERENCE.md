# 🎮 SpinAndWin - Quick Reference & Code Snippets

## Quick Component Usage

### 1️⃣ Using SpinAndWinScreen (Full Feature)

```jsx
import SpinAndWinScreen from './screens/SpinAndWinScreen.jsx';

// In your main App or router
<SpinAndWinScreen onBack={() => navigate('/home')} />
```

---

### 2️⃣ Using WeeklyTracker (Standalone)

```jsx
import WeeklyTracker from './components/spin/WeeklyTracker.jsx';

export default function MyScreen() {
  return (
    <WeeklyTracker 
      completedDays={5}
      totalDays={7}
      availableSpins={1}
    />
  );
}
```

**Default Props (optional):**
```jsx
<WeeklyTracker />  // Uses: completedDays=5, totalDays=7, availableSpins=1
```

---

### 3️⃣ Using SpinWheel (Standalone)

```jsx
import SpinWheel, { SEGMENTS } from './components/spin/SpinWheel.jsx';
import { useState } from 'react';

export default function SpinScreen() {
  const [spinsLeft, setSpinsLeft] = useState(1);
  const [result, setResult] = useState(null);

  const handleSpinResult = (prizeWon) => {
    console.log('Prize:', prizeWon);
    // prizeWon = { id, label, sub, icon, color, text, grand? }
    setSpinsLeft(prev => Math.max(0, prev - 1));
    setResult(prizeWon);
  };

  return (
    <SpinWheel 
      hasSpins={spinsLeft > 0}
      onResult={handleSpinResult}
    />
  );
}
```

---

### 4️⃣ Using RewardModal (Standalone)

```jsx
import RewardModal from './components/spin/RewardModal.jsx';
import { useState } from 'react';

export default function GameScreen() {
  const [showModal, setShowModal] = useState(false);
  const [prize, setPrize] = useState(null);

  const handleAddToPocket = () => {
    console.log('Adding prize:', prize);
    // Call your API to save the prize
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => {
        setPrize({ 
          id: 'cash5',
          label: 'RM5',
          sub: 'Cash',
          icon: Banknote,
          color: '#7C3AED',
          text: '#fff'
        });
        setShowModal(true);
      }}>
        Show Reward
      </button>

      <RewardModal
        open={showModal}
        prize={prize}
        onAddToPocket={handleAddToPocket}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
```

---

## 🔌 API Integration Examples

### Fetching User Weekly Progress

```javascript
async function fetchWeeklyProgress(userId) {
  const response = await fetch(`/api/users/${userId}/weekly-progress`);
  const data = await response.json();
  return {
    completedDays: data.saved_days_count,
    availableSpins: data.earned_spins,
    totalDays: 7
  };
}

// Usage
const [progress, setProgress] = useState(null);

useEffect(() => {
  fetchWeeklyProgress(userId).then(setProgress);
}, [userId]);

{progress && <WeeklyTracker {...progress} />}
```

### Claiming a Prize

```javascript
async function claimPrize(userId, prizeId) {
  const response = await fetch('/api/rewards/claim', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, prizeId })
  });
  return response.json();
}

// Usage in RewardModal handler
onAddToPocket={async () => {
  await claimPrize(userId, prize.id);
  showSuccessMessage('Prize added to your pocket!');
  setShowModal(false);
}}
```

### Recording Spin Event

```javascript
async function recordSpinEvent(userId, prizeWon) {
  const response = await fetch('/api/events/spin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      prizeId: prizeWon.id,
      timestamp: new Date().toISOString()
    })
  });
  return response.json();
}

// Usage
onResult={async (prizeWon) => {
  await recordSpinEvent(userId, prizeWon);
  setPrize(prizeWon);
  setShowRewardModal(true);
}}
```

---

## 🎨 Styling Customization

### Changing Reward Segments

Edit `src/components/spin/SpinWheel.jsx`:

```javascript
export const SEGMENTS = [
  { 
    id: 'bonus100',
    label: 'RM100',
    sub: 'Cash',
    icon: Banknote,
    color: '#10B981',  // Green instead of violet
    text: '#fff'
  },
  { 
    id: 'flight',
    label: 'Flight Ticket',
    sub: 'To Bali',
    icon: Plane,
    color: '#0EA5E9',  // Blue
    text: '#fff'
  },
  // ... more segments
];
```

### Customizing Colors

Via Tailwind classes (preferred):

```jsx
// In tailwind.config.js, extend colors:
colors: {
  'my-purple': '#8B5CF6',
  'my-gold': '#FBBF24'
}

// Then use:
<div className="bg-my-purple">...</div>
```

### Custom Confetti Colors

In `RewardModal.jsx`:

```javascript
const CONFETTI_COLORS = [
  '#FF6B6B',  // Red
  '#4ECDC4',  // Teal
  '#FFD93D',  // Yellow
  '#6BCB77',  // Green
  '#fff'
];
```

---

## 🔧 Advanced Configuration

### Adjusting Spin Duration

```javascript
// In SpinWheel.jsx, modify:

// Faster spin (3 seconds)
setTimeout(() => {
  setSpinning(false);
  onResult?.(winner);
}, 3000);  // Changed from 4200

// Update transition
transition: spinning
  ? 'transform 3s cubic-bezier(0.17, 0.67, 0.21, 1)'
  : 'none'
```

### Changing Spin Rotation Speed

```javascript
// More easing for dramatic effect
'cubic-bezier(0.1, 0.5, 0.2, 1.0)' // Slower start, faster end

// Smooth linear (no easing)
'cubic-bezier(0, 0, 1, 1)' // Linear

// Snappy bounce
'cubic-bezier(0.34, 1.56, 0.64, 1)' // Spring effect
```

### Dynamic Spin Count

```jsx
// Show spin availability in UI
const spinStatus = {
  0: 'No spins available. Save RM10 daily!',
  1: 'You have 1 spin. Use it wisely!',
  2: 'You have 2 spins!',
};

<p>{spinStatus[spinsAvailable] || `You have ${spinsAvailable} spins!`}</p>
```

---

## 📊 State Management Patterns

### Using Context for Global Spins

```jsx
import { createContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [spins, setSpins] = useState(0);
  const [history, setHistory] = useState([]);

  return (
    <GameContext.Provider value={{ spins, setSpins, history, setHistory }}>
      {children}
    </GameContext.Provider>
  );
}

// Usage in component
import { useContext } from 'react';

function SpinAndWinScreen() {
  const { spins, setSpins, history, setHistory } = useContext(GameContext);
  
  const handleResult = (winner) => {
    setSpins(prev => prev - 1);
    setHistory(prev => [winner, ...prev].slice(0, 5));
  };

  return (
    <SpinWheel onResult={handleResult} hasSpins={spins > 0} />
  );
}
```

### Using Redux for Complex State

```javascript
// actions.ts
export const spinWheel = (payload) => ({ 
  type: 'SPIN_WHEEL', 
  payload 
});

export const claimReward = (prizeId) => ({ 
  type: 'CLAIM_REWARD', 
  payload: prizeId 
});

// reducer.ts
const initialState = {
  spins: 1,
  history: [],
  loading: false
};

export function gameReducer(state = initialState, action) {
  switch(action.type) {
    case 'SPIN_WHEEL':
      return {
        ...state,
        history: [action.payload, ...state.history].slice(0, 5),
        spins: state.spins - 1
      };
    case 'CLAIM_REWARD':
      return { ...state, loading: true };
    default:
      return state;
  }
}
```

---

## 🎯 Common Tasks

### Task: Update UI After Spin

```jsx
function SpinAndWinScreen() {
  const [prize, setPrize] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSpinResult = (winner) => {
    setPrize(winner);
    setShowModal(true);
    
    // Auto-hide after 5 seconds
    setTimeout(() => setShowModal(false), 5000);
  };

  return (
    <>
      <SpinWheel onResult={handleSpinResult} />
      <RewardModal
        open={showModal}
        prize={prize}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
```

### Task: Disable Spin After Claiming

```jsx
const [claimed, setClaimed] = useState(false);

const handleClaim = async () => {
  await claimPrize(prize.id);
  setClaimed(true);
  setTimeout(() => {
    setShowModal(false);
    setClaimed(false);
  }, 2000);
};

<RewardModal
  onAddToPocket={handleClaim}
  prize={prize}
  open={showModal}
/>
```

### Task: Show Weekly Streak Notification

```jsx
useEffect(() => {
  if (completedDays === 7) {
    showNotification({
      title: '🎉 Perfect Week!',
      message: 'You\'ve earned 1 bonus spin!',
      duration: 3000
    });
  }
}, [completedDays]);
```

### Task: Track Game Analytics

```jsx
const trackSpinEvent = (prize) => {
  analytics.track('spin_completed', {
    prize_id: prize.id,
    prize_value: prize.label,
    timestamp: new Date(),
    user_id: currentUser.id
  });
};

<SpinWheel onResult={handleResult} />
```

---

## 🐛 Troubleshooting

### Wheel Not Spinning
- Check: `hasSpins > 0` prop is true
- Check: Component is not in `spinning` state already
- Check: `onResult` callback is provided

### Modal Not Showing
- Verify: `open` prop is `true`
- Verify: `prize` prop is not null
- Check: CSS z-index conflicts

### Confetti Not Appearing
- Check: `open={true}` and `!isTryAgain`
- Verify: Styles are loaded correctly
- Clear: Browser cache

### Performance Issues
- Reduce confetti pieces: `Array.from({ length: 14 })` (from 28)
- Disable blur effects: Remove `backdrop-blur-[3px]`
- Optimize images: Use WebP for icons

---

## 📦 Dependencies

All components use only these dependencies:
- `react` (hooks)
- `lucide-react` (icons)
- `tailwindcss` (styling)

No additional packages required! ✨

---

## 🎓 Learning Resources

**Understanding SVG Wheel:**
- Sector paths use polar coordinates
- Rotation angle = (360 / segments) × index
- Pointer at top = 0° / 360°

**CSS Animations:**
- `cubic-bezier()` for custom easing
- `@keyframes` for confetti fall
- `backdrop-filter` for glass morphism

**React Patterns:**
- State hooks for UI state
- Callback props for parent communication
- Conditional rendering for states

---

## ✅ Checklist for Implementation

- [ ] Install dependencies (if not already done)
- [ ] Add SpinAndWinScreen import to App.jsx
- [ ] Add routing condition for 'spin' screen
- [ ] Add navigation button or menu item
- [ ] Connect to backend APIs (optional)
- [ ] Test wheel animation
- [ ] Test prize modal display
- [ ] Test responsive on mobile devices
- [ ] Set up analytics tracking
- [ ] Configure reward values

---

**Happy spinning! 🎡**
