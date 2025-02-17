<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ disabled: boolean }>()

const emit = defineEmits(['selectEmoji'])

const emojiList = [
  '&#x1F600;',
  '&#x1F601;',
  '&#x1F602;',
  '&#x1F923;',
  '&#x1F604;',
  '&#x1F605;',
  '&#x1F606;',
  '&#x1F609;',
  '&#x1F60A;',
  '&#x1F60B;',
  '&#x1F60D;',
  '&#x1F60E;',
  '&#x1F60F;',
  '&#x1F612;',
  '&#x1F613;',
  '&#x1F614;',
  '&#x1F616;',
  '&#x1F618;',
  '&#x1F61A;',
  '&#x1F61C;',
  '&#x1F61D;',
  '&#x1F61E;',
  '&#x1F621;',
  '&#x1F622;',
  '&#x1F923;',
  '&#x1F92A;',
  '&#x1F92B;',
  '&#x1F92D;',
  '&#x1F92E;',
  '&#x1F92F;',
  '&#x1F920;',
  '&#x1F925;',
  '&#x1F917;',
  '&#x1F92C;',
  '&#x1F911;',
  '&#x1F92F;',
]

const selectedEmoji = ref('&#x1F604;')

const selectEmoji = (emoji: string) => {
  selectedEmoji.value = emoji
  emit('selectEmoji', emoji)
}
</script>

<template>
  <div class="hidden sm:block">
    <UPopover class="mr-2" :popper="{ placement: 'top' }">
      <UButton color="white" label="&#x1F609;" :disabled="disabled" />
      <template #panel="">
        <div class="grid grid-cols-6 gap-2 rounded-lg bg-white p-2 shadow-lg">
          <button
            v-for="emoji in emojiList"
            :key="emoji"
            class="rounded p-2 text-lg transition hover:bg-gray-200"
            @click="selectEmoji(emoji)"
            v-html="emoji"
          ></button>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style lang="postcss" scoped>
.grid button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
