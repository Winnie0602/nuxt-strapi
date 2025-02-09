<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

definePageMeta({
  middleware: 'auth',
})

type Favorites = {
  documentId: string
  vocabularies: Vocabulary[]
}

// length === 1 -> 有用戶喜愛單字資料
// length === 0 用戶沒有喜愛單字資料
const { data: myFavorites, error } = await useFetch<Favorites>('/api/favorites')

if (error.value?.statusCode === 401) {
  console.log('token error')
}

if (error.value?.statusCode === 403) {
  console.log('you dont have record in DB')
}
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <div class="mb-5 w-full text-left text-4xl font-bold">
      Favorites List &#128156;&#128153;&#9829;&#128154;
    </div>
    <VocabulariesList :vocabularies="myFavorites?.vocabularies || []" />
  </div>
</template>
