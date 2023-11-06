import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueChartkick)

app.mount('#app')
