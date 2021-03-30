import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Prices from '../views/Prices.vue'
import How_it_works from '../views/How_it_works.vue'

import SignIn from '../views/Sign/SignIn.vue'
import SignUp from '../views/Sign/SignUp.vue'
import ForgotPassword from '../views/Sign/ForgotPassword.vue'

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
    path: '/sign/in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign/up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/sign/forgot',
    name: 'ForgotPassword',
    component: ForgotPassword
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
