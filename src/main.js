import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createVuetify } from 'vuetify'

const vuetify = createVuetify()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vuetify)

app.mount('#app')
