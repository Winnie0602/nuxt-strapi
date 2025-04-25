// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@vee-validate/nuxt',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-socket-io',
  ],

  io: {
    sockets: [
      {
        name: 'main', // 前端使用的 socket 名稱
        url: 'http://localhost:1337', // 後端 WebSocket 伺服器的網址
        default: true,
      },
    ],
  },

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,

    public: {
      backendUrl: process.env.STRAPI_BASE_URL,
      strapiBaseUrl: process.env.STRAPI_BASE_URL
        ? `${process.env.STRAPI_BASE_URL}/api`
        : 'http://localhost:1337/api',
    },
  },

  routeRules: {
    // 轉址
    '/learning': { redirect: '/learning/vocabulary' },
  },

  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons',
      },
    ],
  },

  colorMode: {
    preference: 'light',
  },

  imports: {
    imports: [
      {
        from: 'tailwind-variants',
        name: 'tv',
      },
      {
        from: 'tailwind-variants',
        name: 'VariantProps',
        type: true,
      },
    ],
  },
})
