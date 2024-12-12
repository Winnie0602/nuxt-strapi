<script setup lang="ts">
import type { Vocabulary } from '~/types/type'
import showToast from '~/utils/showToast'

const { status } = useAuth()

const props = defineProps<{
  myFavorites: {
    documentId: string
    vocabularies: Vocabulary[]
  }
  documentId: string
  item: Vocabulary
}>()

const emit = defineEmits(['refresh'])

const hasFavoriteRecord = ref(
  props.myFavorites && props.myFavorites.documentId !== '',
)

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
      const arr = []
      const toast = {
        title: '',
        description: '',
      }
      if (isLiked.value) {
        arr.push(vocabulariesList.filter((e) => e !== nowId))
        toast.title = '移除收藏成功'
        toast.description = 'お気に入りを解除しました'
      } else {
        arr.push(vocabulariesList.filter((e) => e !== nowId))
        toast.title = '新增收藏成功'
        toast.description = 'データの追加に成功しました'
      }

      await $fetch('/api/favorites', {
        method: 'PUT',
        body: {
          documentId: props.myFavorites?.documentId,
          vocabulariesList: arr,
        },
      })

      isLiked.value = !isLiked.value

      showToast(toast.title, toast.description)
    } catch (e) {
      console.log(e)
      showToast('新增失敗', 'データの追加に失敗しました')
    }
  } else {
    // 資料庫用戶沒喜愛的單字 -> POST
    try {
      await $fetch('/api/favorites', {
        method: 'POST',
        body: {
          vocabulary: [nowId],
        },
      })

      isLiked.value = !isLiked.value

      showToast('新增收藏成功', 'データの追加に成功しました')

      hasFavoriteRecord.value = true

      emit('refresh')
    } catch (e) {
      console.log(e)

      showToast('新增失敗', 'データの追加に失敗しました')
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
