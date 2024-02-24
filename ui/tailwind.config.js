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
        darkbrown: "#544936",
        frenchgray: "#B9B6C2",
        bluemunsell: "#1B9AAA",
        "bluemunsell-light": "#EDFBFC",
        chinarose: "#B24C63",
        "amaranth-purple": "#B32244",
        cordovan: "#8F3D50",
        ochre: "#e98a15",
      },
    },
  },
  plugins: [],
};
