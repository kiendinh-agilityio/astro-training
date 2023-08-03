const colors = require('./src/themes/colors.ts');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: { colors },
  },
  plugins: [],
};
