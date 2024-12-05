<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

const { data: vocabularies } = useFetch<{ data: Vocabulary[] }>(
  '/api/vocabularies',
)

const { data: myFavorites } = useFetch<Vocabulary[]>('/api/favorites')
</script>

<template>
  <div
    class="flex w-[100vw] space-x-4 px-4 md:w-[calc(100vw-32px)] xl:w-[1280px] xl:space-x-8"
  >
    <LearningMenu />
    <VocabulariesList
      :vocabularies="vocabularies?.data || []"
      :my-favorites="myFavorites || []"
    />
  </div>
</template>
