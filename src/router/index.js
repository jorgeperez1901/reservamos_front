import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Cities from '../views/Cities.vue'
import CityDetail from '../views/CityDetail.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/cities',
    component: Cities,
    meta: { requiresAuth: true },
  },
  {
    path: '/city/:lat/:lon',
    component: CityDetail,
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }
})

export default router
