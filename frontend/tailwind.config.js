/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Only activate dark: variants when .dark class is present on <html>
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        edu: {
          red: '#C0392B',
          'red-dark': '#96281B',
          'red-light': '#E74C3C',
          navy: '#1565C0',
          'navy-dark': '#0D47A1',
          'navy-light': '#1976D2',
          gold: '#D4A017',
          'gold-light': '#F0C030',
          cream: '#FAFAF8',
          'cream-dark': '#F0EDE8',
          text: '#1A1A2E',
          muted: '#5C5C6E',
          border: '#E2DDD8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'edu': '0 4px 24px rgba(192, 57, 43, 0.12)',
        'edu-lg': '0 8px 40px rgba(192, 57, 43, 0.20)',
        'navy': '0 4px 24px rgba(21, 101, 192, 0.15)',
        'card': '0 2px 12px rgba(26, 26, 46, 0.08)',
        'card-hover': '0 8px 32px rgba(26, 26, 46, 0.14)',
      },
    },
  },
  plugins: [],
}
