<template>
  <form class="my-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
  import type { FormProps } from './types'

  defineProps<FormProps>()
</script>

<style scoped></style>
