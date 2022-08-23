module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        lg: "0 0px 7px 4px rgba(37,99,235, 0.75)",
        xl: "0 0px 7px 8px rgba(37,99,235, 0.75)",
      },
    },
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',

      '2xl': '1536px',
      "3xl": "2000px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
