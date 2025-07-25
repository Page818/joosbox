import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import Admin from '../pages/admin.vue'

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
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
