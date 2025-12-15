/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f172a", // headings / primary text
          DEFAULT: "#2563eb", // primary CTA
          soft: "#f3f4f6", // card / section backgrounds
        },
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.625" }],
        base: ["1rem", { lineHeight: "1.75" }],
        lg: ["1.125rem", { lineHeight: "1.75" }],
        xl: ["1.25rem", { lineHeight: "1.75" }],
        "2xl": ["1.5rem", { lineHeight: "1.5" }],
        "3xl": ["1.875rem", { lineHeight: "1.4" }],
        "4xl": ["2.25rem", { lineHeight: "1.3" }],
        "5xl": ["3rem", { lineHeight: "1.2" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
      },
      spacing: {
        section: "5rem",
        "section-sm": "4rem",
      },
      boxShadow: {
        soft: "0 18px 32px rgba(15, 35, 70, 0.08)",
        lifted: "0 28px 60px rgba(15, 23, 42, 0.16)",
        header: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        xl: "24px",
        "2xl": "32px",
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
        fly: {
          "0%": { transform: "translateX(-100px) translateY(0px)" },
          "100%": { transform: "translateX(calc(100vw + 100px)) translateY(0px)" },
        },
        "fly-reverse": {
          "0%": { transform: "translateX(calc(100vw + 300px)) translateY(0px)" },
          "100%": { transform: "translateX(-400px) translateY(0px)" },
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(250%)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(59,130,246,0)" },
          "50%": { boxShadow: "0 0 40px rgba(59,130,246,0.35)" },
        },
      },
      animation: {
        marquee: "marquee 16s linear infinite",
        copesMarquee: "copesMarquee 32s linear infinite",
        gradient: "gradient 20s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        fly: "fly 15s linear infinite",
        "fly-reverse": "fly-reverse 15s linear infinite",
        shine: "shine 1.8s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
