/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f3efe6",
        card: "#fffdf8",
        ink: "#1c1915",
        muted: "#6f675e",
        line: "#e6dfd2",
        clay: "#9a3412",
        moss: "#1f4d3a",
      },
      fontFamily: {
        sans: [
          "Segoe UI",
          "PingFang TC",
          "Noto Sans TC",
          "Microsoft JhengHei",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 16px 40px -28px rgba(28, 25, 21, 0.45)",
      },
    },
  },
  plugins: [],
};
