import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/PageHome'),
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../pages/PageAuth'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../pages/PageAuth'),
  },
  // {
  // path: '/about',
  // name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
