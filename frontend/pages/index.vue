<script setup lang="ts">
import type { Vocabulary } from '~/types/type'

const { data: vocabularies } = useFetch<{ data: Vocabulary[] }>(
  '/api/vocabularies',
)

const { data: vocabulary } = useFetch('/api/vocabulary', {
  method: 'post',
  body: { documentId: 'vrpfwoemoz3vpy1xth4r9qev' },
})

console.log(vocabulary.value)

const { getSession } = useAuth()

const session = await getSession()
</script>

<template>
  <div class="flex flex-col space-y-10 px-10 text-gray-500">
    <!-- <div>user: {{ user }}</div>
{{}}
    <div>getSession: {{ session }}</div> -->
    {{ vocabularies?.data[0].documentId }}
    {{ session }}
  </div>
</template>
