<template>
  <!-- eslint-disable-next-line vue/html-self-closing -->
  <input
    v-bind="props"
    v-model="localModel"
    :class="styles({ class: props.class })"
    ref="inputRef"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: any
    id?: string
    name?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    type?: string
    modelValue?: any
  }>(),
  { type: 'text' },
)
const emits = defineEmits<{
  'update:modelValue': [value: any]
}>()
const localModel = useVModel(props, 'modelValue', emits)

const inputRef = ref()

// 使用 expose 暴露內部 input 給外部使用
defineExpose({
  inputRef,
})

const styles = tv({
  base: 'form-input h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:px-1 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:[color-scheme:dark] sm:text-sm',
})
</script>
