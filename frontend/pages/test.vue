<script lang="ts" setup>
// import DiffMatchPatch from 'diff-match-patch'

interface Vocabulary {
  id: number
  full_word_jp: string
  translate_ch: string
  full_reading: string
  masu_form: string
  html_hiragana: string
}

const { find } = useStrapi()

const { data }: { data: Vocabulary[] } = await find('vocabularies')

// const dmp = new DiffMatchPatch()
// const diff = dmp.diff_main(data[3].full_word_jp, data[3].full_reading)
// console.log(diff)
// console.log(data[3].full_word_jp, data[3].full_reading)
</script>

<template>
  <div>
    <ul v-for="item in data" :key="item.id" class="mb-5 border-2 border-black">
      <br />
      <li>full_word_jp : {{ item.full_word_jp }}</li>
      <li>translate_ch : {{ item.translate_ch }}</li>
      <li>full_reading : {{ item.full_reading }}</li>
      <li>masu_form : {{ item.masu_form }}</li>
    </ul>
  </div>
</template>
