/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        eerieblack: "#1A1D21",
        gunmetal: "#282C34",
        charcoal: "#3E444F",
        sunset: "#EDCB96",
        ecru: "#D9BA89",
        frenchgray: "#B9B6C2",
        bluemunsell: "#1B9AAA",
        chinarose: "#B24C63",
      },
    },
  },
  plugins: [],
};
