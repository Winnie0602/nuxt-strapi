// strapi-backend-project/config/middleware.ts
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000', // 本地开发时允许的前端请求地址
        'https://nuxt-strapi-7ztr.onrender.com', // 你部署在 Render 上的 Strapi 地址,
        'https://learning-app-frontend-wsdp.onrender.com', // 你部署在 Render 上的 前端專案 地址,
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的 HTTP 请求方法
      allowedHeaders: ['Content-Type', 'Authorization'], // 允许的头部信息
      credentials: true, // 允许发送凭证（比如 cookies）
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
