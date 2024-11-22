// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxtjs/strapi'],

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    version: 'v4',
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
})
