<template>
  <form class="my-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
  import { provide } from 'vue'
  import { FormContextKey, type FormItemContext, type FormProps } from './types'

  const props = defineProps<FormProps>()

  const formContext: FormItemContext[] = []
  // 添加Field
  const addField = (field: FormItemContext) => {
    formContext.push(field)
  }

  // 删除Field
  const removeField = (field: FormItemContext) => {
    formContext.splice(formContext.indexOf(field), 1)
  }

  provide(FormContextKey, {
    model: props.model,
    rules: props.rules,
    addField,
    removeField,
  })
</script>

<style scoped></style>
