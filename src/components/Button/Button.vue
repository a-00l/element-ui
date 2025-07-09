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
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :type="nativeType"
    :autofocus="autofocus"
  >
    <Icon
      icon="spinner"
      v-if="loading"
      spin
    ></Icon>
    <Icon
      :icon="icon"
      v-if="icon"
    ></Icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
  import Icon from '../Icon/Icon.vue'
  import { ref } from 'vue'
  import type { ButtonProps } from './types'
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
