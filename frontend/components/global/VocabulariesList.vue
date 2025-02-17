<script setup lang="ts">
import type { Vocabulary } from '~/types/type'
import VocabularyModal from '../modal/VocabularyModal.vue'

type Favorites = {
  documentId: string
  vocabularies: Vocabulary[]
}

const props = withDefaults(
  defineProps<{
    vocabularies: Vocabulary[]
    highlights?: string[]
  }>(),
  {
    highlights: () => [],
  },
)

const { data: myFavorites, error } = await useFetch<Favorites>('/api/favorites')

if (error.value?.statusCode === 401) {
  console.log('token error')
}

if (error.value?.statusCode === 403) {
  console.log('you dont have record in DB')
}

const filterVocabularies = computed(() => {
  if (search.value !== '') {
    return props.vocabularies.filter(
      (item) =>
        item.full_word_jp.includes(search.value) ||
        item.translate_ch.includes(search.value),
    )
  }
  return props.vocabularies
})

const route = useRoute()

const textMode = ref<'hanji' | 'hiragana' | 'both'>('both')

const search = ref('')

const showChinese = ref(true)

const showSerachInput = ref(!route.path.includes('spell'))

const ismodalOpen = ref(false)

const modalVocabulary = ref<Vocabulary>()
</script>

<template>
  <div class="w-full">
    <div class="w-full overflow-x-auto">
      <UiInput
        v-if="showSerachInput"
        v-model="search"
        type="text"
        placeholder="Search..."
        class="mb-8"
      />

      <table class="w-full rounded-md border pb-4">
        <thead class="table-title h-12 w-full">
          <tr class="">
            <th width="30%" scope="col" class="px-3 text-left sm:px-5">
              <UiTooltip disable-closing-trigger>
                <template #trigger>
                  <UiTooltipTrigger as-child>
                    <button type="button" class="text-nowrap">
                      漢字 + 假名
                    </button>
                  </UiTooltipTrigger>
                </template>
                <template #content>
                  <UiTooltipContent>
                    <div class="flex h-full gap-1.5 py-2">
                      <UiBadge
                        :variant="
                          textMode === 'both' ? 'destructive' : 'outline'
                        "
                        class="cursor-pointer"
                        @click="textMode = 'both'"
                      >
                        漢字 + 假名
                      </UiBadge>
                      <UiBadge
                        :variant="
                          textMode === 'hanji' ? 'destructive' : 'outline'
                        "
                        class="cursor-pointer"
                        @click="textMode = 'hanji'"
                      >
                        漢字
                      </UiBadge>
                      <UiBadge
                        :variant="
                          textMode === 'hiragana' ? 'destructive' : 'outline'
                        "
                        class="cursor-pointer"
                        @click="textMode = 'hiragana'"
                      >
                        假名
                      </UiBadge>
                    </div>
                  </UiTooltipContent>
                </template>
              </UiTooltip>
            </th>
            <th width="30%" scope="col" class="text-center">
              <button @click="showChinese = !showChinese">
                <svg
                  v-if="showChinese"
                  class="h-4 w-4 fill-slate-700 sm:w-6 md:h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                  />
                </svg>
                <svg
                  v-if="!showChinese"
                  class="h-4 w-4 fill-red-500 sm:w-6 md:h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
                  />
                </svg>
              </button>
            </th>
            <th width="20%" scope="col" class="text-center">詞性</th>
            <th width="20%" scope="col"></th>
          </tr>
        </thead>

        <tbody
          v-if="filterVocabularies?.length && filterVocabularies?.length > 0"
        >
          <tr
            v-for="(item, index) in filterVocabularies"
            :key="item.id"
            :class="
              highlights.includes(item.documentId)
                ? 'bg-red-200 hover:bg-red-200'
                : 'bg-white'
            "
            class="border-custom-gray-200 text-custom-gray-900 even:bg-custom-blue/10 h-[59px] border-t-[2px] text-sm"
          >
            <td
              width="30%"
              scope="col"
              class="mx-5 h-full px-3 text-left font-medium sm:px-5"
            >
              <div class="flex items-center">
                <div
                  v-if="textMode === 'both'"
                  class="cursor-pointer"
                  @click="
                    () => {
                      modalVocabulary = item
                      ismodalOpen = true
                    }
                  "
                  v-html="item.html_hiragana"
                ></div>
                <div v-else>
                  {{
                    textMode === 'hanji' ? item.full_word_jp : item.full_reading
                  }}
                </div>
                <VoiceSpeak :word="item.full_reading" :index="index" />
              </div>
            </td>

            <td
              width="30%"
              scope="col"
              class="text-center"
              :class="{
                'text-white':
                  !showChinese && !highlights.includes(item.documentId),
                'text-red-200':
                  !showChinese && highlights.includes(item.documentId),
              }"
            >
              {{ item.translate_ch }}
            </td>
            <td width="20%" scope="col" class="text-center">
              <UiBadge v-if="item.type" variant="secondary">
                {{ item.type }}
              </UiBadge>
            </td>
            <td width="20%" scope="col" class="px-3 text-right sm:px-5">
              <div class="flex items-center justify-end">
                <Icon
                  name="icon:open-modal"
                  class="mr-3 h-4 w-4 cursor-pointer"
                  mode="svg"
                  @click="
                    () => {
                      modalVocabulary = item
                      ismodalOpen = true
                    }
                  "
                />
                <FavoriteButton
                  :my-favorites="
                    myFavorites || {
                      documentId: '',
                      vocabularies: [],
                    }
                  "
                  :document-id="item.documentId"
                  :item="item"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <VocabularyModal
      v-if="modalVocabulary"
      v-model="ismodalOpen"
      :vocabulary="modalVocabulary"
    />
  </div>
</template>

<style lang="postcss" scoped>
.table-title {
  background-color: hsla(0, 0%, 93.7%, 0.4);
  height: 49.5px;
  font-size: 14px;
}
</style>
