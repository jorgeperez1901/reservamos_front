import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Cities from '../views/Cities.vue'
import CityDetail from '../views/CityDetail.vue'

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
    component: Cities
  },
  {
    path: '/city',
    component: CityDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
