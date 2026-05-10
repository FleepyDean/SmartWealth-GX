/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // GXBank palette
        bg: {
          900: '#0E0518',
          800: '#1A0B2E',
          700: '#231043',
          600: '#2A1352',
        },
        violet: {
          DEFAULT: '#7C3AED',
          glow: '#9F5BFF',
          deep: '#4A148C',
          ink: '#3B1170',
        },
        magenta: '#7A1FA2',
        card: {
          DEFAULT: '#1F1235',
          soft: '#261642',
          line: '#3A2160',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C8B8E6',
          muted: '#8A7AB0',
        },
        accent: {
          flame: '#FF8A3D',
          mint: '#3DDC97',
          pink: '#FF66C4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(159, 91, 255, 0.55), 0 0 60px rgba(124, 58, 237, 0.35)',
        glowSm: '0 0 16px rgba(159, 91, 255, 0.45)',
        glowGold: '0 0 24px rgba(251, 191, 36, 0.5), 0 0 50px rgba(251, 146, 60, 0.3)',
        card: '0 8px 30px rgba(0, 0, 0, 0.35)',
        cardHi: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 32px rgba(0,0,0,0.4)',
        soft: '0 2px 12px rgba(0,0,0,0.25)',
        press: 'inset 0 2px 6px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'app-gradient':
          'radial-gradient(120% 80% at 0% 0%, #4A148C 0%, transparent 55%), radial-gradient(120% 100% at 100% 100%, #2A1352 0%, transparent 60%), linear-gradient(180deg, #1A0B2E 0%, #0E0518 100%)',
        'violet-grad': 'linear-gradient(135deg, #9F5BFF 0%, #7C3AED 60%, #4A148C 100%)',
        'violet-soft': 'linear-gradient(135deg, rgba(159,91,255,0.18) 0%, rgba(124,58,237,0.08) 100%)',
        'gold-grad': 'linear-gradient(135deg, #FDE68A 0%, #FBBF24 50%, #F97316 100%)',
        'mint-grad': 'linear-gradient(135deg, #6EE7B7 0%, #3DDC97 50%, #10B981 100%)',
        'pink-grad': 'linear-gradient(135deg, #FF99D6 0%, #FF66C4 50%, #C026D3 100%)',
        'card-grad': 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #231043 0%, #1A0B33 100%)',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(159,91,255,0.55)' },
          '50%': { boxShadow: '0 0 30px 8px rgba(159,91,255,0.55)' },
        },
        floatUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        floatUp: 'floatUp 0.35s ease-out both',
        fadeIn: 'fadeIn 0.4s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
        sparkle: 'sparkle 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
