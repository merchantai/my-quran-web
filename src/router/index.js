import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const ROUTER = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {top: 0}
  }
});

export default ROUTER