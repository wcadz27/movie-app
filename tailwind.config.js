module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        lg: "0 0px 7px 4px rgba(37,99,235, 0.75)",
        xl: "0 0px 7px 8px rgba(37,99,235, 0.75)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
