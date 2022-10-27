import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/satpam/dashboard.vue')
  },
  {
    path: '/tamu',
    name: 'tamu',
    component: () => import(/* webpackChunkName: "tamu" */ '../views/satpam/tamu.vue')
  },
  {
    path: '/bukutamu',
    name: 'Buku Tamu',
    component: () => import(/* webpackChunkName: "tamu" */ '../views/satpam/buku-tamu.vue')
  },
  {
    path: '/tambah-bukutamu',
    name: 'tambah-bukutamu',
    component: () => import(/* webpackChunkName: "tamu" */ '../views/satpam/tambah-bukutamu.vue')
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    component: () => import(/* webpackChunkName: "tamu" */ '../views/satpam/sidebar.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
