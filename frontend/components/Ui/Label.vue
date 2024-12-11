<template>
  <Label :class="styles({ class: props.class })" v-bind="forwarded">
    <slot />
  </Label>
</template>

<script lang="ts" setup>
import { Label } from 'radix-vue'
import type { LabelProps } from 'radix-vue'

const props = defineProps<
  LabelProps & {
    /** Custom class(es) to add to the label */
    class?: any
  }
>()

const forwarded = reactiveOmit(props, 'class')

const styles = tv({
  base: 'flex items-center justify-between text-[15px] font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm',
})
</script>
