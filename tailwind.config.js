/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          rausch: '#FF385C',
          rauschDark: '#E00B41',
          gradientStart: '#E61E4D',
          gradientEnd: '#D70466',
          dark: '#222222',
          medium: '#717171',
          light: '#B0B0B0',
          border: '#DDDDDD',
          borderLight: '#EBEBEB',
          bgLight: '#F7F7F7',
          hoverBg: '#F2F2F2',
          blackOverlay: 'rgba(0, 0, 0, 0.65)',
        }
      },
      fontFamily: {
        sans: [
          'Airbnb Cereal VF',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        airbnb: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
        'airbnb-card': '0 6px 16px rgba(0,0,0,0.12)',
        'airbnb-float': '0 6px 20px rgba(0,0,0,0.2)',
        'airbnb-modal': '0 8px 28px rgba(0,0,0,0.28)',
      },
      borderRadius: {
        'airbnb': '12px',
        'airbnb-lg': '24px',
      }
    },
  },
  plugins: [],
}
