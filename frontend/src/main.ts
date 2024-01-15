import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from "@/stores/authStore";
import { createI18n } from "vue-i18n";
import ptBR from "@/i18n/pt-BR";
import enUS from "@/i18n/en-US";

const i18n = createI18n({
  legacy: false,
  locale: 'pt-br',
  messages: {
    'pt-br': ptBR,
    'en-us': enUS
  }
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

const authStore = useAuthStore();
authStore.init();

app.mount('#app')
