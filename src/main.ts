import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import useAccountManagement from '@/composables/useAccountManagement';

import App from './app.tsx';

const app = createApp(App);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Material
    }
});

useAccountManagement();

app.mount('#app');
