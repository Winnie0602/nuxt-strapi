<script setup lang="ts">
import type { Language } from '~/types/type'
import { VoiceLanguage, HumanReadLanguage, GoogleLanguage } from '~/types/type'

const props = defineProps<{ disabled: boolean; language: Language }>()

const emit = defineEmits(['changeLang'])

const languageList = [
  {
    flag: '&#x1F1F9;&#x1F1FC;',
    googleLang: GoogleLanguage.TraditionalChinese,
    voiceLang: VoiceLanguage.TraditionalChinese,
    humanLang: HumanReadLanguage.TraditionalChinese,
  },
  {
    flag: '&#x1F1E8;&#x1F1F3;',
    googleLang: GoogleLanguage.SimplifiedChinese,
    voiceLang: VoiceLanguage.SimplifiedChinese,

    humanLang: HumanReadLanguage.SimplifiedChinese,
  },
  {
    flag: '&#x1F1FA;&#x1F1F8;',
    googleLang: GoogleLanguage.English,
    voiceLang: VoiceLanguage.English,

    humanLang: HumanReadLanguage.English,
  },
  {
    flag: '&#x1F1EF;&#x1F1F5;',
    googleLang: GoogleLanguage.Japanese,
    voiceLang: VoiceLanguage.Japanese,

    humanLang: HumanReadLanguage.Japanese,
  },
  {
    flag: '&#x1F1F0;&#x1F1F7;',
    googleLang: GoogleLanguage.Korean,
    voiceLang: VoiceLanguage.Korean,

    humanLang: HumanReadLanguage.Korean,
  },
  {
    flag: '&#x1F1F9;&#x1F1F0;',
    googleLang: GoogleLanguage.Thai,
    voiceLang: VoiceLanguage.Thai,

    humanLang: HumanReadLanguage.Thai,
  },
  {
    flag: '&#x1F1EB;&#x1F1F7;',
    googleLang: GoogleLanguage.French,
    voiceLang: VoiceLanguage.French,

    humanLang: HumanReadLanguage.French,
  },
  {
    flag: '&#x1F1ED;&#x1F1F0;',
    googleLang: GoogleLanguage.Cantonese,
    voiceLang: VoiceLanguage.Cantonese,

    humanLang: HumanReadLanguage.Cantonese,
  },
]

const setLanguage = (
  lang: {
    flag: string
    googleLang: GoogleLanguage
    voiceLang: VoiceLanguage
    humanLang: HumanReadLanguage
  },
  type: string,
  close: () => void,
) => {
  if (!props.language) return

  const { googleLang, voiceLang, humanLang } = lang

  const copy = { ...props.language }

  if (type === 'source') {
    copy.googleSourceLanguage = googleLang

    showToast(`Switch your source language to ${humanLang}`, '')
  }
  if (type === 'translated') {
    copy.googleTargetLanguage = googleLang
    copy.voiceLanguage = voiceLang

    showToast(`Switch your target language to ${humanLang}`, '')
  }

  emit('changeLang', copy)
  close()
}
</script>

<template>
  <div>
    <UPopover class="mr-4" :popper="{ placement: 'top' }">
      <UButton color="white" label="&#x1F310;" :disabled="disabled" />
      <template #panel="{ close }">
        <div class="flex">
          <!-- 選擇語言 -->
          <div class="flex flex-col items-start space-y-1 p-3 text-sm">
            <div>您的語言</div>
            <button
              v-for="lang in languageList"
              :key="lang.googleLang"
              class="languageTag"
              :class="{
                defaultLanguage:
                  language.googleSourceLanguage === lang.googleLang,
              }"
              @click="setLanguage(lang, 'source', close)"
            >
              <span v-html="lang.flag"></span>
              {{ lang.humanLang }}
            </button>
          </div>

          <!-- 翻譯語言 -->
          <div class="flex flex-col items-start space-y-1 p-3 text-sm">
            <div>翻譯語言</div>
            <button
              v-for="lang in languageList"
              :key="lang.googleLang"
              class="languageTag"
              :class="{
                defaultLanguage:
                  language.googleTargetLanguage === lang.googleLang,
              }"
              @click="setLanguage(lang, 'translated', close)"
            >
              <span v-html="lang.flag"></span>
              {{ lang.humanLang }}
            </button>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style lang="postcss" scoped>
.languageTag {
  @apply block w-[130px] rounded-md border-[1px] border-slate-700 px-2 py-1 hover:bg-indigo-300;
}

.defaultLanguage {
  @apply border-red-900 bg-indigo-500 text-white;
}
</style>
