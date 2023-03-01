export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.APP_NAME || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'The number one source for accurate drug treatment center information. Find a local addiction detox or rehab center to treat drug addiction or alcoholism now.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://www.printableparadise.com/letters/printable-letter-r-outline.png' }]
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: '~/plugins/gtm.js', mode: 'client' }],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: {
    dirs:[
      '~/components',
      '~/components/photos',
      '~/components/listing',
      '~/components/comments',
      '~/components/auth',
    ]
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    //    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: 'G-K91VK8XMV9'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt/content
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap',
    '@nuxtjs/auth'
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://topratedrehabs.com'
  },
  gtm: {
    id: 'GTM-MSDV7SS',
    enabled: true,
    pageTracking: false,
    pageViewEventName: 'nuxtRoute',
    autoInit: true,
    scriptId: 'gtm-script',
    scriptDefer: false,
    crossOrigin: false
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    },
    nestedProperties: ['author.name']
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: 'api/login', method: 'POST', propertyName: 'token'},
          user: {url: 'api/me', method: 'GET', propertyName: 'user'},
          logout: false
        },
      }
    },
    redirect: false
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
}
