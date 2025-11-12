/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#142033",
          DEFAULT: "#2a7fff",
          soft: "#f6f7fb",
        },
      },
      boxShadow: {
        soft: "0 18px 32px rgba(15, 35, 70, 0.08)",
        lifted: "0 24px 44px rgba(15, 35, 70, 0.12)",
      },
      borderRadius: {
        xl: "24px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
            copesMarquee: {
              "0%": { transform: "translateX(0%)" },
              "100%": { transform: "translateX(-100%)" },
            },
        gradient: {
          "0%, 100%": { transform: "translate(-12%, -12%) scale(1)" },
          "50%": { transform: "translate(10%, 10%) scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
            marquee: "marquee 16s linear infinite",
            copesMarquee: "copesMarquee 32s linear infinite",
        gradient: "gradient 20s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

