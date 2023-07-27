/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner1: "url('../public/img/b1.jpg')",
        banner2: "url('../public/img/b2.jpg')",
        banner3: "url('../public/img/b3.jpg')",
      },
      colors: {
        mainColor: '#fb7185',
      },
    },
  },
  plugins: [],
};
