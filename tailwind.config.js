/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Half Moon Market / organisch palet */
        cream: '#faf8f5',
        peach: {
          50: '#fef8f5',
          100: '#faf0eb',
          200: '#f5d5c8',
          300: '#e8c4b8',
        },
        terracotta: {
          DEFAULT: '#d28a58',
          light: '#e5a77d',
          dark: '#b87547',
        },
        coral: {
          DEFAULT: '#d87f81',
          light: '#e5a0a2',
          dark: '#c46a6c',
        },
        /* Sage green palette - #89a491 als donkerste */
        sage: {
          50: '#f6f8f6',
          100: '#e8efe9',
          200: '#d5e0d7',
          300: '#b8cebb',
          400: '#9db9a2',
          500: '#89a491',
          600: '#89a491',
          700: '#89a491',
          800: '#89a491',
        },
        orange: '#f5a649',
        rose: '#d4a5a5',
        charcoal: '#2c2c2c',
        stone: '#6b6b6b',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #faf8f5 0%, #faf0eb 50%, #f5d5c8 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
