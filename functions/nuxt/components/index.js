export { default as CompHeader } from '../..\\components\\CompHeader.vue'
export { default as CompHeaderAdmin } from '../..\\components\\CompHeaderAdmin.vue'
export { default as CompSidebar } from '../..\\components\\CompSidebar.vue'
export { default as Logo } from '../..\\components\\Logo.vue'

export const LazyCompHeader = import('../..\\components\\CompHeader.vue' /* webpackChunkName: "components_CompHeader" */).then(c => c.default || c)
export const LazyCompHeaderAdmin = import('../..\\components\\CompHeaderAdmin.vue' /* webpackChunkName: "components_CompHeaderAdmin" */).then(c => c.default || c)
export const LazyCompSidebar = import('../..\\components\\CompSidebar.vue' /* webpackChunkName: "components_CompSidebar" */).then(c => c.default || c)
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components_Logo" */).then(c => c.default || c)
