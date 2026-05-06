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
        card: '0 8px 30px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'app-gradient':
          'radial-gradient(120% 80% at 0% 0%, #4A148C 0%, transparent 55%), radial-gradient(120% 100% at 100% 100%, #2A1352 0%, transparent 60%), linear-gradient(180deg, #1A0B2E 0%, #0E0518 100%)',
        'violet-grad': 'linear-gradient(135deg, #9F5BFF 0%, #7C3AED 60%, #4A148C 100%)',
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
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        floatUp: 'floatUp 0.35s ease-out both',
      },
    },
  },
  plugins: [],
};
