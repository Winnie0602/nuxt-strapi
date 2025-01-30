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
  <div class="flex w-full items-center justify-evenly">
    <VDatePicker v-if="show" v-model="date" :attributes="attrs" />

    <div class="space-y-2">
      <div class="flex items-center space-x-1">
        <UiInput
          v-model="year"
          type="text"
          class="w-[65px]"
          @blur="changeInput"
        />
        <div class="font-meduim text-lg">年</div>
        <VoiceSpeak :word="`${year}年`" />
      </div>
      <div class="flex items-center space-x-1">
        <UiInput
          v-model="month"
          type="text"
          class="w-[65px]"
          @blur="changeInput"
        />
        <div class="font-meduim text-lg">月</div>
        <VoiceSpeak :word="`${month}月`" />
      </div>
      <div class="flex items-center space-x-1">
        <UiInput
          v-model="day"
          type="text"
          class="w-[65px]"
          @blur="changeInput"
        />
        <div class="font-meduim text-lg">日</div>
        <VoiceSpeak :word="`${day}日`" />
      </div>
    </div>
  </div>
</template>
