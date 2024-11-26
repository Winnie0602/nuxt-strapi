// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxtjs/strapi', '@nuxt/icon', '@nuxt/ui'],

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
  },

  tailwindcss: {
    // https://tailwindcss.nuxtjs.org/getting-started/configuration
    editorSupport: true,
  },

  runtimeConfig: {
    strapi: {
      url: process.env.STRAPI_URL,
    },
    public: {
      strapi: {
        url: process.env.STRAPI_URL,
      },
    },
  },

  routeRules: {
    // 轉址
    '/learning': { redirect: '/learning/vocabularies' },
  },

  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons',
      },
    ],
  },
})
