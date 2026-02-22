/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        frapatea: {
          black:    '#0A0A0A',
          dark:     '#111111',
          card:     '#1A1A1A',
          surface:  '#222222',
          border:   '#2E2E2E',
          pink:     '#FF3D8A',
          'pink-light': '#FF6FAA',
          'pink-dark':  '#CC2A6E',
          'pink-glow':  '#FF3D8A33',
          white:    '#FFFFFF',
          muted:    '#A0A0A0',
          subtle:   '#5A5A5A',
        }
      },
      fontFamily: {
        'inter':  ['Inter', 'system-ui', 'sans-serif'],
        'outfit': ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':        'fadeIn 0.5s ease-in-out',
        'slide-up':       'slideUp 0.4s ease-out',
        'bounce-gentle':  'bounceGentle 0.6s ease-out',
        'scale-in':       'scaleIn 0.3s ease-out',
        'pulse-pink':     'pulsePink 2s ease-in-out infinite',
        'glow':           'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' }
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%':                     { transform: 'translateY(-4px)' },
          '60%':                     { transform: 'translateY(-2px)' }
        },
        scaleIn: {
          '0%':   { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)',    opacity: '1' }
        },
        pulsePink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' }
        },
        glow: {
          '0%':   { boxShadow: '0 0 10px #FF3D8A55' },
          '100%': { boxShadow: '0 0 25px #FF3D8Aaa, 0 0 50px #FF3D8A44' }
        }
      },
      backgroundImage: {
        'pink-gradient':   'linear-gradient(135deg, #FF3D8A 0%, #CC2A6E 100%)',
        'dark-gradient':   'linear-gradient(135deg, #111111 0%, #1A1A1A 100%)',
        'card-gradient':   'linear-gradient(135deg, #1A1A1A 0%, #222222 100%)',
        'hero-gradient':   'linear-gradient(135deg, #0A0A0A 0%, #1a0010 50%, #0A0A0A 100%)',
      },
      boxShadow: {
        'pink':     '0 4px 20px rgba(255, 61, 138, 0.4)',
        'pink-lg':  '0 8px 40px rgba(255, 61, 138, 0.5)',
        'dark':     '0 4px 20px rgba(0, 0, 0, 0.5)',
        'card':     '0 2px 12px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
};