<script setup lang="ts">
import type { Vocabulary } from '~/types/type'
import showToast from '~/utils/showToast'

const props = defineProps<{
  vocabulary: Vocabulary
  index: number
}>()

const emits = defineEmits(['answerCompleted'])

// 定義 UiInput 的型別
type UiInputInstance = {
  inputRef: HTMLInputElement // UiInput 組件內部的 <input> 元素引用
}

// 定義 inputRefs 的型別
const inputRefs = ref<(UiInputInstance | null)[]>([])

const answer = props.vocabulary.full_reading.split('')

const inputVal = ref<string[]>(new Array(answer.length).fill(''))

const enter = (index: number) => {
  // 檢查當前輸入是否是日文字
  const currentInput = inputVal.value[index]

  if (!currentInput) return

  const isJapaneseChar = /^[ぁ-んァ-ンー一-龯]+$/.test(currentInput) // 檢查是否為日文字

  if (isJapaneseChar) {
    const nextInput = inputRefs.value[index]?.inputRef

    if (nextInput) {
      nextInput.focus()
    } else {
      // spell finished
      const cleanInput = inputVal.value.filter((char) => char !== '')

      const isCorrect =
        cleanInput.length === answer.length &&
        cleanInput.every((char, index) => char === answer[index])

      emits('answerCompleted', isCorrect ? 'correct' : 'failed')
    }
  } else {
    showToast('請輸入日文字', '日本語の文字を入力してください')
  }
}
</script>

<template>
  <div class="embla__slide flex-[0_0_80vw] md:flex-[0_0_500px]">
    <UiCard class="w-[calc(80vw-10px)] max-w-md bg-purple-100 md:w-[500px]">
      <template #content>
        <UiCardContent>
          <div>
            <!-- 單字／聲音 -->
            <div class="flex items-center">
              <div class="text-4xl">
                {{ index + 1 }}. {{ vocabulary.full_word_jp }}
              </div>
              <VoiceSpeak :word="vocabulary.full_reading" :index="index" />
            </div>
            <!-- {{ vocabulary.full_reading }} -->
            <UiSeparator class="my-4" />
          </div>
        </UiCardContent>
      </template>
      <template #footer>
        <UiCardFooter class="flex justify-between">
          <div class="flex space-x-2">
            <UiInput
              v-for="i in vocabulary.full_reading.length"
              :key="i"
              ref="inputRefs"
              v-model="inputVal[i]"
              type="text"
              class="h-10 w-10"
              @keydown.enter="enter(i)"
            />
          </div>
        </UiCardFooter>
      </template>
    </UiCard>
  </div>
</template>

<style lang="postcss" scoped>
.embla__slide {
  min-width: 0;
}
</style>
