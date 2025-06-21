<template>
  <button
    class="my-button"
    :class="{
      [`my-button--${type}`]: type,
      [`my-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
    }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  import type { ButtonProps } from './types'
  defineOptions({
    name: 'MyButton',
  })

  const props = defineProps<ButtonProps>()
  console.log(props)
</script>

<style lang="scss" scoped></style>
