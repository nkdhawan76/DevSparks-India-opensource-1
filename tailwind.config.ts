import type { Config } from "tailwindcss";

const config: Config = {
  // STRICT LIGHT THEME: darkMode is explicitly disabled
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deploycheck: {
          bg: "#F7F9FC",
          surface: "#FFFFFF",
          primary: "#172033",
          secondary: "#667085",
          border: "#E4E7EC",
          blue: {
            DEFAULT: "#3563E9",
            hover: "#264FC7",
            light: "#EFF4FF",
          },
          violet: "#6D5EF7",
          success: "#16803D",
          warning: "#B7791F",
          error: "#C62828",
        },
      },
    },
  },
  plugins: [],
};

export default config;
