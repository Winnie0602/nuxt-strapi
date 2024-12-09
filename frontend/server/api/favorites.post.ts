import { getServerSession } from '#auth'
import type { Vocabulary } from '~/types/type'

type Data = {
  vocabularies: Vocabulary[]
}


// favorite表沒有該用戶資料時 -> POST
// 1. 先GET 有用戶favorite表資料 -> 抓目前用戶存的所有單字ID -> PUT
// 2.       沒用戶資料 -> POST
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const body = await readBody(event)

  const config = useRuntimeConfig()
  if (session) {
    const result = await $fetch<Data[]>(`${config.strapiBaseUrl}/favorites`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
      body: {
        "data": {
          "user": session.user.id,
          "vocabularies": [13]
        }
      }
    })
    return result
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
