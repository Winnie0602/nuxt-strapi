<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

type Favorites = {
  documentId: string
  vocabularies: Vocabulary[]
}

const props = defineProps<{
  myFavorites: Favorites
  documentId: string
  item: Vocabulary
}>()

const hasFavoriteRecord = computed(() => {
  return props.myFavorites && props.myFavorites.vocabularies.length > 0
})

const handleFavorite = async (nowId: string) => {
  if (hasFavoriteRecord.value && props.myFavorites) {
    // 資料庫用戶有喜愛的單字 -> PUT
    const vocabulariesList = props.myFavorites.vocabularies.map(
      (e) => e.documentId,
    )
    try {
      await $fetch('/api/favorites', {
        method: 'PUT',
        body: {
          documentId: props.myFavorites?.documentId,
          vocabulariesList: [...vocabulariesList, nowId],
        },
      })
    } catch (e) {
      console.log('something wrong')
    }
  } else {
    console.log()
  }
}
</script>

<template>
  <button class="btn btn-ghost btn-xs" @click="handleFavorite(item.documentId)">
    <Icon
      v-if="myFavorites.vocabularies.find((e) => e.documentId === documentId)"
      name="icon:heart-full"
      mode="svg"
      class="h-4 w-4 fill-red-600"
    />
    <Icon v-else name="icon:heart-empty" mode="svg" class="h-4 w-4" />
  </button>
</template>
