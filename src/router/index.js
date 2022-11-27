import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SearchPage from '../pages/SearchPage.vue'
import MyAccount from '../pages/MyAccount.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomePage },
  { path: '/search', component: SearchPage },
  { path: '/account', component: MyAccount },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
