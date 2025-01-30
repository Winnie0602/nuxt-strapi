<script setup lang="ts">
import type { Vocabulary } from '~/types/type'
import showToast from '~/utils/showToast'

const props = defineProps<{
  vocabulary: Vocabulary
  index: number
}>()

const emits = defineEmits(['scrollNext'])

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

      if (isCorrect) {
        emits('scrollNext', 'correct')
      }
    }
  } else {
    showToast('請輸入日文字', '日本語の文字を入力してください')
  }
}
</script>

<template>
  <div class="embla__slide">
    <UiCard class="w-[500px] max-w-md bg-purple-100">
      <template #content>
        <UiCardContent>
          <div>
            <!-- 單字／聲音 -->
            <div class="flex items-center">
              <div class="text-4xl">{{ vocabulary.full_word_jp }}</div>
              <VoiceSpeak :word="vocabulary.full_reading" :index="index" />
            </div>
            {{ vocabulary.full_reading }}
            <UiSeparator class="my-4" />
          </div>
        </UiCardContent>
      </template>
      <template #footer>
        <UiCardFooter class="flex justify-between">
          <div class="flex space-x-2">
            <UiInput
              v-for="index in vocabulary.full_reading.length"
              :key="index"
              ref="inputRefs"
              v-model="inputVal[index]"
              type="text"
              class="h-10 w-10"
              @keydown.enter="enter(index)"
            />
          </div>
        </UiCardFooter>
      </template>
    </UiCard>
  </div>
</template>
