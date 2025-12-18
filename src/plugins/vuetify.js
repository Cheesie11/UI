import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#ffffffff',
          surface: '#ffffff',
          primary: '#dab6fc',
          'primary-darken-1': '#b786e8',
          'primary-lighten-1': '#f1e4ff',
          secondary: '#b48cfc',
          accent: '#7b4397',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#140920',
          surface: '#1e0f2e',
          primary: '#caa0ff',
          'primary-darken-1': '#a66de3',
          'primary-lighten-1': '#e7cdff',
          secondary: '#8c5dd8',
          accent: '#f1e4ff',
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
