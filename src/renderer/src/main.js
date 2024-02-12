import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import initI18n from './i18n';

const app = createApp(App);
app.use(router).use(initI18n({ locale: 'zhCN' }));
app.mount('#app');
