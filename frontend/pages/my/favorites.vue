<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

definePageMeta({
  middleware: 'auth',
})

// 列出我的帳號底下的喜歡的單字
// 權限
const { data } = useFetch<Vocabulary[]>('/api/favorites')
</script>

<template>
  <div
    class="flex w-[100vw] space-x-4 px-4 md:w-[calc(100vw-32px)] xl:w-[1280px] xl:space-x-8"
  >
    <VocabulariesList :vocabularies="data || []" />
  </div>
</template>
