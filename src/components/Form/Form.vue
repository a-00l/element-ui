<template>
  <form class="my-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
  import { provide } from 'vue'
  import { FormContextKey, type FormContext, type FormProps } from './types'

  const props = defineProps<FormProps>()

  provide(FormContextKey, {
    model: props.model,
    rules: props.rules,
  })
</script>

<style scoped></style>
