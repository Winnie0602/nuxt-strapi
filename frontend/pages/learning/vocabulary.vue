<script setup lang="ts">
import type { Vocabulary, Pagination } from '~/types/type'

const route = useRoute()

const page = ref(route.query.page ? Number(route.query.page) : 1)

const { data } = await useFetch('/api/vocabularies', {
  params: {
    page: page,
    size: 30,
  },
  watch: [page],
  transform: (data: {
    data: Vocabulary[]
    meta: { pagination: Pagination }
  }) => {
    return {
      vocabularies: data.data,
      pagination: data.meta.pagination,
    }
  },
})
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <VocabulariesList :vocabularies="data?.vocabularies || []" />

    <UPagination
      v-model="page"
      :page-count="30"
      class="mt-8"
      :total="data?.pagination.total || 0"
      :to="
        (page) => ({
          query: { page },
        })
      "
    />
  </div>
</template>
