import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/module1/',
    name: 'Home',
    component: Home
  },
  {
    path: '/module1/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

console.log(window)
const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes
})

export default router
