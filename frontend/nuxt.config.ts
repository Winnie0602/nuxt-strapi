// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/strapi',
    '@nuxt/icon',
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/fonts",
    "@vee-validate/nuxt"
  ],

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
  },

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true
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
    authSecret: process.env.AUTH_SECRET,
    strapiBaseUrl: process.env.STRAPI_BASE_URL,
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

  colorMode: {
    classSuffix: ""
  },

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv"
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true
    }]
  }
})