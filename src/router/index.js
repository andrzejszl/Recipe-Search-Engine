import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SearchPage from '../pages/SearchPage.vue'
// import MyAccount from '../pages/MyAccount.vue'
import RecipeDetails from '../pages/RecipeDetails.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomePage },
  { path: '/search', component: SearchPage },
  { path: '/search/:id', component: RecipeDetails, props: true },
  // { path: '/account', component: MyAccount }, //to be added
  { path: '/wrong', component: NotFound },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
