/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        campus: {
          blue: '#2563EB',
          purple: '#7C3AED',
          lightBlue: '#EFF6FF',
          lightPurple: '#F5F3FF',
          text: '#1E293B',
          green: '#16A34A',
          orange: '#F59E0B',
          bg: '#F8FAFC',
        },
      },
    },
  },
  plugins: [],
};
