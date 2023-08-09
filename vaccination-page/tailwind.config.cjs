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
        darker: 'rgba(196, 196, 196, 0.10)',
        'navbar': 'rgba(255, 255, 255, 0.50)',
        'toggle': 'rgba(196, 196, 196, 0.15)',
        'card-schedule': 'rgba(196, 196, 196, 0.05)',
      },
      screens: {
        xs: '320px',
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        xxl: '1440px',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '4xl': '36px',
        '5xl': '48px',
      },
      lineHeight: {
        base: 'normal',
      },
      maxWidth: {
        'hero-content': 'calc(100% - 622px - 74px)', // subtract for the width of the hero banner and the distance between the hero content and the hero banner
      },
      width: {
        'schedule-content-md': 'calc(50% - 25px)', //subtract for the distance between 2 content in the schedule
      },
      borderRadius: {
        'card-schedule': '20px 20px 0px 0px',
      },
    },
  },
  plugins: [],
};
