/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#0b153c',
        secondary: '#1b6ff3',
        input: 'rgba(0, 0, 0, 0.75)',
        overlay: '#000000b3',
        dark: 'rgba(196, 196, 196, 0.05)',
        darker: 'rgba(196, 196, 196, 0.10)',
        navbar: 'rgba(255, 255, 255, 0.50)',
        toggle: 'rgba(196, 196, 196, 0.15)',
        tertiary: {
          5: 'rgba(196, 196, 196, 0.05)',
          10: 'rgba(196, 196, 196, 0.10)',
          15: 'rgba(196, 196, 196, 0.15)',
          20: 'rgba(196, 196, 196, 0.20)',
          50: 'rgba(196, 196, 196, 0.50)',
        },
        'input-registration': 'rgba(11, 21, 60, 0.15)',
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
        tiny: '8px',
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
        // Hero section
        'hero-mobile': "url('/assets/images/webp/bg-hero-mobile.webp')",
        'hero-tablet': "url('/assets/images/webp/bg-hero-tablet.webp')",
        'hero-desktop': "url('/assets/images/webp/bg-hero-desktop.webp')",
        // Database section
        'database-mobile': "url('/assets/images/webp/bg-database-mobile.webp')",
        'database-tablet': "url('/assets/images/webp/bg-database-tablet.webp')",
        'database-desktop':
          "url('/assets/images/webp/bg-database-desktop.webp')",
        // Get Vaccinated section
        'get-vaccinated-mobile':
          "url('/assets/images/webp/bg-get-vaccinated-mobile.webp')",
        'get-vaccinated-tablet':
          "url('/assets/images/webp/bg-get-vaccinated-tablet.webp')",
        'get-vaccinated-desktop':
          "url('/assets/images/webp/bg-get-vaccinated-desktop.webp')",
        // Vaccine Registration section
        'vaccine-registration-mobile':
          "url('/assets/images/webp/bg-vaccine-registration-mobile.webp')",
        'vaccine-registration-tablet':
          "url('/assets/images/webp/bg-vaccine-registration-tablet.webp')",
        'vaccine-registration-desktop':
          "url('/assets/images/webp/bg-vaccine-registration-desktop.webp')",
        // Prevention section
        /// Prevention background
        'prevention-mobile':
          "url('/assets/images/webp/bg-prevention-mobile.webp')",
        'prevention-tablet':
          "url('/assets/images/webp/bg-prevention-tablet.webp')",
        'prevention-desktop':
          "url('/assets/images/webp/bg-prevention-desktop.webp')",
        /// Symptoms background
        'symptoms-mobile': "url('/assets/images/webp/symptoms.webp')",
        'symptoms-tablet': "url('/assets/images/webp/symptoms-tablet.webp')",
        'symptoms-desktop': "url('/assets/images/webp/symptoms-desktop.webp')",
        // Feedback section
        'feedback-mobile': "url('/assets/images/webp/bg-feedback.webp')",
        'feedback-tablet': "url('/assets/images/webp/bg-feedback-tablet.webp')",
        'feedback-desktop':
          "url('/assets/images/webp/bg-feedback-desktop.webp')",
        // Footer
        'footer-mobile': "url('/assets/images/webp/bg-footer-mobile.webp')",
        'footer-tablet': "url('/assets/images/webp/bg-footer-tablet.webp')",
        'footer-desktop': "url('/assets/images/webp/bg-footer-desktop.webp')",
      },
      boxShadow: {
        quaternary: '0px 4px 4px 0px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
};
