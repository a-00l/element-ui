<template>
  <div class="my-dropdown">
    <Tooltip
      ref="tooltip"
      :trigger="trigger"
      :placement="placement"
      :popper-option="popperOption"
      :openDelay="openDelay"
      :closeDelay="closeDelay"
      @visible-change="visibleChange"
    >
      <slot></slot>
      <template #content>
        <slot name="dropdown"></slot>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
  import Tooltip from '../Tooltip/Tooltip.vue'
  import type { TooltipInstance } from '../Tooltip/types'
  import type { DropdownEmits, DropdownInstance, DropdownProps } from './types'
  import { provide, ref } from 'vue'

  const tooltip = ref<TooltipInstance>()
  defineProps<DropdownProps>()
  // 获取tooltip方法
  const dropdownInstance: DropdownInstance = {
    handleClose: () => tooltip.value?.hide(),
    handleOpen: () => tooltip.value?.show(),
  }

  const emit = defineEmits<DropdownEmits>()
  const visibleChange = (visible: boolean) => {
    emit('visible-change', visible)
  }

  // 将方法传递给子组件
  provide('dropdownEvent', dropdownInstance)
  // 暴露方法
  defineExpose(dropdownInstance)
</script>

<style lang="scss" scoped></style>
