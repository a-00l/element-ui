<template>
  <li v-if="divided"></li>
  <li
    class="my-dropdown-item"
    :class="{
      'is-disabled': disabled,
      'is-divided': divided,
    }"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import type { DropdownInstance, DropdownItemsProps } from './types'
  const props = defineProps<DropdownItemsProps>()

  const event = inject<DropdownInstance>('dropdownEvent')
  const handleClick = () => {
    // 点击下划线或禁用标签，不做操作
    if (props.disabled) return

    event?.handleClose()
  }
</script>

<style scoped></style>
