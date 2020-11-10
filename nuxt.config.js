module.exports = {
    mode: 'universal',
    target: 'server',
    loading: {
        color: '#3c5e2c',
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Project Z',
        meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' }
        ],
        link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~/assets/css/main.scss'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/firebase.js',
        '~/plugins/nuxt-client-init.client.js'
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        // Doc: https://github.com/nuxt-community/stylelint-module
        '@nuxtjs/stylelint-module',
      ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        ['bootstrap-vue/nuxt', {
            icons: true,
        }],
    ],

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    
    router: {
        middleware: [
            'auth',
            'auth-refresh',
        ]
    },
    generate: {
        fallback: "404.html"
    },
    extend(config, ctx) {},
    babel: { compact: true },
    build: {}
}
