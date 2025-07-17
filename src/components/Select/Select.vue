<template>
  <div
    class="my-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toggleSelect"
    ref="selectRef"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
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
        ref="inputRef"
        readonly
      >
        <template #suffix>
          <Icon
            v-if="showClearIcon"
            icon="times-circle"
            class="my-input__icon my-input__clear"
            @click.stop="clear"
          >
          </Icon>

          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isControlSelect }"
          >
          </Icon>
        </template>
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
  import Icon from '../Icon/Icon.vue'
  import Tooltip from '../Tooltip/Tooltip.vue'
  import Input from '../Input/Input.vue'
  import type { SelectEmits, SelectProps } from './types'
  import { computed, provide, ref } from 'vue'
  import type { TooltipInstance } from '../Tooltip/types'
  import { useClickOutside } from '@/hooks/useClickOutside'
  import type { InputInstance } from '../Input/types'
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

  const inputRef = ref<InputInstance>()
  const tooltipRef = ref<TooltipInstance>()
  const isControlSelect = ref(false)
  // 控制清空图标
  const isHover = ref(false)
  const showClearIcon = computed(() => {
    return props.clearable && inputValue.value && isHover.value && !props.disabled
  })

  // 清空select值
  const clear = () => {
    inputValue.value = ''
  }

  const NOOP = () => {}
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
  provide('inputRef', inputRef)
</script>

<style scoped></style>
