/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
import { PluginAPI } from "tailwindcss/types/config";

module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#323232",
        },
        scroll: {
          DEFAULT: "#fff", // scroll bar
        },
        primary: {
          DEFAULT: "#44B4EF", // focus & scroll thumb
          dark: "rgba(68, 180, 239, 0.3)", // neon inner
          light: "rgba(68, 180, 239, 0.4)", // neon outer
        },
        secondary: {
          light: "#B6B6B6", // text long
          DEFAULT: "#777", // text short
          dark: "#4E4E4E", // outline inputs
        },
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      keyframes: {
        reveal: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "reveal-mask": "reveal 1s ease-out forwards",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        antonio: ["Antonio", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(({ theme, addUtilities, matchUtilities }: PluginAPI) => {
      const neonUtilities = {};
      const colors = theme("colors");
      for (const color in colors) {
        const colorValue = colors[color];
        const color1 = colors[color]["500"] || colorValue.light;
        const color2 = colors[color]["700"] || colorValue.dark;
        neonUtilities[`.neon-${color}`] = {
          boxShadow: `0 0 5px ${color1}, 0 0 20px ${color2}`,
        };
      }
      addUtilities(neonUtilities);
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
