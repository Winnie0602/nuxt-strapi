<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

definePageMeta({
  middleware: 'auth',
})

// 列出我的帳號底下的喜歡的單字
// 權限
const { data } = useFetch<{ data: { favorites: Vocabulary[] } }>(
  '/api/vocabularies',
)
</script>

<template>
  <div>{{ data }}</div>
</template>
