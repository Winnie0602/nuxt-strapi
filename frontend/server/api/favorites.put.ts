import { getServerSession } from '#auth'
import type { Vocabulary } from '~/types/type'

type Data = {
  vocabularies: Vocabulary[]
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  // 傳進來favorites的document ID 及 要改寫的單字，須先GET再PUT
  // 週日代辦：串好所有喜愛功能、引入新UI框架、新增pinia 將用戶資訊存進去
  const body = await readBody(event)

  console.log({
    vocabularies: body.vocabulariesList,
  })

  const config = useRuntimeConfig()
  if (session) {
    const result = await $fetch<Data[]>(
      `${config.strapiBaseUrl}/favorites/${body.documentId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
        body: {
          data: {
            vocabularies: body.vocabulariesList,
          },
        },
      },
    )
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
