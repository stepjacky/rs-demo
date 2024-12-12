import { createApp } from 'vue';
import App from './App.vue';
import TinyVue from '@opentiny/vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import { router } from './router/index.ts';
import initI18n from './i18n'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import './index.css';

createApp(App)
    .use(router)
    .use(TinyVue)
    .use(ToastService)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .use(initI18n({ local: 'zhCN' }))
    .mount('#root');
