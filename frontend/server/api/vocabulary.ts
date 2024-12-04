import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const config = useRuntimeConfig()

  const body = await readBody(event)

  if (session) {
    const result = await $fetch(
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
