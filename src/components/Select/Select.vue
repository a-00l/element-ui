<template>
  <div
    class="my-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toggleSelect"
    ref="selectRef"
  >
    <Tooltip
      manual
      ref="tooltipRef"
      :popper-option="popperOption"
      effect="light"
    >
      <Input
        v-model="inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        readonly
      >
      </Input>
      <template #content>
        <ul class="my-select__menu">
          <slot></slot>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
  import Tooltip from '../Tooltip/Tooltip.vue'
  import Input from '../Input/Input.vue'
  import type { SelectEmits, SelectProps } from './types'
  import { provide, ref } from 'vue'
  import type { TooltipInstance } from '../Tooltip/types'
  import { optionArray } from './method'
  import { useClickOutside } from '@/hooks/useClickOutside'
  defineOptions({
    name: 'mySelect',
  })

  // popper宽度与select宽度一致
  const popperOption: any = {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 20],
        },
      },
      {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }: { state: any }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`
        },
        effect: ({ state }: { state: any }) => {
          state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
        },
      },
    ],
  }

  const props = withDefaults(defineProps<SelectProps>(), {
    placeholder: 'Select',
  })
  const emit = defineEmits<SelectEmits>()

  const inputValue = ref()

  const tooltipRef = ref<TooltipInstance>()
  const isControlSelect = ref(false)
  // 控制下拉列表是否显示
  const controlSelect = (show: boolean) => {
    if (show) {
      tooltipRef.value?.show()
    } else {
      tooltipRef.value?.hide()
    }

    // 切换状态
    isControlSelect.value = show
    emit('visible-change', show)
  }

  // 切换select状态
  const toggleSelect = () => {
    if (props.disabled) return

    if (isControlSelect.value) {
      controlSelect(false)
    } else {
      controlSelect(true)
    }
  }

  // 使用 useClickOutside 监听点击外部区域事件
  const selectRef = ref<HTMLDivElement>()
  useClickOutside(selectRef, () => {
    if (isControlSelect.value) {
      controlSelect(false)
    }
  })
  // 传递给子组件
  provide('inputValue', inputValue)
</script>

<style scoped></style>
