// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  auth: {
    baseURL: process.env.STRAPI_URL,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@vee-validate/nuxt',
    '@samk-dev/nuxt-vcalendar',
  ],

  // strapi: {
  //   url: process.env.STRAPI_URL || 'http://localhost:1337',
  // },

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
  },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    strapiBaseUrl: process.env.STRAPI_BASE_URL || 'http://localhost:1337/api',
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
