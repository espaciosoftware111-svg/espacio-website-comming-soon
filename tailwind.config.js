/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          beige: '#F7F4EE',
          'beige-light': '#FAF8F5',
          'beige-dark': '#EFE9DF',
          'beige-border': '#E4DCD0',
          charcoal: '#121316',
          'charcoal-light': '#1E2024',
          'charcoal-muted': '#4A4D55',
          gold: '#C5A572',
          'gold-light': '#DFC28D',
          'gold-dark': '#9A7A48',
          'gold-subtle': '#E8D5B5',
          obsidian: '#070809',
          'obsidian-card': '#0E1013',
          'obsidian-border': '#1F2228',
          silver: '#E5E7EB',
          'silver-bright': '#F9FAFB',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'mega-wide': '0.35em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(18, 19, 22, 0.07), 0 0 1px 1px rgba(18, 19, 22, 0.05)',
        'luxury-hover': '0 30px 60px -20px rgba(18, 19, 22, 0.12), 0 0 1px 1px rgba(18, 19, 22, 0.08)',
        'plaque': '0 35px 70px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        'gold-glow': '0 0 25px rgba(197, 165, 114, 0.3)',
      },
      backgroundImage: {
        'noise-pattern': "radial-gradient(circle at 50% 50%, rgba(247, 244, 238, 0.95) 0%, rgba(239, 233, 223, 0.98) 100%)",
        'plaque-gradient': "linear-gradient(145deg, #16181D 0%, #0C0D10 50%, #070809 100%)",
        'gold-gradient': "linear-gradient(135deg, #DFC28D 0%, #C5A572 50%, #9A7A48 100%)",
        'silver-gradient': "linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 50%, #9CA3AF 100%)",
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
