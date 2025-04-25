import { getServerSession } from '#auth'
import type { Vocabulary } from '~/types/type'

type Data = {
  vocabularies: Vocabulary[]
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const body = await readBody(event)

  const config = useRuntimeConfig()
  if (session) {
    await $fetch<Data[]>(`${config.public.strapiBaseUrl}/favorites`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
      body: {
        data: {
          user: session.user.id,
          vocabularies: body.vocabulary,
        },
      },
    })
  }
})

// 錯誤格式
// {
//   "data": null,
//   "error": {
//       "status": 400,
//       "name": "BadRequestError",
//       "message": "This user already has a favorite record.",
//       "details": {}
//   }
// }
