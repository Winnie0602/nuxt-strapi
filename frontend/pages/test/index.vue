<script setup lang="ts">
// 題目設定
const question = ref('くつした') // 例題目
const correctAnswer = ref(['く', 'つ', 'し', 'た']) // 正確答案分解成音節

// 使用者輸入狀態
const userInput = ref(new Array(correctAnswer.value.length).fill(''))
const isComposing = ref(false) // 是否正在使用輸入法

// 計算輸入框數量
const inputBoxes = computed(() => correctAnswer.value.length)

// DOM 參考
const inputs = ref([])

// 方法
const onCompositionStart = () => {
  isComposing.value = true
}

const onCompositionEnd = (index) => {
  console.log(123)
  isComposing.value = false // 完成輸入法操作
  moveToNextBox(index) // 呼叫跳轉方法
}

const moveToNextBox = (index) => {
  console.log(inputs.value[index + 1])
  inputs.value[index + 1].focus() // 跳到下一個輸入框
  if (
    !isComposing.value &&
    userInput.value[index] &&
    index < correctAnswer.value.length - 1
  ) {
    inputs.value[index + 1]?.focus() // 跳到下一個輸入框
  }
}

const submitAnswer = () => {
  if (JSON.stringify(userInput.value) === JSON.stringify(correctAnswer.value)) {
    alert('正確答案！')
  } else {
    alert('答案錯誤，再試一次！')
  }
}
</script>

<template>
  <div
    class="flex h-[calc(100dvh-64px-57px)] w-[100vw] flex-col items-center justify-center"
  >
    <div class="flex w-[800px] justify-center">
      <UiCard class="w-[360px] max-w-sm">
        <template #content>
          <UiCardContent>
            <div>
              <!-- 單字／聲音 -->
              <div class="flex items-end">
                <div class="text-4xl">靴下</div>
                <VoiceSpeak :word="'くつした'" />
              </div>
              <!-- 假名 -->
              <div>
                <div class="text-lg">くつした</div>
              </div>
              <UiSeparator class="my-4" />
            </div>
          </UiCardContent>
        </template>
        <template #footer>
          <UiCardFooter class="flex justify-between">
            <div class="flex space-x-2">
              <UiInput
                v-for="(char, index) in inputBoxes"
                :key="index"
                ref="inputs"
                v-model="userInput[index]"
                :maxlength="1"
                class="h-10 w-10"
                @compositionstart="onCompositionStart"
                @compositionend="onCompositionEnd(index)"
                @keydown.enter="submitAnswer"
              />
            </div>
          </UiCardFooter>
        </template>
      </UiCard>
    </div>
  </div>
</template>

<style scoped>
.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}
</style>
