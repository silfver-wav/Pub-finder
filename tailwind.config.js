const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', 'serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
      colors: {
        wheat: '#f5deb3',
        off_white: '#fffaf0',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    }
  },
  plugins: [],
});