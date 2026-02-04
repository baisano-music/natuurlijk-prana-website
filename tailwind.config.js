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
        sage: {
          50: '#f5f7f4',
          100: '#e8ebe6',
          200: '#d4ddd0',
          300: '#a8b9ad',
          400: '#89a491',
          500: '#6d8a75',
          600: '#5a735f',
          700: '#3d5a47',
          800: '#2d4335',
          900: '#243328',
          950: '#1a261d',
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
