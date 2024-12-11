<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

const { data: vocabularies } = await useFetch<{ data: Vocabulary[] }>(
  '/api/vocabularies',
)

type Favorites = {
  documentId: string
  vocabularies: Vocabulary[]
}

const { data: myFavorites, error } = await useFetch<Favorites>('/api/favorites')

if (error.value?.statusCode === 401) {
  console.log('token error')
}

if (error.value?.statusCode === 403) {
  console.log('you dont have record in DB')
}

</script>

<template>
  <div
    class="flex w-[100vw] space-x-4 px-4 md:w-[calc(100vw-32px)] xl:w-[1280px] xl:space-x-8"
  >
    <LearningMenu />
    
    <VocabulariesList
      :vocabularies="vocabularies?.data || []"
      :my-favorites="
        myFavorites || {
          documentId: '',
          vocabularies: [],
        }
      "
    />
  </div>
</template>
