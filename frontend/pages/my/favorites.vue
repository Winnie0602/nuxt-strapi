<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

definePageMeta({
  middleware: 'auth',
})

// length === 1 -> 有用戶喜愛單字資料
// length === 0 用戶沒有喜愛單字資料
const { data } = useFetch<Vocabulary[]>('/api/favorites')
</script>

<template>
  <div
    class="flex w-[100vw] space-x-4 px-4 md:w-[calc(100vw-32px)] xl:w-[1280px] xl:space-x-8"
  >
    <VocabulariesList :vocabularies="data || []" :my-favorites="data || []" />
  </div>
</template>
