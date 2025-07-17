<template>
  <li
    class="my-select__menu-item"
    :class="{
      'is-disabled': disabled,
      'is-selected': selectd === props.value,
    }"
    :id="`select-item-${props.value}`"
    @click="optionClick(props.value)"
  >
    {{ label }}
  </li>
</template>

<script setup lang="ts">
  import { inject, onMounted, type Ref } from 'vue'
  import type { SelectOptionProps, valueType } from './types'
  import { optionFind, optionPush, selectd, selectdValue, stateSelect } from './method'
  import type { InputInstance } from '../Input/types'
  const props = withDefaults(defineProps<SelectOptionProps>(), {
    disabled: false,
  })

  // 将父组件的inputValue注入
  const inputRef = inject('inputRef') as Ref<InputInstance>
  const optionClick = (value: valueType) => {
    if (props.disabled) return

    selectd.value = selectdValue(value)

    // 将选中的值赋给inputValue
    stateSelect.inputValue = optionFind(value)?.label as string
    console.log(stateSelect)

    // 记录选中的值
    stateSelect.selectOption = optionFind(value)!
    // 选中input
    inputRef.value.ref.focus()
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
