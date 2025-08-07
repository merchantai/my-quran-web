import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import pinia from './store';
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

createApp(App)
  .use(router)
  .use(pinia)
  .use(Vue3ColorPicker)
  .mount('#app')
