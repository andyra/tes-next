module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        accent: "var(--bg-accent)",
        hover: "var(--bg-hover)"
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        accent: "var(--text-accent)"
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
      "2xl": "1536px"
    },
    spacing: {
      0: "0",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
      12: "12px",
      16: "16px",
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
  plugins: []
};
