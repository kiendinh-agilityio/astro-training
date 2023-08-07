module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#0b153c',
        secondary: '#17c2ec',
        input: 'rgba(0, 0, 0, 0.25)',
        overlay: '#000000b3',
        'btn-checkstatus': 'rgba(196, 196, 196, 0.10)',
        'navbar': 'rgba(255, 255, 255, 0.50)',
      },
      screens: {
        xs: '100%',
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1200px',
        xxl: '1440px',
      },
      fontSize: {
        sm: '14px',
        xl: '20px',
        '2xl': '24px',
        '4xl': '36px',
        '5xl': '48px',
      },
      lineHeight: {
        base: 'normal',
      },
    },
  },
  plugins: [],
};
