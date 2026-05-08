# 🎮 SpinAndWin Gamification Feature - Complete Guide

## Overview

A fully-implemented gamification feature that encourages daily saving habits through an interactive spinning wheel game. Users earn spins by maintaining a RM10+ daily savings streak and can win various rewards.

---

## 📁 Component Architecture

### **1. SpinAndWinScreen.jsx** (Main Container)
**Location:** `src/screens/SpinAndWinScreen.jsx`

The primary screen that orchestrates the entire gamification experience.

**Key Features:**
- Screen navigation with back button
- Ambient glow effects for visual depth
- State management for spins, prizes, and win history
- Beautiful header with Trophy icon and Info button
- Responsive layout with overflow scrolling

**Props:**
- `onBack` - Callback to navigate back to home screen

**State:**
```javascript
const [spins, setSpins] = useState(1);        // Number of available spins
const [prize, setPrize] = useState(null);     // Current prize being displayed
const [history, setHistory] = useState([]);   // Last 5 won prizes
```

---

### **2. WeeklyTracker.jsx** (Progress Visualization)
**Location:** `src/components/spin/WeeklyTracker.jsx`

Displays the weekly savings challenge progress and available spins.

**Component Breakdown:**

#### **2.1 Header Section**
- Bold title: "Weekly Savings Challenge"
- Motivational subtext with completed days counter
- Example: "Save RM10 daily to earn a spin! (5/7 Days completed)"

#### **2.2 Progress Tracker**
- 7 circular nodes representing each day of the week
- Completed days show:
  - Gradient background (violet-glow to magenta)
  - Glowing effect shadow
  - Check icon
- Incomplete days show:
  - Subtle white/10 background
  - Empty state

#### **2.3 Available Spins Badge**
- Prominent glassmorphism card with gradient background
- Star icon with animated pulse
- Displays: "Spin Tickets Earned: X Spins Available"
- Visual glow effect for attention

#### **2.4 Motivational Message**
- Conditional messaging:
  - Perfect week (7/7): "🎉 Perfect week! Spin to claim your bonus!"
  - Partial completion: "N more days to earn your next spin"

**Props:**
```javascript
{
  completedDays: 5,      // Number of days completed (0-7)
  totalDays: 7,          // Total days in week
  availableSpins: 1      // Number of earned spins
}
```

**Default Values:**
```javascript
completedDays = 5
totalDays = 7
availableSpins = 1
```

---

### **3. SpinWheel.jsx** (Interactive Wheel)
**Location:** `src/components/spin/SpinWheel.jsx`

The main gamification component - an SVG-based spinning wheel with 8 reward segments.

**Wheel Segments (45° each):**
1. **RM5 Cash Bonus** - Violet gradient
2. **Try Again** - Deep purple (consolation prize)
3. **500 GX Coins** - Magenta gradient
4. **RM10 Shopee Voucher** - Hot pink
5. **RM5 Cash Bonus** (Duplicate) - Violet
6. **Try Again** (Duplicate) - Deep purple
7. **500 GX Coins** (Duplicate) - Magenta
8. **iPhone 16 Pro** (GRAND PRIZE) ⭐ - Gold with glow effect

**Visual Design:**
- SVG-based with radial gradients for depth
- Golden pointer at top (12 o'clock)
- Conic gradient border ring for visual interest
- Glow shadow effects for premium feel
- Inner studs for flair

**Interaction Model:**

**Spin Mechanics:**
1. User clicks "SPIN NOW" button
2. Wheel spins for 4.1 seconds with easing curve
3. Animation completes with wheel landing on a segment
4. Prize result is passed to parent via `onResult` callback

**Animation Details:**
- Spin duration: 4.1 seconds
- Easing: `cubic-bezier(0.17, 0.67, 0.21, 1)` (smooth deceleration)
- Total rotation: 6 full turns + calculated offset
- Pointer stays fixed at top

**Center Button Behavior:**
- **Normal state:** Glowing violet gradient, pulsing animation
- **Spinning state:** Disabled, shows "..."
- **No spins:** Disabled, muted appearance
- **Hover:** Scale up 1.05x
- **Active:** Scale down 0.95x

**Bottom CTA Button:**
- Mirrors center button functionality
- Provides secondary accessibility
- Full width on mobile

**Props:**
```javascript
{
  onResult: (winner) => {},  // Called when spin completes
  hasSpins: true             // Enable/disable spin button
}
```

**Exported Constants:**
```javascript
export const SEGMENTS = [
  { 
    id: 'cash5',
    label: 'RM5',
    sub: 'Cash',
    icon: Banknote,
    color: '#7C3AED',
    text: '#fff'
  },
  // ... more segments
  {
    id: 'iphone',
    label: 'iPhone 16',
    sub: 'GRAND',
    icon: Smartphone,
    color: '#FBBF24',
    text: '#1A0B2E',
    grand: true  // Special flag for grand prize
  }
]
```

---

### **4. RewardModal.jsx** (Post-Spin Overlay)
**Location:** `src/components/spin/RewardModal.jsx`

Beautiful glassmorphism modal that displays the spin result.

**Modal States:**

#### **4.1 Win State** (Non-Try-Again)
- Confetti animation (28 pieces falling)
- Glowing prize medallion
- Headline: "Congratulations! You won a [PRIZE]!"
- Supportive message
- CTA: "Add to Saving Pocket"
- Secondary: "Close" button

#### **4.2 Try Again State**
- No confetti
- Muted icon color
- Headline: "So close! Try again next time"
- No supporting message
- CTA: "Keep Saving"
- Secondary: "Close" button

#### **4.3 Grand Prize State** 🏆
- Confetti animation
- Amber/gold theme styling
- Special badge: "GRAND PRIZE"
- Headline: "JACKPOT! You won the iPhone 16 Pro!"
- Special message about delivery
- Same CTA buttons

**Visual Elements:**

**Confetti Animation:**
- 28 colored pieces
- 5 colors: Gold, Pink, Violet, Mint, White
- Random horizontal spread
- Falling animation with rotation
- Duration: 1.4-2.8 seconds

**Prize Medallion:**
- 96x96px circular container
- Animated glow background
- Prize icon centered
- Different styling for try-again (muted)
- Different styling for grand prize (gold)

**Backdrop:**
- Semi-transparent black (65% opacity)
- Subtle backdrop blur
- Clickable to close

**Animations:**
- Modal float-up entrance (0.35s)
- Glow pulse for prize medallion
- Confetti fall with rotation

**Props:**
```javascript
{
  open: boolean,                 // Show/hide modal
  prize: {                        // Prize object from SEGMENTS
    id: string,
    label: string,
    sub: string,
    icon: IconComponent,
    color: string,
    text: string,
    grand?: boolean
  },
  onAddToPocket: () => {},       // Add prize to pocket
  onClose: () => {}              // Close modal
}
```

**Usage Example:**
```javascript
<RewardModal
  open={showPrize}
  prize={currentPrize}
  onAddToPocket={() => savePrize(currentPrize)}
  onClose={() => setPrize(null)}
/>
```

---

## 🎨 Design System Integration

### Color Palette
- **Primary**: Violet gradient `#9F5BFF` → `#7C3AED`
- **Secondary**: Magenta `#7A1FA2`
- **Accent Pink**: `#FF66C4`
- **Accent Mint**: `#3DDC97`
- **Gold**: `#FBBF24` (Grand Prize)
- **Background**: Dark `#0E0518` to `#1A0B2E`

### Glassmorphism
- `class="glass"` - Applies blur, saturation, and border effects
- `class="card-hi"` - Card styling with shadow and inner highlight

### Shadows & Glows
- Glow shadow: `shadow-glow`
- Card shadow: `shadow-card`
- Custom glows on buttons and badges

### Animations
- **pulseGlow**: 2.4s infinite pulsing shadow
- **floatUp**: 0.35s entrance animation
- **confettiFall**: Custom 1.4-2.8s falling animation

### Typography
- Font: Inter sans-serif
- Text colors:
  - Primary: White `#FFFFFF`
  - Secondary: Light purple `#C8B8E6`
  - Muted: Medium purple `#8A7AB0`

---

## 🔄 State Flow

```
SpinAndWinScreen
  ├── State: spins, prize, history
  ├── WeeklyTracker
  │   └── Display: completed days, available spins
  ├── SpinWheel
  │   ├── Handle: user clicks "SPIN NOW"
  │   ├── Animate: 4.1s rotation
  │   └── Callback: onResult(winner)
  │       └── Update state: spins--, prize, history
  └── RewardModal
      ├── Display: prize details
      ├── User action: Add to Pocket
      └── Close modal
```

---

## 🚀 Integration with App

**File:** `src/App.jsx`

The SpinAndWinScreen is integrated into the main router:

```javascript
import SpinAndWinScreen from './screens/SpinAndWinScreen.jsx';

{screen === 'spin' && (
  <SpinAndWinScreen onBack={() => setScreen('home')} />
)}
```

**Navigation:**
- Set state: `setScreen('spin')` to open
- Callback: `onBack()` returns to home

---

## 💡 Usage Examples

### Basic Integration
```jsx
import SpinAndWinScreen from './screens/SpinAndWinScreen.jsx';

function App() {
  const [screen, setScreen] = useState('home');
  
  return screen === 'spin' ? (
    <SpinAndWinScreen onBack={() => setScreen('home')} />
  ) : null;
}
```

### Customizing Weekly Tracker
```jsx
<WeeklyTracker 
  completedDays={6}
  totalDays={7}
  availableSpins={2}
/>
```

### Handling Spin Result
```jsx
<SpinWheel 
  hasSpins={spinsRemaining > 0}
  onResult={(prize) => {
    console.log('Won:', prize.label);
    // Update backend, animate confetti, etc.
  }}
/>
```

### Controlling Reward Modal
```jsx
const [showReward, setShowReward] = useState(false);
const [selectedPrize, setSelectedPrize] = useState(null);

<RewardModal
  open={showReward}
  prize={selectedPrize}
  onAddToPocket={() => {
    addToSavingPocket(selectedPrize);
    setShowReward(false);
  }}
  onClose={() => setShowReward(false)}
/>
```

---

## 🎯 Features & Behavior

### Weekly Tracker
- ✅ 7-day visual progress display
- ✅ Glowing effect for completed days
- ✅ Spin badges with pulse animation
- ✅ Motivational messaging
- ✅ Progress connector bar

### Spin Wheel
- ✅ 8 reward segments with icons
- ✅ 4.1s smooth spin animation
- ✅ Random winner selection
- ✅ Disabled state management
- ✅ Pulsing glow effects
- ✅ Grand prize highlight

### Reward Modal
- ✅ Confetti animation (28 pieces)
- ✅ Three distinct states (Win/TryAgain/GrandPrize)
- ✅ Smooth entrance animation
- ✅ Glowing prize medallion
- ✅ Responsive button actions
- ✅ Clickable backdrop dismiss

### Overall Screen
- ✅ Ambient glow effects
- ✅ Recent wins history (last 5)
- ✅ Smooth scroll with no-scrollbar styling
- ✅ Dark theme consistent with GXBank
- ✅ Mobile-optimized layout

---

## 📱 Responsive Design

All components are built mobile-first with:
- Tailwind CSS utilities
- Flexible flexbox layouts
- Proper spacing and padding for mobile
- Touch-friendly button sizes (min 44x44px)
- Optimized for 375px+ screens

---

## 🔧 Customization

### Changing Rewards
Edit `SEGMENTS` array in `SpinWheel.jsx`:
```javascript
export const SEGMENTS = [
  { 
    id: 'custom',
    label: 'Your Label',
    sub: 'Subtitle',
    icon: YourIcon,
    color: '#HEXCOLOR',
    text: '#TEXTCOLOR'
  },
  // ...
];
```

### Adjusting Spin Duration
In `SpinWheel.jsx`, modify the timeout and transition:
```javascript
// Duration: change 4.1 (seconds)
setTimeout(() => { ... }, 4200); // milliseconds

// Easing: change cubic-bezier values
transition: 'transform 4.1s cubic-bezier(0.17, 0.67, 0.21, 1)'
```

### Changing Colors
Update Tailwind config in `tailwind.config.js` or use inline styles via Tailwind classes.

---

## 🎬 Demo & Testing

To test the feature:

1. **Open the app** - Navigate to home screen
2. **Access Spin & Win**:
   - Set screen state to 'spin' in App.jsx
   - Or add a navigation button
3. **View Weekly Tracker** - Shows progress with mock data
4. **Click SPIN NOW** - Triggers 4.1s animation
5. **See Result** - Modal displays prize
6. **Claim Prize** - Choose "Add to Saving Pocket"

---

## 📊 File Summary

| File | Purpose | Lines |
|------|---------|-------|
| `SpinAndWinScreen.jsx` | Main screen container | ~110 |
| `WeeklyTracker.jsx` | Weekly progress display | ~75 |
| `SpinWheel.jsx` | Interactive spinning wheel | ~230 |
| `RewardModal.jsx` | Prize celebration modal | ~140 |
| `App.jsx` | Router integration | Updated |

**Total New Code:** ~555 lines of production-ready React

---

## ✨ Design Highlights

1. **Glassmorphism** - Modern frosted glass effect on cards
2. **Glowing Effects** - Premium glow shadows on interactive elements
3. **Smooth Animations** - 4.1s spin, 0.35s entrance, confetti fall
4. **Dark Theme** - GXBank's signature dark purple/magenta palette
5. **Microfeedback** - Hover scales, active states, disabled states
6. **Celebration** - Confetti, glow effects, premium feel
7. **Typography** - Clean, bold sans-serif with hierarchy
8. **Icons** - Lucide React icons for clarity and consistency

---

## 🚀 Next Steps

1. **Backend Integration**:
   - Connect spin endpoint to award prizes
   - Sync weekly tracking with user data
   - Persist spin history

2. **Analytics**:
   - Track engagement metrics
   - Monitor prize redemption
   - Measure savings impact

3. **Enhancement Ideas**:
   - Leaderboards for top savers
   - Seasonal themes/limited editions
   - Combo bonuses (e.g., 7-day streak bonus)
   - Social sharing on wins

4. **A/B Testing**:
   - Test reward values
   - Test spin animation speed
   - Test frequency of spins earned

---

**Built with ❤️ for GXBank's gamification strategy**
