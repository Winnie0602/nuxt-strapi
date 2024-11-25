<script setup lang="ts">
const { find } = useStrapi()

// GET
const { data } = await find('vocabularies')
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="item in data"
      :key="item.id"
      class="card bg-primary text-primary-content w-96"
    >
      <div class="card-body">
        <h2 class="card-title"><div v-html="item.html_hiragana" /></h2>
      </div>
    </div>
  </div>
</template>
