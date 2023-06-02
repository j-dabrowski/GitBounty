/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lila: "#6239f7",
        lilaSuave: "#9c96f8",
      },

      keyframes: {
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "22ch" },
        },
        typewriter2: {
          "0%": { width: "0" },
          "100%": { width: "30ch" },
        },
        cursor: {
          "0%": { "border-right-color": "rgba(255,255,255,0.7)" },
          "100%": { "border-right-color": "transparent" },
        },
        fullSpin: {
          "100%": {
            transform: " rotate(-360deg)",
          },
        },
        fullSpin2: {
          "100%": {
            transform: " rotate(360deg)",
          },
        },
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        fullSpin: " fullSpin 5s linear infinite",
        fullSpin2: " fullSpin2 5s linear infinite",
        text: "text 5s ease infinite",
        typewriter: "typewriter 1s linear infinite",
        typewriter2: "typewriter2 1s linear infinite",
        cursor: "cursor 1s linear infinite",
      },
    },
  },
  plugins: [],
};
