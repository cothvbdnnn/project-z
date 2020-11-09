import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _72f1f58c = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _b2f43a2a = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _b3ec9880 = () => interopDefault(import('..\\pages\\check-out\\index.vue' /* webpackChunkName: "pages/check-out/index" */))
const _090664e0 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _f2053d56 = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _960822c4 = () => interopDefault(import('..\\pages\\sign-up\\index.vue' /* webpackChunkName: "pages/sign-up/index" */))
const _16cd421e = () => interopDefault(import('..\\pages\\admin\\categories\\index.vue' /* webpackChunkName: "pages/admin/categories/index" */))
const _41a52ea5 = () => interopDefault(import('..\\pages\\admin\\customers\\index.vue' /* webpackChunkName: "pages/admin/customers/index" */))
const _79ac65b5 = () => interopDefault(import('..\\pages\\admin\\orders\\index.vue' /* webpackChunkName: "pages/admin/orders/index" */))
const _2bd6cdd6 = () => interopDefault(import('..\\pages\\admin\\products\\index.vue' /* webpackChunkName: "pages/admin/products/index" */))
const _6a6b5e5e = () => interopDefault(import('..\\pages\\admin\\profile\\index.vue' /* webpackChunkName: "pages/admin/profile/index" */))
const _10622075 = () => interopDefault(import('..\\pages\\admin\\categories\\add\\index.vue' /* webpackChunkName: "pages/admin/categories/add/index" */))
const _249327bd = () => interopDefault(import('..\\pages\\admin\\products\\add\\index.vue' /* webpackChunkName: "pages/admin/products/add/index" */))
const _2a0d0f4c = () => interopDefault(import('..\\pages\\admin\\categories\\edit\\_categoryId.vue' /* webpackChunkName: "pages/admin/categories/edit/_categoryId" */))
const _b682ebf4 = () => interopDefault(import('..\\pages\\admin\\customers\\view\\_customerId.vue' /* webpackChunkName: "pages/admin/customers/view/_customerId" */))
const _24207a81 = () => interopDefault(import('..\\pages\\admin\\orders\\edit\\_orderId.vue' /* webpackChunkName: "pages/admin/orders/edit/_orderId" */))
const _1ba8d4a1 = () => interopDefault(import('..\\pages\\admin\\products\\edit\\_productId.vue' /* webpackChunkName: "pages/admin/products/edit/_productId" */))
const _bc921c10 = () => interopDefault(import('..\\pages\\shop\\_productId.vue' /* webpackChunkName: "pages/shop/_productId" */))
const _7c7e4b6a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _72f1f58c,
    name: "admin"
  }, {
    path: "/cart",
    component: _b2f43a2a,
    name: "cart"
  }, {
    path: "/check-out",
    component: _b3ec9880,
    name: "check-out"
  }, {
    path: "/login",
    component: _090664e0,
    name: "login"
  }, {
    path: "/shop",
    component: _f2053d56,
    name: "shop"
  }, {
    path: "/sign-up",
    component: _960822c4,
    name: "sign-up"
  }, {
    path: "/admin/categories",
    component: _16cd421e,
    name: "admin-categories"
  }, {
    path: "/admin/customers",
    component: _41a52ea5,
    name: "admin-customers"
  }, {
    path: "/admin/orders",
    component: _79ac65b5,
    name: "admin-orders"
  }, {
    path: "/admin/products",
    component: _2bd6cdd6,
    name: "admin-products"
  }, {
    path: "/admin/profile",
    component: _6a6b5e5e,
    name: "admin-profile"
  }, {
    path: "/admin/categories/add",
    component: _10622075,
    name: "admin-categories-add"
  }, {
    path: "/admin/products/add",
    component: _249327bd,
    name: "admin-products-add"
  }, {
    path: "/admin/categories/edit/:categoryId?",
    component: _2a0d0f4c,
    name: "admin-categories-edit-categoryId"
  }, {
    path: "/admin/customers/view/:customerId?",
    component: _b682ebf4,
    name: "admin-customers-view-customerId"
  }, {
    path: "/admin/orders/edit/:orderId?",
    component: _24207a81,
    name: "admin-orders-edit-orderId"
  }, {
    path: "/admin/products/edit/:productId?",
    component: _1ba8d4a1,
    name: "admin-products-edit-productId"
  }, {
    path: "/shop/:productId",
    component: _bc921c10,
    name: "shop-productId"
  }, {
    path: "/",
    component: _7c7e4b6a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
