import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'green': '#8FFF00',
      'blue': '#460BFF',
      'darkgreen': '#75B300',
      'violet': '#3108B3',
      'orange': '#FF5800',
      'black': '#020617',
      'white': '#FFFFFF',
      'sky': '#CBCBFF',
      'purple': '#7A08B3',
      'yellow': '#CEFF08',
      'bone': '#E9FFBF',
      'pink': '#FF00CD',
      'brick': '#B32A08',
      'beige': '#FFBB50B',
      'wine': '#B30090',
      'lila': '#AE0BFF',
      'transparent': '#00000000',
      'turquesa': '#00FF66'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
