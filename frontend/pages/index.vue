<script setup lang="ts">
const { find, findOne, create } = useStrapi()

// GET
const { data } = await find('vocabularies')
// const aaa = await findOne('vocabularies', '5')

// POST
// const onSubmit = async () => {
//   await create('vocabularies', {
//     name_jp: 'My restaurant2',
//     translate_ch: '1232',
//   })
// }
</script>

<template>
  <div class="text-red-500">123</div>
</template>
