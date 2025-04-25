import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const config = useRuntimeConfig()
  if (session) {
    await $fetch(`${config.public.strapiBaseUrl}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
      body: {
        data: {
          content: 'nonon',
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
