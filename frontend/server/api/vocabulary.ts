  import { getServerSession } from '#auth'
import type { Vocabulary } from '~/types/type'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const config = useRuntimeConfig()

  const body = await readBody(event)

  if (session) {
    const result = await $fetch<{ data: Vocabulary }>(
      `${config.strapiBaseUrl}/vocabularies/${body.documentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
      },
    )

    return result.data
  }
})
