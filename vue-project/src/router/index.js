import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import Admin from '../pages/admin.vue'
import AdminBraceletUploader from '@/pages/AdminBraceletUploader.vue'
import AdminTopImageUploader from '@/pages/AdminTopImageUploader.vue'

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
    path: '/admin/showcard',
    name: 'AdminBraceletUploader',
    component: AdminBraceletUploader,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admin/topimage',
    name: 'AdminTopImageUploader',
    component: AdminTopImageUploader,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
