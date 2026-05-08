# 🏗️ SpinAndWin Architecture & Component Hierarchy

## 📁 File Structure

```
src/
├── App.jsx (UPDATED - integrated SpinAndWinScreen)
├── screens/
│   └── SpinAndWinScreen.jsx ⭐ (Main feature screen)
├── components/
│   └── spin/
│       ├── WeeklyTracker.jsx ⭐ (Weekly progress tracker)
│       ├── SpinWheel.jsx ⭐ (Interactive wheel)
│       └── RewardModal.jsx ⭐ (Prize celebration)
└── [other existing components...]
```

---

## 🔗 Component Hierarchy Tree

```
App (Router)
│
├── State: screen, nudgeOpen
│
└── {screen === 'spin' && (
    ┌──────────────────────────────────────────────────────┐
    │ SpinAndWinScreen                                     │
    │ ┌────────────────────────────────────────────────┐  │
    │ │ State: spins, prize, history                   │  │
    │ │                                                │  │
    │ │ ┌──────────────────────────────────────────┐  │  │
    │ │ │ Header (back btn, title, info btn)      │  │  │
    │ │ └──────────────────────────────────────────┘  │  │
    │ │                                                │  │
    │ │ ┌──────────────────────────────────────────┐  │  │
    │ │ │ WeeklyTracker                            │  │  │
    │ │ │ ├─ Weekly Savings Challenge Title        │  │  │
    │ │ │ ├─ 7-Day Progress Nodes                  │  │  │
    │ │ │ ├─ Available Spins Badge                 │  │  │
    │ │ │ └─ Motivational Message                  │  │  │
    │ │ └──────────────────────────────────────────┘  │  │
    │ │                                                │  │
    │ │ ┌──────────────────────────────────────────┐  │  │
    │ │ │ SpinWheel                                │  │  │
    │ │ │ ├─ Outer Glow Ring                      │  │  │
    │ │ │ ├─ Pointer                              │  │  │
    │ │ │ ├─ Wheel Container                      │  │  │
    │ │ │ │  ├─ SVG Wheel                         │  │  │
    │ │ │ │  │  ├─ 8 Radial Gradients (defs)    │  │  │
    │ │ │ │  │  ├─ 8 Sector Paths                │  │  │
    │ │ │ │  │  ├─ 8 Icon Labels (foreignObj)   │  │  │
    │ │ │ │  │  └─ 8 Inner Studs                 │  │  │
    │ │ │ │  └─ Center Spin Button               │  │  │
    │ │ │ └─ Bottom CTA Button                   │  │  │
    │ │ └──────────────────────────────────────────┘  │  │
    │ │                                                │  │
    │ │ ┌──────────────────────────────────────────┐  │  │
    │ │ │ RewardModal (conditionally rendered)    │  │  │
    │ │ │ ├─ Backdrop (dark + blur)               │  │  │
    │ │ │ ├─ Modal Container (glass)              │  │  │
    │ │ │ │  ├─ Celebration Glow (conditional)   │  │  │
    │ │ │ │  ├─ Confetti (conditional)           │  │  │
    │ │ │ │  ├─ Close Button (X)                 │  │  │
    │ │ │ │  ├─ Prize Medallion                  │  │  │
    │ │ │ │  │  ├─ Glow Background               │  │  │
    │ │ │ │  │  ├─ Icon                          │  │  │
    │ │ │ │  │  └─ Pulsing Animation             │  │  │
    │ │ │ │  ├─ Status Badge                     │  │  │
    │ │ │ │  ├─ Headline                         │  │  │
    │ │ │ │  ├─ Supporting Text                  │  │  │
    │ │ │ │  └─ Action Buttons                   │  │  │
    │ │ │ │     ├─ "Add to Saving Pocket" (main) │  │  │
    │ │ │ │     └─ "Close" (secondary)          │  │  │
    │ │ │ └─ Exit conditions                     │  │  │
    │ │ │    └─ Renders null if !open or !prize  │  │  │
    │ │ └──────────────────────────────────────────┘  │  │
    │ │                                                │  │
    │ │ ┌──────────────────────────────────────────┐  │  │
    │ │ │ Recent Wins Section                      │  │  │
    │ │ │ ├─ Title                                 │  │  │
    │ │ │ ├─ Empty State (if no wins)             │  │  │
    │ │ │ └─ Win History List (max 5 items)       │  │  │
    │ │ │    └─ Win Item × N                      │  │  │
    │ │ │       ├─ Icon                           │  │  │
    │ │ │       ├─ Prize Name + Sub               │  │  │
    │ │ │       ├─ Timestamp                      │  │  │
    │ │ │       └─ Claimed Badge                  │  │  │
    │ │ └──────────────────────────────────────────┘  │  │
    │ │                                                │  │
    │ │ ┌──────────────────────────────────────────┐  │  │
    │ │ │ Footer Fine Print                        │  │  │
    │ │ └──────────────────────────────────────────┘  │  │
    │ │                                                │  │
    │ │ Ambient Effects:                             │  │
    │ │ ├─ Top-left violet glow                      │  │
    │ │ └─ Bottom-right pink glow                    │  │
    │ └────────────────────────────────────────────┘  │
    └──────────────────────────────────────────────────┘
)}
```

---

## 🔄 Data Flow Diagram

```
User Action
    │
    ├─ Clicks "SPIN NOW"
    │        │
    │        ├─ Trigger: handleSpin()
    │        │        │
    │        │        ├─ Validate: spinning=false, hasSpins=true
    │        │        │
    │        │        ├─ Start animation: 4.1s easing
    │        │        │
    │        │        ├─ Random winner: Math.random() * 8
    │        │        │
    │        │        ├─ Calculate rotation: 6 turns + offset
    │        │        │
    │        │        └─ Update state: setRotation()
    │        │
    │        └─ After 4.1s:
    │               │
    │               ├─ setSpinning(false)
    │               │
    │               └─ onResult?(winner) ──────────────┐
    │                                                  │
    └─ Receives Prize ◄───────────────────────────────┘
    │        │
    │        ├─ Update: setPrize(winner)
    │        ├─ Update: setSpins(s => s - 1)
    │        ├─ Update: setHistory([winner, ...])
    │        │
    │        └─ RewardModal auto-opens (open={prize !== null})
    │               │
    │               ├─ Display prize info
    │               ├─ Show confetti (if not try-again)
    │               │
    │               └─ User Action:
    │                  ├─ "Add to Saving Pocket"
    │                  │        │
    │                  │        └─ onAddToPocket() [callback]
    │                  │
    │                  └─ "Close"
    │                           │
    │                           └─ onClose() [callback]
    │                                  │
    │                                  └─ setPrize(null)
    │                                         │
    │                                         └─ Modal closes
    │
    └─ Ready for next spin ✨
```

---

## 📊 State Management Detail

### SpinAndWinScreen State

```javascript
{
  spins: number,           // Number of remaining spins (0, 1, 2, ...)
  prize: Object|null,      // Current prize being displayed
  history: Array[prize]    // Last 5 prizes won
}
```

### SpinWheel State

```javascript
{
  rotation: number,        // Current SVG rotation in degrees
  spinning: boolean        // Animation in progress
}
```

### RewardModal State (via props)

```javascript
{
  open: boolean,           // Display modal
  prize: Object,           // Prize object { id, label, sub, icon, ... }
  onAddToPocket: Function, // Called when user claims prize
  onClose: Function        // Called when user closes modal
}
```

---

## 🎯 Props Interface

### WeeklyTracker Props

```typescript
interface WeeklyTrackerProps {
  completed?: number;      // Days completed (0-7)
  spins?: number;         // Available spins
}
```

### SpinWheel Props

```typescript
interface SpinWheelProps {
  onResult?: (winner: Segment) => void;  // Prize callback
  hasSpins?: boolean;                    // Enable/disable
}

interface Segment {
  id: string;             // Unique identifier
  label: string;          // Main text ("RM5")
  sub: string;            // Subtitle ("Cash")
  icon: IconComponent;    // Lucide icon
  color: string;          // Hex color
  text: string;           // Text color
  grand?: boolean;        // Grand prize flag
}
```

### RewardModal Props

```typescript
interface RewardModalProps {
  open: boolean;
  prize: Segment | null;
  onAddToPocket: () => void;
  onClose: () => void;
}
```

### SpinAndWinScreen Props

```typescript
interface SpinAndWinScreenProps {
  onBack: () => void;      // Navigate back callback
}
```

---

## 🎨 CSS Classes Breakdown

### Tailwind Classes Used

#### Layout & Spacing
- `px-5` - Horizontal padding
- `pt-12`, `pb-3`, `mt-3`, `mt-5`, `mt-6`, `mt-7` - Vertical spacing
- `flex`, `flex-col`, `gap-2` - Flexbox layout
- `w-full`, `h-full` - Full dimensions
- `absolute`, `relative` - Positioning
- `inset-0` - Fills entire container

#### Colors & Backgrounds
- `bg-white/10`, `bg-white/5` - Semi-transparent white
- `bg-violet-grad` - Primary button gradient
- `bg-gradient-to-br` - Linear gradients
- `bg-card`, `bg-card-soft` - Card backgrounds
- `ring-1 ring-white/15` - Border ring

#### Typography
- `text-white` - Primary text
- `text-text-secondary` - Secondary text
- `text-[14px]`, `text-[22px]` - Font sizes
- `font-bold`, `font-semibold` - Font weights
- `uppercase`, `tracking-wide` - Text transform & letter spacing

#### Interactivity
- `hover:bg-white/15` - Hover effect
- `active:scale-95` - Click feedback
- `disabled:opacity-70` - Disabled state
- `cursor-not-allowed` - Disabled cursor

#### Effects & Animations
- `shadow-[...]` - Custom shadows
- `blur-3xl` - Blur effect
- `animate-pulseGlow` - Custom animation
- `animate-floatUp` - Entrance animation
- `rounded-3xl`, `rounded-full` - Border radius

#### Utilities
- `pointer-events-none` - No interaction
- `overflow-hidden` - Clip content
- `no-scrollbar` - Hide scrollbar
- `z-50` - Stacking context
- `ring-white/15` - Border definition

---

## 🔌 Hook Usage

### Built-in Hooks Used

```javascript
// useState - Component state
const [rotation, setRotation] = useState(0);
const [spinning, setSpinning] = useState(false);

// useMemo - Optimize wheel paths calculation
const paths = useMemo(
  () => SEGMENTS.map((seg, i) => ({ ...seg, d: sectorPath(...) })),
  [r]
);

// useEffect - Not used directly, but can be added for:
// - Fetching weekly progress on mount
// - Resetting state on screen change
// - Tracking analytics events
```

---

## 🎬 Animation Details

### Spin Animation

```css
/* SVG Transform */
transform: rotate(${rotation}deg);
transition: transform 4.1s cubic-bezier(0.17, 0.67, 0.21, 1);

/* Easing: Gradual start, faster end (deceleration) */
cubic-bezier(0.17, 0.67, 0.21, 1) 
/* Values: 0→0.67→1 creates smooth deceleration curve */
```

### Confetti Animation

```css
@keyframes confettiFall {
  0% { 
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% { 
    opacity: 1;
  }
  100% { 
    transform: translateY(520px) rotate(720deg);
    opacity: 0;
  }
}

/* Applied: duration 1.4-2.8s, delay 0-0.6s */
```

### Modal Entrance

```css
@keyframes floatUp {
  0% { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0);
  }
}

/* Duration: 0.35s, easing: ease-out */
```

### Pulse Glow

```css
@keyframes pulseGlow {
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(159,91,255,0.55);
  }
  50% { 
    box-shadow: 0 0 30px 8px rgba(159,91,255,0.55);
  }
}

/* Duration: 2.4s, infinite */
```

---

## 🔐 Type Safety (TypeScript Equivalent)

```typescript
// Segment Type
type Segment = {
  id: string;
  label: string;
  sub: string;
  icon: React.ComponentType<LucideProps>;
  color: string;
  text: string;
  grand?: boolean;
};

// Prize with timestamp
type PrizeRecord = Segment & {
  claimedAt: Date;
  status: 'pending' | 'claimed' | 'failed';
};

// Weekly Progress
type WeeklyProgress = {
  completedDays: number;
  availableSpins: number;
  totalDays: number;
  consecutiveDays: number;
};

// Spin Result
type SpinResult = {
  segmentIndex: number;
  prize: Segment;
  rotation: number;
  timestamp: Date;
};
```

---

## 📈 Performance Considerations

### Optimization Techniques

1. **SVG Paths - Pre-calculated**
   - `useMemo` caches sector paths
   - No recalculation on every render

2. **CSS Animations - GPU Accelerated**
   - `transform: rotate()` uses GPU
   - `box-shadow` animated smoothly
   - No layout thrashing

3. **Images - SVG Icons**
   - Vector graphics scale infinitely
   - Lucide React optimized bundle

4. **Rendering - Conditional**
   - `RewardModal` renders only when `open={true}`
   - Confetti only renders for wins

### Performance Metrics (Target)

- **FCP (First Contentful Paint):** < 1.5s
- **LCP (Largest Contentful Paint):** < 2.5s
- **Spin Animation:** 60 FPS
- **Modal Entrance:** 60 FPS

---

## 🔄 Event Flow Sequence Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
                 [Click "SPIN NOW" Button]
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
          [Center Hub]     [Bottom CTA]
                  │                 │
                  └────────┬────────┘
                           ▼
              handleSpin() Function Called
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    [Check spinning]  [Check hasSpins]  [Prevent double-spin]
           │               │               │
           └───────────────┴───────────────┘
                           │
                  All checks PASS ✓
                           │
                           ▼
                   setSpinning(true)
                           │
                           ▼
              Calculate Random Winner
                   (Math.random() * 8)
                           │
                           ▼
            Calculate Target Rotation
         (360 * 6 + (360 - midpoint))
                           │
                           ▼
         Start 4.1s Animation (SVG)
              (setRotation(target))
         cubic-bezier(0.17, 0.67, 0.21, 1)
                           │
                           ▼
                    [4.1s delay]
                           │
                           ▼
                 setTimeout(() => { ... }, 4200)
                           │
             ┌─────────────┴──────────────┐
             ▼                            ▼
      setSpinning(false)       onResult?.(winner)
             │                            │
             └─────────────┬──────────────┘
                           ▼
         [Data flows up to SpinAndWinScreen]
                           │
      ┌────────────────────┼────────────────────┐
      ▼                    ▼                    ▼
  setPrize()         setSpins(-1)         addToHistory()
      │                    │                    │
      └────────────────────┼────────────────────┘
                           ▼
          [RewardModal receives new props]
                           │
              open={prize !== null} = true
                           │
                           ▼
              <RewardModal open={true} prize={...} />
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
    [Render Modal]                  [Play Confetti]
            │                             │
      ┌─────┴─────┐                 └─────┐
      ▼           ▼                       ▼
  [Display]  [Animation]        [28 pieces falling]
  Prize         float-up
  Details       (0.35s)         [1.4-2.8s duration]
      │           │                       │
      └─────┬─────┴───────────────────────┘
            ▼
    [User sees result!]
            │
       ┌────┴────┐
       ▼         ▼
   [Add to]   [Close]
   [Pocket]   [Modal]
       │         │
       │         └─────────┐
       └────────────┬──────┘
                    ▼
            Modal closes
            (setPrize(null))
                    │
                    ▼
       [Ready for next spin!] 🎯
```

---

## 🛠️ Common Integration Points

### With Backend API

```javascript
// 1. Fetch initial data on mount
useEffect(() => {
  const fetchData = async () => {
    const progress = await api.get('/weekly-progress');
    const history = await api.get('/spin-history');
    setWeeklyData(progress);
    setSpinHistory(history);
  };
  fetchData();
}, [userId]);

// 2. Record spin event
const handleSpinResult = async (prize) => {
  await api.post('/spin-event', { prizeId: prize.id });
  setPrize(prize);
};

// 3. Claim prize
const handleClaimPrize = async () => {
  const result = await api.post('/claim-prize', { prizeId: prize.id });
  if (result.success) {
    showSuccess('Prize claimed!');
  }
};
```

### With Analytics

```javascript
// Track engagement
analytics.track('spin_screen_viewed');
analytics.track('spin_completed', { prize: prize.id });
analytics.track('prize_claimed', { value: prize.label });
```

### With Notifications

```javascript
// Notify user of prize
notifications.show({
  type: 'success',
  title: 'Prize Won!',
  message: `You won ${prize.label}!`,
  action: 'View Details'
});
```

---

## ✨ Summary

This gamification feature is built with:
- **4 main React components** (~555 LOC)
- **Pure Tailwind CSS** styling
- **SVG wheel** for interactive graphics
- **Smooth animations** (4.1s spin, confetti, modal entrance)
- **Complete state management** 
- **Mobile-first responsive design**
- **Dark theme** matching GXBank identity
- **Zero external dependencies** (except React + Lucide)

**Ready to integrate with your backend! 🚀**
