<template>
  <div class="my-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { provide, ref, watch } from 'vue'
  import {
    CollapseContextKey,
    type CollapseEmits,
    type CollapseProps,
    type NameType,
  } from './types'

  defineOptions({
    name: 'MyCollapse',
  })

  // 接收props参数
  const props = defineProps<CollapseProps>()
  const emits = defineEmits<CollapseEmits>()

  // 记录折叠项的name
  const activeNames = ref<NameType[]>(props.modelValue ?? [])
  // 监听modelValue的变化，同步更新activeNames
  watch(
    () => props.modelValue,
    (value) => {
      activeNames.value = value
    },
  )

  // 设置折叠名称
  const setActiveNames = (item: NameType) => {
    // 手风琴模式
    if (props.accordion) {
      activeNames.value = [activeNames.value[0] === item ? '' : item]
    } else {
      const index = activeNames.value.indexOf(item)
      // 数组里面没有该name则删除，有则添加
      if (index > -1) {
        activeNames.value.splice(index, 1)
      } else {
        activeNames.value.push(item)
      }
    }

    // 通信父组件
    emits('change', activeNames.value)
    emits('update:modelValue', activeNames.value)
  }

  // 提供给折叠上下文的方法
  provide(CollapseContextKey, {
    activeNames,
    setActiveNames,
  })
</script>

<style lang="scss" scoped></style>
