<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import type { Vocabulary } from '~/types/type'
import { speak } from '~/utils/speak'

const [emblaRef, emblaApi] = emblaCarouselVue()

const { data: vocabularies } = await useFetch('/api/vocabularies', {
  transform: (data: { data: Vocabulary[] }) => {
    const filtered = data.data.filter((e) => e.full_word_jp !== e.full_reading)
    return filtered.sort(() => Math.random() - 0.5).slice(0, 5)
  },
})

const score = ref(0)
const show = ref(false)
const showAlertType = ref<'correct' | 'failed'>('correct')
const currentIndex = ref(0) // 目前輪播的索引
const currentReadingIndex = ref<number | null>(null) // 目前播放發音的卡片索引
const showQuestionCards = ref(true) // 是否顯示題目卡

// 提供 isReading 狀態
provide('currentReadingIndex', currentReadingIndex)

// 播放單字並更新 isReading 狀態
const playWord = (index: number, word: string) => {
  currentReadingIndex.value = index
  speak(word, () => {
    currentReadingIndex.value = null // 播放結束後重置
  })
}

// 顯示 alert 1 秒後隱藏
const showAlert = () => {
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 1000)
}

const spellingWrong = ref<string[]>([])

//  滑動到下一張卡片
const answerCompleted = (
  status: 'correct' | 'failed',
  index: number,
  vocabulary: Vocabulary,
) => {
  if (status === 'correct') {
    score.value += 20
    showAlertType.value = 'correct'
  } else {
    spellingWrong.value.push(vocabulary.documentId)
    showAlertType.value = 'failed'
  }

  showAlert()

  if (index < 4) {
    emblaApi.value?.scrollNext() // 觸發輪播到下一張

    setTimeout(() => {
      nextTick(() => {
        const nextCard = document.querySelectorAll('.embla__slide')[index + 1] // 找到下一張卡片
        const firstInput = nextCard?.querySelector('input') // 找到該卡片內第一個 input
        if (firstInput) {
          firstInput.focus() // 讓它獲得焦點
        }
      })
    }, 300) // 延遲 300ms，讓 `embla` 先完成滾動
  } else {
    setTimeout(() => {
      showQuestionCards.value = false
    }, 500)
  }
}

// ** 監聽輪播變化並自動播放發音 **
onMounted(() => {
  if (emblaApi.value) {
    emblaApi.value.on('select', () => {
      const newIndex = emblaApi.value?.selectedScrollSnap() ?? 0
      currentIndex.value = newIndex
      const currentWord = vocabularies.value?.[newIndex]?.full_reading

      if (currentWord) {
        setTimeout(() => {
          playWord(newIndex, currentWord) // 自動播放單字
        }, 500)
      }
    })
  }

  // **進入畫面時，播放第一張卡片的聲音**
  nextTick(() => {
    if (vocabularies.value && vocabularies.value.length > 0) {
      const firstWord = vocabularies.value[0].full_reading
      playWord(0, firstWord)
    }
  })
})
</script>

<template>
  <div class="relative flex h-[70vh] flex-col items-center rounded-md">
    <div class="absolute top-[30%] z-50 flex items-center justify-center">
      <Transition name="alert-slide">
        <UiAlert
          v-if="show"
          :variant="showAlertType === 'correct' ? 'success' : 'destructive'"
          :title="
            showAlertType === 'correct' ? 'Correct answer!' : 'Wrong answer!'
          "
          :icon="
            showAlertType === 'correct' ? 'lucide:check' : 'lucide:alert-circle'
          "
          class="bg-white"
        />
      </Transition>
    </div>
    <div class="my-4 text-2xl font-bold">Spelling Test &#128214; &#9999;</div>
    <!-- 分數 -->
    <div class="mb-8 flex w-[80%] items-center">
      <UProgress :value="score" :max="100" color="cyan">
        <template #indicator="{ percent }">
          <div class="text-right" :style="{ width: `${percent}%` }">
            <span
              v-if="score >= 20 && score < 60"
              class="text-nowrap text-cyan-600"
            >
              千里行始於足下！
            </span>
            <span
              v-else-if="score >= 60 && score < 80"
              class="text-nowrap text-cyan-600"
            >
              目前為止還可以唷！
            </span>
            <span
              v-else-if="score >= 80"
              class="text-nowrap font-bold text-red-500"
            >
              🔥 太厲害了吧～叫你第一名
            </span>
          </div>
        </template>
      </UProgress>
      <div class="ml-4 text-nowrap">
        <span class="text-xl text-red-400">{{ score }}</span>
        / 100
      </div>
    </div>
    <div
      v-if="showQuestionCards"
      ref="emblaRef"
      class="embla w-[80vw] md:w-[500px]"
    >
      <div class="embla__container">
        <TestSpellCard
          v-for="(vocabulary, index) in vocabularies"
          :key="vocabulary.documentId"
          :vocabulary="vocabulary"
          :index="index"
          @answer-completed="
            (status: 'correct' | 'failed') =>
              answerCompleted(status, index, vocabulary)
          "
        />
      </div>
    </div>
    <div v-else class="flex w-full flex-col items-center">
      <div class="mb-3">
        <div class="font-medium">
          Your score is
          <span class="font-bold text-red-500">{{ score }}</span>
          , review now! &#x25BC;
        </div>
      </div>
      <VocabulariesList
        :vocabularies="vocabularies || []"
        :highlights="spellingWrong"
      />
    </div>
  </div>
</template>

<style scoped>
.embla {
  overflow: hidden;
  position: relative;
}
.embla__container {
  display: flex;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* 滑動進出效果 */
.alert-slide-enter-active,
.alert-slide-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.alert-slide-enter,
.alert-slide-leave-to {
  transform: translateY(20px); /* 往下移動 20px */
  opacity: 0;
}

.alert-slide-enter-to,
.alert-slide-leave {
  transform: translateY(0); /* 恢復到原位 */
  opacity: 1;
}
</style>
