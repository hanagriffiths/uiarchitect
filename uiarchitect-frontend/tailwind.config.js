/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/index.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter_400Regular'],
        interSemibold: ['Inter_600SemiBold'],
        interBold: ['Inter_700Bold'],
        interItalic: ['Inter_300Light_Italic'],
        interBoldItalic: ['Inter_600SemiBold_Italic'],
      },
    },
  },
  plugins: [],
}

