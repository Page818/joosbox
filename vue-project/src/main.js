import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  // theme: {
  //   themes: {
  //     light: {
  //       colors: {
  //         primary: '#FFD700', // 金色，適合首飾網站
  //         secondary: '#FFFFFF',
  //       },
  //     },
  //   },
  // },
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
