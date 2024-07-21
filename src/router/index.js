import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import Basket from '../views/ShoppingBasket.vue'
import ProductManagement from '../components/ProductManagement.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  },
  {
    path: '/products',
    name: 'ProductManagement',
    component: ProductManagement
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
