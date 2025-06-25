<template>
  <div
    class="my-collapse-item"
    :class="{ 'is-disabled': disabled }"
  >
    <div
      class="my-collapse-item__header"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <div
      class="my-collapse-item__content"
      v-show="isActive"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { CollapseContextKey, type CollapseItemProps } from './types'
  defineOptions({
    name: 'MyCollapseItem',
  })

  // 接收父组件提供的方法
  const collapseContext = inject(CollapseContextKey)
  const props = defineProps<CollapseItemProps>()
  // 判断是否显示
  const isActive = computed(() => {
    return collapseContext?.activeNames.value?.includes(props.name)
  })
  // 设置name
  const handleClick = () => {
    collapseContext?.setActiveNames(props.name)
  }
</script>

<style scoped></style>
