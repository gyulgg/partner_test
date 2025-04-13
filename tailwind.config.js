/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ 이거 꼭 있어야 Tailwind가 너 코드에서 className 찾음
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
