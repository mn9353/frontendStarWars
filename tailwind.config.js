/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core palette
        "space-black":   "#050510",
        "deep-space":    "#0a0a1a",
        "imperial-grey": "#1a1a2e",
        "dark-matter":   "#16213e",
        "nebula":        "#0f3460",
        // Lightsaber colors
        "saber-blue":    "var(--primary-hex)",
        "saber-cyan":    "#90e0ef",
        "saber-red":     "#ff0a54",
        "saber-green":   "#57cc99",
        "saber-purple":  "#7b2fbe",
        // Gold / Force
        "force-gold":    "#f7c948",
        "force-amber":   "#e9a919",
        "republic-white":"#e8e8e8",
        "stardust":      "#c0c0d0",
        // Surface layers
        "surface-void":  "#08081a",
        "surface-dark":  "#0d0d22",
        "surface-panel": "#111130",
        "surface-card":  "#161635",
        "surface-hover": "#1e1e45",
      },
      spacing: {
        "mobile":        "16px",
        "desktop":       "80px",
        "section":       "120px",
        "gutter":        "24px",
        "unit":          "8px",
      },
      fontFamily: {
        "orbitron":      ["Orbitron", "sans-serif"],
        "rajdhani":      ["Rajdhani", "sans-serif"],
        "exo":           ["Exo 2", "sans-serif"],
        "mono":          ["Share Tech Mono", "monospace"],
      },
      animation: {
        "star-field":    "starField 60s linear infinite",
        "saber-pulse":   "saberPulse 2s ease-in-out infinite",
        "crawl":         "crawl 30s linear forwards",
        "scan-line":     "scanLine 3s linear infinite",
        "hologram":      "hologram 4s ease-in-out infinite",
        "orbit":         "orbit 20s linear infinite",
        "flicker":       "flicker 0.15s infinite",
        "data-stream":   "dataStream 8s linear infinite",
        "beacon":        "beacon 3s ease-in-out infinite",
        "float":         "float 6s ease-in-out infinite",
      },
      keyframes: {
        saberPulse: {
          "0%, 100%": { boxShadow: "0 0 10px var(--primary-hex), 0 0 20px var(--primary-hex), 0 0 40px var(--primary-hex)80" },
          "50%":      { boxShadow: "0 0 20px var(--primary-hex), 0 0 40px var(--primary-hex), 0 0 80px var(--primary-hex)" },
        },
        hologram: {
          "0%, 100%": { opacity: "0.9", transform: "scaleY(1)" },
          "50%":      { opacity: "0.7", transform: "scaleY(0.98)" },
        },
        scanLine: {
          "0%":   { top: "0%" },
          "100%": { top: "100%" },
        },
        beacon: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%":      { transform: "scale(1.3)", opacity: "0.4" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        dataStream: {
          "0%":   { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.85" },
        },
        starField: {
          "0%":   { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-2000px 1000px" },
        },
      },
      boxShadow: {
        "saber-blue":   "0 0 10px var(--primary-hex), 0 0 30px var(--primary-hex)60, 0 0 60px var(--primary-hex)30",
        "saber-red":    "0 0 10px #ff0a54, 0 0 30px #ff0a5460, 0 0 60px #ff0a5430",
        "saber-green":  "0 0 10px #57cc99, 0 0 30px #57cc9960, 0 0 60px #57cc9930",
        "force-gold":   "0 0 10px #f7c948, 0 0 30px #f7c94860, 0 0 60px #f7c94830",
        "hologram":     "0 0 40px rgba(var(--primary-rgb),0.2), inset 0 0 40px rgba(var(--primary-rgb),0.05)",
        "card":         "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(var(--primary-rgb),0.1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
