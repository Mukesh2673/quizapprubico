import { createApp } from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueToast from 'vue-toast-notification';

import router from './router'

import App from './App.vue'

createApp(App).use(router).use(VueToast).mount('#app')
