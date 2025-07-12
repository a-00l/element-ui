<template>
  <li
    class="my-select__menu-item"
    :class="{
      'is-disabled': disabled,
      'is-selected': inputValue === optionValue,
    }"
    :id="`select-item-${optionValue}`"
    @click="optionClick(optionValue)"
  >
    {{ label }}
  </li>
</template>

<script setup lang="ts">
  import { inject, onMounted, ref, type Ref } from 'vue'
  import type { SelectOptionProps, valueType } from './types'
  import { optionPush } from './method'
  const props = withDefaults(defineProps<SelectOptionProps>(), {
    disabled: false,
  })

  // value为空时，使用label
  const optionValue = ref(props.value ? props.value : props.label)
  // 将父组件的inputValue注入
  const inputValue = inject('inputValue') as Ref
  const optionClick = (value: valueType) => {
    if (props.disabled) return

    inputValue.value = value
  }

  // 将所有option保存至一个数组
  onMounted(() => {
    optionPush({
      ...props,
      value: props.value ? props.value : props.label,
    })
  })
</script>

<style scoped></style>
