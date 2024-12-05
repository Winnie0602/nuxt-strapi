import { getServerSession } from '#auth'
import type { Vocabulary } from '~/types/type'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const config = useRuntimeConfig()
  if (session) {
    const result = await $fetch<{ favorites: Vocabulary[] }>(
      `${config.strapiBaseUrl}/users/me?populate=favorites`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
      },
    )
    return result.favorites.filter(e => e.publishedAt !== null)
  }
})
