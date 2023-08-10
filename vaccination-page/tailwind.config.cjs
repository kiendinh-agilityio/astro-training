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
        dark: 'rgba(196, 196, 196, 0.05)',
        darker: 'rgba(196, 196, 196, 0.10)',
        'navbar': 'rgba(255, 255, 255, 0.50)',
        'toggle': 'rgba(196, 196, 196, 0.15)',
        tertiary: {
          5: 'rgba(196, 196, 196, 0.05)',
          10: 'rgba(196, 196, 196, 0.10)',
          15: 'rgba(196, 196, 196, 0.15)',      
          20: 'rgba(196, 196, 196, 0.20)',
          50: 'rgba(196, 196, 196, 0.50)',
        },
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
        'input-database-lg': 'calc(100% - 120px)', // subtracts 120px is the margin and the distance between the two inputs and the button
      },
      borderRadius: {
        'card-sm': '10px 10px 0px 0px;',
        'card-md': '20px 20px 0px 0px',
        'card-lg': '20px 80px 20px 20px',
        'card-xl': '50px 150px 50px 50px',
      },
      backgroundImage: {
      // Database section
        'database-mobile': "url('assets/images/webp/bg-database-mobile.webp'), url('assets/images/png/bg-database-mobile.png')",
        'database-tablet': "url('assets/images/webp/bg-database-tablet.webp'), url('assets/images/png/bg-database-tablet.png')",
        'database-desktop': "url('assets/images/webp/bg-database-desktop.webp'), url('assets/images/png/bg-database-desktop.png')",
      // Get Vaccinated section
        'get-vaccinated-mobile': "url('assets/images/webp/bg-get-vaccinated-mobile.webp'), url('assets/images/png/bg-get-vaccinated-mobile.png')",
        'get-vaccinated-tablet': "url('assets/images/webp/bg-get-vaccinated.webp'), url('assets/images/png/bg-get-vaccinated-tablet.png')",
        'get-vaccinated-desktop': "url('assets/images/webp/bg-get-vaccinated.webp'), url('assets/images/png/bg-get-vaccinated-desktop.png')",
      }
    },
  },
  plugins: [],
};
