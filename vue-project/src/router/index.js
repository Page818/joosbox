import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../pages/index.vue'
import AdminLogin from '@/pages/AdminLogin.vue'
import AdminView from '../pages/AdminView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index,
  },
  {
    path: '/admin/login',
    component: AdminLogin,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true }, // ✅ 加這行就能被守衛攔截
  },
]

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
})

// 全域守衛：檢查 JWT 是否存在
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken')
  if (to.meta.requiresAuth && !token) {
    alert('請先登入管理員帳號')
    next('/admin/login')
  } else {
    next()
  }
})

export default router
