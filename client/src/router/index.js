import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

Vue.use(VueRouter)

const AuthGuard = (to, from, next) => {
  if (!store.getters.currentUser) {
    return next({
      path: '/'
    });
  }
  next();
}

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
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/PageProfile'),
    beforeEnter: AuthGuard
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
  mode: 'history',
  routes
})

export default router
