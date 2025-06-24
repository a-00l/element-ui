<template>
  <button
    ref="_ref"
    class="my-button"
    :class="{
      [`my-button--${type}`]: type,
      [`my-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
    }"
    :disabled="disabled"
    :type="nativeType"
    :autofocus="autofocus"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { ButtonProps } from './types'
  import './style.css'
  defineOptions({
    name: 'MyButton',
  })

  // 添加ButtonProps中的默认值
  const props = withDefaults(defineProps<ButtonProps>(), {
    nativeType: 'button',
  })
  console.log(props)

  // 获取button按钮
  const _ref = ref<HTMLButtonElement>()
  defineExpose({
    ref: _ref,
  })
</script>

<style lang="scss" scoped></style>
