<script setup lang="ts">
const { word } = defineProps<{ word: string }>()

const isReading = ref(false)

const speak = (word: string) => {
  const utterThis = new SpeechSynthesisUtterance(word)

  // 結束事件
  utterThis.onend = () => {
    isReading.value = false
  }

  // 設定語言
  utterThis.lang = 'ja-JP'

  // 設定語速
  utterThis.rate = 0.5

  // 開始播放
  window.speechSynthesis.speak(utterThis)

  // 說話時話筒亮燈
  if (window.speechSynthesis.speaking) {
    isReading.value = true
  }
}
</script>

<template>
  <div class="flex">
    <button class="ml-2" @click="speak(word)">
      <Icon
        mode="svg"
        name="icon:volume-on"
        class="h-[18px] w-[18px]"
        :class="isReading ? 'fill-red-500' : 'fill-gray-500'"
      />
    </button>
  </div>
</template>
