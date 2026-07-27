/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4B057',
        'gold-light': '#F2D078',
        ink: '#0A0C10',
        'ink-secondary': '#14171F',
        cream: '#FAF6EC',
        teal: '#7BBFB5',
        'status-success': '#28a745',
        'status-warning': '#ffc107',
        'status-danger': '#dc3545',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
};
