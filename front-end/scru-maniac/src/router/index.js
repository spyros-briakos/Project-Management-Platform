import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Prices from '../views/Prices.vue'
import How_it_works from '../views/How_it_works.vue'
import Signin from '../views/Signin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/how_it_works',
    name: 'How it works',
    component: How_it_works
  },
  {
    path: '/prices',
    name: 'Prices',
    component: Prices
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
