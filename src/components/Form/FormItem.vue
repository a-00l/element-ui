<template>
  <div class="my-form-item">
    <label>
      <slot
        name="label"
        :label="label"
        >{{ label }}
      </slot>
    </label>
    <div class="my-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { FormItemProps } from './types'

  defineProps<FormItemProps>()
</script>

<style lang="scss" scoped></style>
