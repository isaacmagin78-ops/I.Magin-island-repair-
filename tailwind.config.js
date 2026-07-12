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
        navy: '#001f3f',
        'navy-light': '#003d7a',
        'brand-blue': '#0066cc',
        'brand-warm': '#ff6b35',
        'brand-accent': '#ff6b35',
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
