import type { Config } from "tailwindcss";

const config: Config = {
  // STRICT LIGHT THEME: Dark mode is disabled across all components
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
          bg: "#F7F8FC",
          surface: "#FFFFFF",
          primary: "#17172A",
          secondary: "#667085",
          border: "#E5E7EB",
          purple: {
            DEFAULT: "#5938F5",
            hover: "#4726DB",
            light: "#F0EEFF",
          },
          blue: {
            DEFAULT: "#3563E9",
            hover: "#264FC7",
            light: "#EFF4FF",
            secondary: "#3988F7",
          },
          violet: "#6D5EF7",
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#DC2626",
          danger: "#DC2626",
          info: "#2563EB",
        },
      },
    },
  },
  plugins: [],
};

export default config;

