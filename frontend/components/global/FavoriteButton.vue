<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

const { status } = useAuth()

const props = defineProps<{
  myFavorites: {
    documentId: string
    vocabularies: Vocabulary[]
  }
  documentId: string
  item: Vocabulary
}>()

const hasFavoriteRecord = computed(() => {
  return props.myFavorites && props.myFavorites.documentId !== ''
})

const isLiked = ref(
  !!props.myFavorites.vocabularies.find(
    (e) => e.documentId === props.documentId,
  ),
)

const handleFavorite = async (nowId: string) => {
  if (status.value === 'unauthenticated') {
    alert('you should loggin')

    return
  }
  if (hasFavoriteRecord.value) {
    // 資料庫用戶有喜愛的單字 -> PUT
    const vocabulariesList = props.myFavorites.vocabularies.map(
      (e) => e.documentId,
    )
    try {
      await $fetch('/api/favorites', {
        method: 'PUT',
        body: {
          documentId: props.myFavorites?.documentId,
          vocabulariesList: isLiked.value
            ? vocabulariesList.filter((e) => e !== nowId)
            : [...vocabulariesList, nowId],
        },
      })

      isLiked.value = !isLiked.value
    } catch (e) {
      console.log('something wrong')
    }
  } else {
    // 資料庫用戶沒喜愛的單字 -> PUT
    try {
      await $fetch('/api/favorites', {
        method: 'POST',
        body: {
          vocabulary: [nowId],
        },
      })

      isLiked.value = !isLiked.value
    } catch (e) {
      console.log('something wrong')
    }
  }
}
</script>

<template>
  <button class="btn btn-ghost btn-xs" @click="handleFavorite(item.documentId)">
    <Icon
      v-if="isLiked"
      name="icon:heart-full"
      mode="svg"
      class="h-4 w-4 fill-red-600"
    />
    <Icon v-else name="icon:heart-empty" mode="svg" class="h-4 w-4" />
  </button>
</template>
