/**
 * favorite controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::favorite.favorite', ({ strapi }) => ({
  async find(ctx) {
    // 從 JWT 中取得當前用戶的 ID
    const userId = ctx.state.user?.id

    if (!userId) {
      return ctx.unauthorized('You must be logged in to access this data.')
    }

    // 查詢當前用戶的喜愛清單
    const userFavorites = await strapi.entityService.findMany('api::favorite.favorite', {
      filters: { user: { id: userId } }, // 僅篩選當前用戶
      populate: '*', // 根據需求決定是否加載關聯數據
    })

    return userFavorites
  },

  async create(ctx) {
    const { user } = ctx.request.body.data

    // 驗證是否已存在相同的 user
    const existingFavorite = await strapi.entityService.findMany('api::favorite.favorite', {
      filters: { user: user },
    })

    if (existingFavorite.length > 0) {
      return ctx.badRequest('This user already has a favorite record.')
    }

    // 如果沒有重複記錄，正常創建
    const response = await super.create(ctx)
    return response
  },
}))
