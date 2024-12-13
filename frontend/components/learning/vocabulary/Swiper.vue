<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import type { Vocabulary } from '~/types/type'

type Favorites = {
  documentId: string
  vocabularies: Vocabulary[]
}

defineProps<{
  myFavorites: Favorites
}>()

const [emblaRef, emblaApi] = emblaCarouselVue()

// swiper是否還有上一頁
const canPrev = ref(false)

// swiper是否還有下一頁
const canNext = ref(false)

// 目前的swiper index
const scrollIndex = ref<number>(0)

watchEffect(() => {
  // 監聽目前swiper index
  if (emblaApi.value) {
    // 正在輪播的index改變時, swiper資料重新賦值
    emblaApi.value.on('select', swiperDataRefresh)

    // 當可以使用emblaApi時先執行swiper賦值
    swiperDataRefresh()
  }
})

// swiper 資料重新賦值
const swiperDataRefresh = () => {
  if (emblaApi.value) {
    scrollIndex.value = emblaApi.value.selectedScrollSnap() // 目前輪播的index
    canPrev.value = emblaApi.value?.canScrollPrev() || false // 是否可滑動上下頁
    canNext.value = emblaApi.value?.canScrollNext() || false
  }
}
</script>

<template>
  <div>
    <div class="mb-2 ml-1 text-4xl">My Favorites</div>
    <div ref="emblaRef" class="embla">
      <div class="embla__container">
        <div
          v-for="item in myFavorites.vocabularies"
          :key="item.documentId"
          class="embla__slide"
        >
          <UiCard class="w-[360px] max-w-sm">
            <template #content>
              <UiCardContent>
                <div>
                  <!-- 單字／聲音 -->
                  <div class="flex items-end">
                    <div class="text-4xl">{{ item.full_word_jp }}</div>
                    <VoiceSpeak :word="item.full_reading" />
                  </div>
                  <!-- 假名 -->
                  <div>
                    <div class="text-lg">{{ item.full_reading }}</div>
                  </div>
                  <UiSeparator class="my-4" />
                  <!-- 造句 -->
                  <div
                    v-show="item.example_1"
                    class="mb-2 text-sm text-gray-800"
                  >
                    1. {{ item.example_1 }}
                  </div>
                  <div v-show="item.example_2" class="text-sm text-gray-800">
                    2. {{ item.example_2 }}
                  </div>
                </div>
              </UiCardContent>
            </template>
            <template #footer>
              <UiCardFooter class="flex justify-between">
                <UiButton
                  type="button"
                  :disabled="!canPrev"
                  variant="outline"
                  @click="emblaApi?.scrollPrev()"
                >
                  Prev
                </UiButton>
                <UiButton
                  type="button"
                  variant="outline"
                  :disabled="!canNext"
                  @click="emblaApi?.scrollNext()"
                >
                  Next
                </UiButton>
              </UiCardFooter>
            </template>
          </UiCard>
        </div>
      </div>
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
