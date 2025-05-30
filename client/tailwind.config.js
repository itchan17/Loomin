/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "loomin-yellow": "#FFD23F",
        "loomin-orange": "#FF6F61",
        "loomin-white": "#F9F9F9",
      },
    },
  },
  variants: {
    fill: ["hover", "focus"],
    scrollbar: ['rounded']
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
