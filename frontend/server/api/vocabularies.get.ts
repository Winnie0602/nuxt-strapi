import { getServerSession } from '#auth'
import type { Vocabulary } from '~/types/type'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const config = useRuntimeConfig()

  return await $fetch<{ data: Vocabulary[] }>(
    `${config.strapiBaseUrl}/vocabularies`,
    {
      method: 'GET',
      headers: {
        Authorization: session ? `Bearer ${session.user.jwt}` : '',
      },
    },
  )
})
