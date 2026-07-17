/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: '#161D30',
        primary: {
          DEFAULT: '#05B284', // Emerald / Teal
          dark: '#04926C',
          light: '#35CFA4'
        },
        secondary: {
          DEFAULT: '#6366F1', // Indigo
          dark: '#4F46E5',
          light: '#818CF8'
        },
        slateCustom: {
          800: '#1F293D',
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
