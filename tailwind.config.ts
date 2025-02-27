import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Montserrat", "serif"],
        family: ["Roboto Serif", "serif"],
      },
      screens: {
        xs:"430px", //custom screen
      }
    },
  },
  plugins: [],
} satisfies Config;
