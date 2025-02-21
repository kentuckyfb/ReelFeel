/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
