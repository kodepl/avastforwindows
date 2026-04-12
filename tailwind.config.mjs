import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
          400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
          800: '#065f46', 900: '#064e3b', 950: '#022c22',
        },
        secondary: {
          50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9',
          400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490',
          800: '#155e75', 900: '#164e63', 950: '#083344',
        },
        accent: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12', 950: '#431407',
        },
        text: { primary: '#f1f5f9', secondary: '#cbd5e1', muted: '#94a3b8' },
        surface: { DEFAULT: '#020617', alt: '#0f172a', dark: '#000000' },
      },
      fontFamily: {
        heading: ['Orbitron', 'system-ui', 'sans-serif'],
        body: ['Rajdhani', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem', xl: '3rem' },
        screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
      },
      borderRadius: {
        sm: '0.125rem', DEFAULT: '0.25rem', md: '0.375rem', lg: '0.5rem',
        xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem', full: '9999px',
      },
    },
  },
  plugins: [typography],
};
