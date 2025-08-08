import { createApp } from 'vue'

import App from './App.vue'
import 'primeicons/primeicons.css';
import './input.css';
import { router } from './router';
import PrimeVue from 'primevue/config';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.mount('#app');
