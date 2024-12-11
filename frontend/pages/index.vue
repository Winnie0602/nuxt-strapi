<script setup lang="ts">
const { getSession } = useAuth()

const session = await getSession()
</script>

<template>
  <div class="flex flex-col space-y-10 px-10 text-gray-500">
    {{ session }}
  </div>
</template>
