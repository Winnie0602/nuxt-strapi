import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const config = useRuntimeConfig()
  if (session) {
    return await $fetch(`${config.strapiBaseUrl}/vocabularies`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
    })
  }
})
