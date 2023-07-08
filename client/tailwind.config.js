/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        authBg: "url('./src/assets/others/authentication.png')",
      },
      backgroundColor: {
        navBgColor: "rgba(21, 21, 21, 0.50)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
