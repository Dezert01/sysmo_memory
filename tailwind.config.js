/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1440px",
        xl: "1200px",
        lg: "960px",
        md: "720px",
        sm: "640px",
      },
    },
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      dark: "#1C1C1C",
      primary: "#EC7302",
      primaryHover: "#F35701",
      secondary: "#F03802",
      lightGray: "#E7E7E7",
      lightGrayHover: "#D4D4D4",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
