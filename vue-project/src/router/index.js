import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index,
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Index,
  },
  {
    path: '/about',
    name: 'About',
    component: Index,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
