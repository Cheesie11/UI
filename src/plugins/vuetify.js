import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#ffffff',
          surface: '#ffffff',
          primary: '#7a5af8',
          'primary-darken-1': '#5f3fe6',
          'primary-lighten-1': '#b7a7ff',
          secondary: '#2bbac7',
          accent: '#ffd6a5',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#111217',
          surface: '#1b1d25',
          primary: '#9f8cff',
          'primary-darken-1': '#7a5af8',
          'primary-lighten-1': '#cfc7ff',
          secondary: '#5ad1e9',
          accent: '#f6c177',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
