import { getServerSession } from '#auth'
import type { Vocabulary } from '~/types/type'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const query = getQuery(event)

  const config = useRuntimeConfig()

  const url =
    Object.keys(query).length > 0
      ? `${config.strapiBaseUrl}/vocabularies?pagination[page]=${query.page}&pagination[pageSize]=${query.size}`
      : `${config.strapiBaseUrl}/vocabularies`

  return await $fetch<{ data: Vocabulary[] }>(url, {
    method: 'GET',
    headers: {
      Authorization: session ? `Bearer ${session.user.jwt}` : '',
    },
  })
})
