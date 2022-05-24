module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "ground-dark": "var(--ground-dark)",
        ground: "var(--ground)",
        "ground-75": "var(--ground-75)",
        "ground-50": "var(--ground-50)",
        "ground-25": "var(--ground-25)",
        "ground-10": "var(--ground-10)",
        "ground-5": "var(--ground-5)",
        primary: "var(--primary)",
        "primary-75": "var(--primary-75)",
        "primary-50": "var(--primary-50)",
        "primary-25": "var(--primary-25)",
        "primary-10": "var(--primary-10)",
        "primary-5": "var(--primary-5)",
        secondary: "var(--secondary)",
        "secondary-75": "var(--secondary-75)",
        "secondary-50": "var(--secondary-50)",
        "secondary-25": "var(--secondary-25)",
        "secondary-10": "var(--secondary-10)",
        "secondary-5": "var(--secondary-5)",
        tertiary: "var(--tertiary)",
        "tertiary-75": "var(--tertiary-75)",
        "tertiary-50": "var(--tertiary-50)",
        "tertiary-25": "var(--tertiary-25)",
        "tertiary-10": "var(--tertiary-10)",
        "tertiary-5": "var(--tertiary-5)",
        accent: "var(--accent)",
        "accent-75": "var(--accent-75)",
        "accent-50": "var(--accent-50)",
        "accent-25": "var(--accent-25)",
        "accent-10": "var(--accent-10)",
        "accent-5": "var(--accent-5)"
      },
      transitionDuration: {
        DEFAULT: "100ms"
      }
    },
    fontFamily: {
      sans: [
        "Apercu",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
        "'Helvetica Neue'",
        "Arial",
        "sans-serif"
      ],
      funky: [
        "Ozik",
        "Apercu",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
        "'Helvetica Neue'",
        "Arial",
        "sans-serif"
      ],
      mono: [
        "Apercu Mono",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "'Liberation Mono'",
        "'Courier New'",
        "monospace"
      ]
    },
    keyframes: {
      "bg-pulse": {
        "0%": { opacity: "0.05" },
        "50%": { opacity: "0.10" },
        "100%": { opacity: "0.05" }
      },
      // Dropdown menu
      "scale-in": {
        "0%": { opacity: 0, transform: "scale(0)" },
        "100%": { opacity: 1, transform: "scale(1)" }
      },
      "slide-down": {
        "0%": { opacity: 0, transform: "translateY(-10px)" },
        "100%": { opacity: 1, transform: "translateY(0)" }
      },
      "slide-up": {
        "0%": { opacity: 0, transform: "translateY(10px)" },
        "100%": { opacity: 1, transform: "translateY(0)" }
      },
      // Tooltip
      "slide-up-fade": {
        "0%": { opacity: 0, transform: "translateY(2px)" },
        "100%": { opacity: 1, transform: "translateY(0)" }
      },
      "slide-right-fade": {
        "0%": { opacity: 0, transform: "translateX(-2px)" },
        "100%": { opacity: 1, transform: "translateX(0)" }
      },
      "slide-down-fade": {
        "0%": { opacity: 0, transform: "translateY(-2px)" },
        "100%": { opacity: 1, transform: "translateY(0)" }
      },
      "slide-left-fade": {
        "0%": { opacity: 0, transform: "translateX(2px)" },
        "100%": { opacity: 1, transform: "translateX(0)" }
      },
      // Navigation menu
      "enter-from-right": {
        "0%": { transform: "translateX(200px)", opacity: 0 },
        "100%": { transform: "translateX(0)", opacity: 1 }
      },
      "enter-from-left": {
        "0%": { transform: "translateX(-200px)", opacity: 0 },
        "100%": { transform: "translateX(0)", opacity: 1 }
      },
      "exit-to-right": {
        "0%": { transform: "translateX(0)", opacity: 1 },
        "100%": { transform: "translateX(200px)", opacity: 0 }
      },
      "exit-to-left": {
        "0%": { transform: "translateX(0)", opacity: 1 },
        "100%": { transform: "translateX(-200px)", opacity: 0 }
      },
      "scale-in-content": {
        "0%": { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
        "100%": { transform: "rotateX(0deg) scale(1)", opacity: 1 }
      },
      "scale-out-content": {
        "0%": { transform: "rotateX(0deg) scale(1)", opacity: 1 },
        "100%": { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 }
      },
      "fade-in": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 }
      },
      "fade-out": {
        "0%": { opacity: 1 },
        "100%": { opacity: 0 }
      }
    },
    animation: {
      loading: "bg-pulse 1s infinite",
      // Dropdown menu
      "scale-in": "scale-in 0.2s ease-in-out",
      "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      // Tooltip
      "slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      "slide-right-fade": "slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      "slide-down-fade": "slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      "slide-left-fade": "slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      // Navigation menu
      "enter-from-right": "enter-from-right 0.25s ease",
      "enter-from-left": "enter-from-left 0.25s ease",
      "exit-to-right": "exit-to-right 0.25s ease",
      "exit-to-left": "exit-to-left 0.25s ease",
      "scale-in-content": "scale-in-content 0.2s ease",
      "scale-out-content": "scale-out-content 0.2s ease",
      "fade-in": "fade-in 0.2s ease",
      "fade-out": "fade-out 0.2s ease"
    },
    maxWidth: ({ theme, breakpoints }) => ({
      none: "none",
      0: "0",
      ...theme("spacing"),
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
      prose: "65ch",
      ...breakpoints(theme("screens"))
    }),
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1920px"
    },
    spacing: {
      0: "0",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
      12: "12px",
      16: "16px",
      20: "20px",
      24: "24px",
      32: "32px",
      40: "40px",
      48: "48px",
      56: "56px",
      64: "64px",
      72: "72px",
      80: "80px",
      88: "88px",
      96: "96px",
      128: "128px",
      160: "160px",
      192: "192px",
      224: "224px",
      256: "256px",
      288: "288px",
      320: "320px",
      em: "1em"
    }
  },
  plugins: [require("tailwindcss-radix")()]
};
