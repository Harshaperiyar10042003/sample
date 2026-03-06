/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color' : '#2D3B45',
        'secondary-color' : '#5624D0',
        'accent-color' : '#A435F0',
        'background-color-1' : '#F8F9FB',
        'text-color' : '#1C1D1F',
        'border-color' : '#D1D7DC',
        'success-color' : '#19A463',
        'warning-color' : '#F69C08',
        'logo-yellow' : '#FAE534',
        'light-text' : '#7a7979',
      }
    },
  },
  plugins: [
  ],
}