<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

interface MatchItem {
  text: string
  pairId: number
}

const { data: allPairs } = await useFetch('/api/vocabularies', {
  transform: (data: { data: Vocabulary[] }) => {
    const filtered = data.data.map((e) => ({
      id: e.id,
      japanese: e.full_word_jp,
      chinese: e.translate_ch,
    }))
    return filtered.sort(() => Math.random() - 0.5).slice(0, 8)
  },
})

const isGameStart = ref(false)

const selectTimer = ref(20)

const leftItems = ref<MatchItem[]>([])
const rightItems = ref<MatchItem[]>([])

const selectedLeft = ref<MatchItem | null>(null)
const selectedRight = ref<MatchItem | null>(null)

const score = ref(0)
const errorFlash = ref(false)

// remaining lives
const remainingLives = ref(3)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

onMounted(() => {
  if (!allPairs.value) return

  leftItems.value = shuffle(
    allPairs.value.map((p) => ({ text: p.japanese, pairId: p.id })),
  )
  rightItems.value = shuffle(
    allPairs.value.map((p) => ({ text: p.chinese, pairId: p.id })),
  )
})

function selectLeft(item: MatchItem) {
  selectedLeft.value = item
  tryMatch()
}

function selectRight(item: MatchItem) {
  selectedRight.value = item
  tryMatch()
}

function tryMatch() {
  if (selectedLeft.value && selectedRight.value) {
    if (selectedLeft.value.pairId === selectedRight.value.pairId) {
      score.value++
      leftItems.value = leftItems.value.filter(
        (i) => i.pairId !== selectedLeft.value?.pairId,
      )
      rightItems.value = rightItems.value.filter(
        (i) => i.pairId !== selectedRight.value?.pairId,
      )
      selectedLeft.value = null
      selectedRight.value = null
    } else {
      errorFlash.value = true
      if (remainingLives.value === 0) {
        showToast(`測驗失敗，請重新測驗`, '')
        isGameStart.value = false
        return
      }
      remainingLives.value -= 1
      setTimeout(() => {
        errorFlash.value = false
        selectedLeft.value = null
        selectedRight.value = null
      }, 500)
    }
  }
}

// timer
const timer = ref(selectTimer.value * 100) //15 * 100 毫秒 = 1500 毫秒

watch(selectTimer, () => {
  timer.value = selectTimer.value * 100
})

const formattedTime = ref('14:99')

// 每 100 毫秒更新倒數時間
let interval: ReturnType<typeof setInterval>

const updateTimer = () => {
  if (timer.value > 0) {
    timer.value--
  }
}

const isLowTime = computed(() => {
  return timer.value <= 500
})

// 轉換為分:秒格式，並以 14:99 開始倒數
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 100)
  const seconds = time % 100
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

watch(isGameStart, () => {
  if (!isGameStart.value) return
  interval = setInterval(() => {
    updateTimer()
    formattedTime.value = formatTime(timer.value)
  }, 10) // 每 10 毫秒更新一次
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="mx-auto flex max-w-4xl flex-col items-center p-4">
    <h2 class="mb-6 text-center text-2xl font-bold">\ 配對測驗 /</h2>

    <!-- 開始畫面 -->
    <div
      v-if="!isGameStart"
      class="borde-black mt-10 border-[1px] p-8 text-center"
    >
      <div
        class="flex flex-col items-center justify-center text-center text-lg font-medium md:flex-row"
      >
        選擇測驗的時間
        <div class="mt-4 flex items-center md:mt-0">
          <div class="mx-4 max-w-[150px]">
            <UiNumberField v-model="selectTimer" :min="5" :max="30" :step="5" />
          </div>
          秒
        </div>
      </div>
      <UiButton
        variant="ringHover"
        class="mt-5 bg-red-600 text-lg font-bold text-white hover:bg-white hover:text-red-600 hover:ring-red-600"
        @click="isGameStart = true"
      >
        Start !
      </UiButton>
    </div>

    <div v-else>
      <!-- 計時器/分數/錯誤次數 -->
      <div class="mx-auto my-6 flex flex-col md:w-[532px]">
        <div
          class="flex h-[115px] flex-col items-center justify-center space-y-6 md:flex-row md:space-x-3 md:space-y-0"
        >
          <div
            class="flex flex-1 flex-col items-center rounded-xl border-2 border-gray-300 py-6"
          >
            <div
              class="text-custom-gray-800 mb-2 flex items-center text-lg font-medium leading-5"
            >
              Timer
              <Icon name="icon:clock" class="ml-1 h-4 w-4" />
            </div>
            <div class="flex items-center">
              <span
                class="text-3xl font-bold leading-9"
                :class="{ 'text-red-600': isLowTime }"
              >
                {{ formattedTime }}
              </span>
            </div>
          </div>
          <div
            class="flex h-[115px] flex-1 flex-col items-center rounded-xl border-2 border-gray-300 py-6"
          >
            <div
              class="font-meduim text-custom-gray-800 mb-2 text-lg leading-5"
            >
              Remaining Lives
            </div>
            <div class="flex items-center">
              <span class="flex space-x-1 text-3xl font-bold leading-9">
                <Icon
                  v-for="i in remainingLives"
                  :key="i"
                  name="icon:lemon"
                  class="h-8 w-8 fill-red-300 stroke-slate-900"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 題目 -->
      <div class="grid grid-cols-2 gap-8">
        <!-- 左邊（日文） -->
        <div>
          <div>
            <transition-group name="fade" tag="div" class="space-y-3">
              <button
                v-for="item in leftItems"
                :key="item.pairId"
                class="relative w-full rounded-lg border-[4px] px-4 py-2 text-lg font-medium transition-all duration-300"
                :class="[
                  selectedLeft?.pairId === item.pairId
                    ? 'border-blue-400 bg-blue-300'
                    : 'border-blue-300 bg-white hover:bg-blue-300 hover:text-white',
                  errorFlash && selectedLeft?.pairId === item.pairId
                    ? 'animate-shake'
                    : '',
                ]"
                @click="selectLeft(item)"
              >
                {{ item.text }}
                <span
                  v-if="selectedLeft?.pairId === item.pairId"
                  class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-300 text-sm text-white shadow-md"
                >
                  ✓
                </span>
              </button>
            </transition-group>
          </div>
        </div>

        <!-- 右邊（中文） -->
        <div>
          <div>
            <transition-group name="fade" tag="div" class="space-y-3">
              <button
                v-for="item in rightItems"
                :key="item.pairId"
                class="relative w-full rounded-lg border-[4px] px-4 py-2 text-lg font-medium transition-all duration-300"
                :class="[
                  selectedRight?.pairId === item.pairId
                    ? 'bg-slate-400'
                    : 'border-slate-400 bg-white hover:bg-slate-400 hover:text-white',
                  errorFlash && selectedRight?.pairId === item.pairId
                    ? 'animate-shake'
                    : '',
                ]"
                @click="selectRight(item)"
              >
                {{ item.text }}
                <span
                  v-if="selectedRight?.pairId === item.pairId"
                  class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-sm text-white shadow-md"
                >
                  ✓
                </span>
              </button>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 動畫效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
