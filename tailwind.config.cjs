/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E88E5",
        secondary: {
          100: "#2ECC71",
          900: "#34495E",
        },
        dark_neutral: "#2C3E50",
        light_neutral: "#ECF0F1",
        highlight: "#F39C12",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
}
