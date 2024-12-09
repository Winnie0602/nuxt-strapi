import { getServerSession } from '#auth'
import type { Vocabulary } from '~/types/type'

type Favorites = {
  documentId: string
  vocabularies: Vocabulary[]
}

type Data = { documentId: string; vocabularies: Vocabulary[] }

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const config = useRuntimeConfig()
  if (session) {
    const result = await $fetch<Data[]>(`${config.strapiBaseUrl}/favorites`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
    })

    const favorites: Favorites = {
      documentId: result.length > 0 ? result[0].documentId : '',
      vocabularies: result.length > 0 ? result[0].vocabularies : [],
    }

    return favorites
  }
  return {
    documentId: '',
    vocabularies: [],
  }
})
