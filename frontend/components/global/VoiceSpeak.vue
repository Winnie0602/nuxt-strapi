<script setup lang="ts">
import { speak } from '~/utils/speak'
import { inject } from 'vue'

const props = defineProps<{ word: string; index?: number; lang?: string }>()
const currentReadingIndex = inject<Ref<number | null>>(
  'currentReadingIndex',
  ref(null),
)

const playWord = () => {
  currentReadingIndex.value = props.index ?? 0

  speak(
    props.word,
    () => {
      currentReadingIndex.value = null
    },
    props.lang,
  )
}

// 暴露方法給外面用
defineExpose({ playWord })
</script>

<template>
  <div class="flex">
    <button class="ml-2" @click="playWord">
      <Icon
        mode="svg"
        name="icon:volume-on"
        class="h-[18px] w-[18px]"
        :class="
          currentReadingIndex === index ? 'fill-red-500' : 'fill-gray-500'
        "
      />
    </button>
  </div>
</template>
