import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import pinia from './store';

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
