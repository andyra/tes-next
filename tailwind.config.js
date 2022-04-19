module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "base-dark": "var(--base-dark)",
        base: "var(--base)",
        "base-75": "var(--base-75)",
        "base-50": "var(--base-50)",
        "base-25": "var(--base-25)",
        "base-10": "var(--base-10)",
        "base-5": "var(--base-5)",
        default: "var(--default)",
        "default-75": "var(--default-75)",
        "default-50": "var(--default-50)",
        "default-25": "var(--default-25)",
        "default-10": "var(--default-10)",
        "default-5": "var(--default-5)",
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
        "secondary-5": "var(--secondary-5)"
      },
      // ringColors: {
      //   primary: "var(--primary)",
      //   "primary-75": "var(--primary-75)",
      //   "primary-50": "var(--primary-50)",
      //   "primary-25": "var(--primary-25)",
      //   "primary-10": "var(--primary-10)",
      //   "primary-5": "var(--primary-5)"
      // },
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
