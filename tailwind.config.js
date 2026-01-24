/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#cbf7f7', // Bright turquoise
        accent: '#7FFFD4', // Light turquoise
        background: '#0a0a0a', // Dark background
        foreground: '#ededed', // Light text
      },
    },
  },
  plugins: [],
}