import type { Config } from 'tailwindcss'

export default {
  darkMode: 'media',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.25rem',
        screens: {
          lg: '960px',
          xl: '1120px',
          '2xl': '1280px',
        },
      },
      keyframes: {
        bump: {
          '0%': { transform: 'scale(.6)' },
          '60%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        bump: 'bump .35s ease',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config
