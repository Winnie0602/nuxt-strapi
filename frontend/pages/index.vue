<script setup lang="ts">
const { find, findOne, create } = useStrapi()

// GET
const { data } = await find('vocabularies')
// const aaa = await findOne('vocabularies', '5')

// POST
const onSubmit = async () => {
  await create('vocabularies', {
    name_jp: 'My restaurant2',
    translate_ch: '1232',
  })
}
</script>

<template>
  <div>
    <div>q</div>
    {{ data }}
    <button @click="onSubmit">click</button>
  </div>
</template>
