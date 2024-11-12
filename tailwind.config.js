/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {

      'sm450': '450px',
      // => @media (min-width: 450px) { ... }
      
      'sm570': '570px',
      // => @media (min-width: 570px) { ... }
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg890md': '890px',
      // => @media (min-width: 890px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl1120lg': '1120px',
      // => @media (min-width: 1120px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '1xl': '1320px',
      // => @media (min-width: 1320px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purplePry: "#EB72FF",
        bluePry:"#48A7FF",
        darkPry:'#1B1C1E',
        blackPry:'#111111',
      },

    },
  },
  plugins: [],
};
