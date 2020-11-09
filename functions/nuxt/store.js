import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('..\\store\\index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('..\\store\\Category\\actions.js'), 'Category/actions.js')
  resolveStoreModules(require('..\\store\\Category\\getters.js'), 'Category/getters.js')
  resolveStoreModules(require('..\\store\\Category\\mutations.js'), 'Category/mutations.js')
  resolveStoreModules(require('..\\store\\Category\\state.js'), 'Category/state.js')
  resolveStoreModules(require('..\\store\\Customer\\actions.js'), 'Customer/actions.js')
  resolveStoreModules(require('..\\store\\Customer\\mutations.js'), 'Customer/mutations.js')
  resolveStoreModules(require('..\\store\\Customer\\state.js'), 'Customer/state.js')
  resolveStoreModules(require('..\\store\\LogIn\\actions.js'), 'LogIn/actions.js')
  resolveStoreModules(require('..\\store\\LogIn\\mutations.js'), 'LogIn/mutations.js')
  resolveStoreModules(require('..\\store\\LogIn\\state.js'), 'LogIn/state.js')
  resolveStoreModules(require('..\\store\\LogOut\\actions.js'), 'LogOut/actions.js')
  resolveStoreModules(require('..\\store\\Order\\actions.js'), 'Order/actions.js')
  resolveStoreModules(require('..\\store\\Order\\mutations.js'), 'Order/mutations.js')
  resolveStoreModules(require('..\\store\\Order\\state.js'), 'Order/state.js')
  resolveStoreModules(require('..\\store\\Product\\actions.js'), 'Product/actions.js')
  resolveStoreModules(require('..\\store\\Product\\mutations.js'), 'Product/mutations.js')
  resolveStoreModules(require('..\\store\\Product\\state.js'), 'Product/state.js')
  resolveStoreModules(require('..\\store\\Profile\\actions.js'), 'Profile/actions.js')
  resolveStoreModules(require('..\\store\\Profile\\mutations.js'), 'Profile/mutations.js')
  resolveStoreModules(require('..\\store\\Profile\\state.js'), 'Profile/state.js')
  resolveStoreModules(require('..\\store\\SignUp\\actions.js'), 'SignUp/actions.js')
  resolveStoreModules(require('..\\store\\SignUp\\mutations.js'), 'SignUp/mutations.js')
  resolveStoreModules(require('..\\store\\SignUp\\state.js'), 'SignUp/state.js')

  // If the environment supports hot reloading...
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
