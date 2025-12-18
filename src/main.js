import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import './assets/styles/global.css'

createApp(App).use(vuetify).mount("#app");
