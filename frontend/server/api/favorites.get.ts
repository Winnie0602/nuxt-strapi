import { getServerSession } from '#auth'
import type { Vocabulary } from '~/types/type'

type Data = { documentId: string; vocabularies: Vocabulary[] }

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const config = useRuntimeConfig()
  if (session) {
    const result = await $fetch<Data[]>(
      `${config.public.strapiBaseUrl}/favorites`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
      },
    )

    return {
      documentId: result.length > 0 ? result[0].documentId : '',
      vocabularies: result.length > 0 ? result[0].vocabularies : [],
    }
  }
  return {
    documentId: '',
    vocabularies: [],
  }
})
