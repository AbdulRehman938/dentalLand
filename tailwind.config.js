/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': 'var(--brand-bg)',
        'brand-secondary': 'var(--brand-secondary)',
        'brand-black': 'var(--brand-black)',
        'brand-white': 'var(--brand-white)',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        logo: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        '8xl': '1720px',
      },
    },
  },
  plugins: [],
}

