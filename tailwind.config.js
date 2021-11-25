module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["hover", "active"],
      ringColor: ["hover", "active"],
      ringOpacity: ["hover", "active"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
