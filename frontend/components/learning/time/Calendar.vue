<script setup lang="ts">
const date = ref(new Date())

const year = ref(date.value.getFullYear())
const month = ref(date.value.getMonth() + 1)
const day = ref(date.value.getDate())

const fullDate = computed(() => {
  return `${year.value}年${month.value}月${day.value}日`
})

const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'red',
      fillMode: 'solid',
    },
    dates: date.value,
  },
])

const show = ref(true)

const changeInput = () => {
  show.value = false
  date.value = new Date(`${year.value}-${month.value}-${day.value}`)
  nextTick(() => (show.value = true))
}

watch(date, () => {
  year.value = date.value.getFullYear()
  month.value = date.value.getMonth() + 1
  day.value = date.value.getDate()
})
</script>

<template>
  <div class="flex flex-col items-center">
    <VDatePicker
      v-if="show"
      v-model="date"
      :attributes="attrs"
      class="w-[600px]"
    />
    <UiSeparator class="my-8 w-[600px]" />
    <div class="flex items-center space-x-2">
      <UiInput
        v-model="year"
        type="text"
        class="w-[65px]"
        @blur="changeInput"
      />
      <span>年</span>
      <UiInput
        v-model="month"
        type="text"
        class="w-[65px]"
        @blur="changeInput"
      />
      <span>月</span>
      <UiInput v-model="day" type="text" class="w-[65px]" @blur="changeInput" />
      <span>日</span>
      <!-- 朗讀 -->
      <VoiceSpeak :word="fullDate" />
    </div>
  </div>
</template>
