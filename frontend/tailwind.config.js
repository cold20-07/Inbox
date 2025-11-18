/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NUCLEAR COLORS - Bold, pure, aggressive
        electric: '#0000FF',
        hotpink: '#FF006E',
        lime: '#CCFF00',
        deepurple: '#7209B7',
        chaos: '#FF0000',
        neon: {
          blue: '#00F0FF',
          pink: '#FF00FF',
          green: '#00FF00',
          yellow: '#FFFF00',
        },
        primary: {
          50: '#f5f0ff',
          100: '#ede5ff',
          400: '#a855f7',
          500: '#8b2fc9',
          600: '#7209B7',
        },
        accent: {
          400: '#ff3d8f',
          600: '#FF006E',
        },
      },
      fontFamily: {
        // Brutalist typography stack
        display: ['Archivo Black', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Space Grotesk', 'monospace'],
      },
      fontSize: {
        'nuclear': ['150px', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'massive': ['120px', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'huge': ['96px', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'giant': ['72px', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-color': '12px 12px 0px 0px #FF006E',
        'hard': '0 8px 0 rgba(0, 0, 0, 0.8)',
        'neon': '0 0 20px currentColor, 0 0 40px currentColor',
        'thick': '0 20px 60px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'shake': 'shake 0.5s ease-in-out',
        'squish': 'squish 0.2s ease-out',
        'explode': 'explode 0.6s ease-out',
        'drift': 'drift 20s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out',
        'slam': 'slam 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'grain': 'grain 8s steps(10) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        squish: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        explode: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slam: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 0, 110, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 0, 110, 0.8)' },
        },
      },
      rotate: {
        '3': '3deg',
        '5': '5deg',
      },
      letterSpacing: {
        'crush': '-0.05em',
      },
    },
  },
  plugins: [],
}
