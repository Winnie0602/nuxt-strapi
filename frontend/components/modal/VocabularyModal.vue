<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

defineProps<{
  vocabulary: Vocabulary
}>()
</script>

<template>
  <UModal>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex h-8 items-center">
          {{ vocabulary.full_word_jp }} ( {{ vocabulary.full_reading }} )
          <div class="ml-1">
            <VoiceSpeak :word="vocabulary.full_word_jp || ''" :index="0" />
          </div>
        </div>
      </template>

      <div class="">
        <div class="flex">
          <div
            class="ml-1 h-6 content-center rounded-sm bg-black px-1 text-center text-sm text-white"
          >
            例
          </div>
          <div
            class="ml-1 mr-2 h-6 content-center rounded-sm border-[1px] border-black bg-white px-1 text-center text-sm text-black"
          >
            日
          </div>
          <div class="flex text-sm">
            {{ vocabulary.example_1 }}
            <VoiceSpeak :word="vocabulary.example_1 || ''" :index="1" />
          </div>
        </div>
        <div class="mt-1.5 flex">
          <div
            class="ml-1 h-6 content-center rounded-sm bg-black px-1 text-center text-sm text-white"
          >
            例
          </div>
          <div
            class="ml-1 mr-2 h-6 content-center rounded-sm border-[1px] border-black bg-white px-1 text-center text-sm text-black"
          >
            中
          </div>
          <div class="text-sm">{{ vocabulary.example_2 }}</div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
