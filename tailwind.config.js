/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fff3c4',
          200: '#ffe484',
          300: '#ffd644',
          400: '#ffc814',
          500: '#ffbb00',
        },
        secondary: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
        },
      },
      screens: {
        'print': {'raw': 'print'},
      },
    },
  },
  variants: {
    extend: {
      display: ['print'],
      margin: ['print'],
      padding: ['print'],
      fontSize: ['print'],
    },
  },
  plugins: [],
};