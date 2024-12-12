<script setup lang="ts">
import type { Vocabulary, Pagination } from '~/types/type'

const route = useRoute()

const page = ref(route.query.page ? Number(route.query.page) : 1)

const { data } = await useFetch('/api/vocabularies', {
  params: {
    page: page,
    size: 5,
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

type Favorites = {
  documentId: string
  vocabularies: Vocabulary[]
}

const { data: myFavorites, error } = await useFetch<Favorites>('/api/favorites')

if (error.value?.statusCode === 401) {
  console.log('token error')
}

if (error.value?.statusCode === 403) {
  console.log('you dont have record in DB')
}
</script>

<template>
  <div
    class="flex w-[100vw] space-x-4 px-4 md:w-[calc(100vw-32px)] xl:w-[1280px] xl:space-x-8"
  >
    <LearningMenu />

    <div class="flex w-full flex-col items-center">
      <VocabulariesList
        :vocabularies="data?.vocabularies || []"
        :my-favorites="
          myFavorites || {
            documentId: '',
            vocabularies: [],
          }
        "
      />

      <UPagination
        v-model="page"
        :page-count="10"
        class="mt-8"
        :total="data?.pagination.total || 0"
        :to="
          (page) => ({
            query: { page },
          })
        "
      />
    </div>
  </div>
</template>
