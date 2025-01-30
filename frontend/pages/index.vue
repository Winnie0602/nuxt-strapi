<script setup lang="ts">
const { getSession } = useAuth()

const session = await getSession()
</script>

<template>
  <div>
    <LearningMenu />
  </div>
</template>
