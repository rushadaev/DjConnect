// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        base: ['16px', '20px'],
        sm: ['14px', '18px'],
        xs: ['12px', '16px'],
        lg: ['18px', '22px'],
        xl: ['20px', '24px'],
        xxl: ['28px', '32px'],
      },
      boxShadow: {
        DEFAULT: '0px 3px 2px rgba(237, 216, 194, 0.35)',
        custom: '0px 0px 34px 0px #00000014',
      },
      colors: {
        lightGrey:'#131313',
        brightBlue:'#0085FF',
        bgMain: '#000000',
        greenYellow: '#ADFF00',
        transparent: 'transparent',
        gray: '#9F9FA0',
        orange: '#FFA767',
        black: '#000000',
        white: '#FFFFFF',
        brown: '#968D7D',
        beige: '#FBF3E6',
        green: '#056760',
        red: '#E75854',
        yellow: '#FFD274',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.border-custom': {
          border: '1.5px solid #FFFFFF1A',
        },
        '.custom-border': {
          border: '1px solid #E1E1E1',
        },
        '.custom-scrollbar': {
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#F3F3F3',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#319A6E',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#1c1c1c',
          },
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.border-border': {
          borderColor: 'var(--border)',
        },
      })
    },
  ],
}