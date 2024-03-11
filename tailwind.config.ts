import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'header': ['Madimi One', 'sans-serif']
    },
    extend: {
      colors: {
        'creme': '#F9E79F',
        'laranja': '#F5B041',
        'azul': '#7D3174',
        'gray': '#424242',
        'gray-clear': '#585858',
        'gray-clear-2': '#848484'
      },
      width: {
        'vacancy-width': '110px'
      }
    },
  },
  plugins: [],
};
export default config;
