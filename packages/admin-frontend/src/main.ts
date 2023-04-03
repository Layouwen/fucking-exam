import { createApp } from 'vue';
import { sayHello } from '@fucking-exam/utils';

import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';

import { store } from './store';
import router from './router';
import '@/style/index.less';
import './permission';
import App from './App.vue';

const app = createApp(App);

sayHello();

app.use(TDesign);
app.use(store);
app.use(router);

app.mount('#app');
