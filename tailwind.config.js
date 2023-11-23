/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      'roxo': {
        100: '#DB4DC0',
        200: '#D14973',
        300: '#B14FC5',
        400: '#9D4DDB',
        500: '#7049D1',
        800: '#331355',
        900: '#1F141D'
      },
      'laranja': {
        100: '#FFB224',
        200: '#E88A20',
        300: '#FF7F30',
        400: '#E85020',
        500: '#FF3824'
      },
      'verde': {
        100: '#0BD663',
        200: '#0ACC27',
        300: '#00C08B'
      },
      'azul': {
        100: '#0BD6D6',
        200: '#0A99CC'
      },
      'amarelo': {
        100: '#FCDC0D',
        200: '#F2BC0C',
        300: '#F0DF00'
      },
      'limao': {
        100: '#C4FC0D',
        200: '#6CF20C'
      },
      'cinza': {
        100: '#EDF0F5',
        200: '#A3A5A8',
        300: '#58595B',
        400: '#7183A8',
        500: '#4F5B75',
        600: '#111827',
        700: '#2A353D',
        800: '#2D3945',
        900: '#231F20'
      },
    },
    extend: {
      height: {
        '100': '29rem',
        '120': '35rem',
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    }
  },
  plugins: [],
}