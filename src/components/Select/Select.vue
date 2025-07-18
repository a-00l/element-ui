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
        v-model="stateSelect.inputValue"
        :disabled="disabled"
        :placeholder="setPlaceholder || props.placeholder"
        ref="inputRef"
        :readonly="!filterable"
        @input="search(stateSelect.inputValue as string)"
      >
        <template #prefix>
          <Loading :loading="loading"></Loading>
        </template>
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
        <ul
          v-show="!isFilterable"
          class="my-select__menu"
        >
          <NoData v-if="optionArray.length === 0"></NoData>
          <slot></slot>
        </ul>
        <!-- 查询显示 -->
        <ul
          v-show="isFilterable"
          class="my-select__menu"
        >
          <NoData v-if="optionsFilter.length === 0"></NoData>
          <Option
            v-else
            v-for="item in optionsFilter"
            :label="item.label"
            :value="item.value"
          >
          </Option>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
  import Option from './Option.vue'
  import Icon from '../Icon/Icon.vue'
  import Tooltip from '../Tooltip/Tooltip.vue'
  import Input from '../Input/Input.vue'
  import type { SelectEmits, SelectProps } from './types'
  import { computed, provide, ref, watch } from 'vue'
  import type { TooltipInstance } from '../Tooltip/types'
  import { useClickOutside } from '@/hooks/useClickOutside'
  import type { InputInstance } from '../Input/types'
  import { optionArray, stateSelect } from './method'
  import Loading from './component/loading.vue'
  import NoData from './component/NoData.vue'
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
    loading: false,
  })
  const emit = defineEmits<SelectEmits>()

  const inputRef = ref<InputInstance>()
  const tooltipRef = ref<TooltipInstance>()
  // 控制是否显示过滤选项
  const isFilterable = ref(false)
  // 过滤后的选项
  const optionsFilter = ref([...optionArray])
  const setPlaceholder = computed(() => {
    if (!isControlSelect.value) return

    return stateSelect.selectOption.label ? stateSelect.selectOption.label : props.placeholder
  })

  const search = async (value: string) => {
    if (!props.filterable) return

    if (value.trim() === '') {
      optionsFilter.value = [...optionArray]

      return
    }

    isFilterable.value = true
    // 有自定义过滤方法则调用自定义过滤方法
    if (typeof props.filterMethod === 'function') {
      optionsFilter.value = props.filterMethod(value)
    } else if (props.remote && props.filterable && typeof props.remoteMethod === 'function') {
      // 远程搜索
      try {
        optionsFilter.value = await props.remoteMethod(value)
      } catch (error) {
        console.error('Remote search failed:', error)
      }
    } else {
      optionsFilter.value = optionArray.filter((item) => {
        return String(item.label).includes(value)
      })
    }
  }
  const isControlSelect = ref(false)
  // 控制清空图标
  const isHover = ref(false)
  const showClearIcon = computed(() => {
    return props.clearable && stateSelect.inputValue && isHover.value && !props.disabled
  })

  // 清空select值
  const clear = () => {
    stateSelect.inputValue = ''
    stateSelect.selectOption = {
      value: '',
      label: '',
    }
  }

  // 控制下拉列表是否显示
  const controlSelect = (show: boolean) => {
    if (show) {
      // 再次打开，清空 inputValue
      stateSelect.inputValue = ''
      tooltipRef.value?.show()
    } else {
      // 关闭时，回显之前选中的值
      stateSelect.inputValue = stateSelect.selectOption.label
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

  // 监听 inputValue 的变化，发送对应事件
  watch(
    () => stateSelect.inputValue,
    (newValue, oldValue) => {
      emit('update:modelValue', newValue)
      if (newValue !== oldValue) {
        emit('change', newValue)
      }
    },
  )

  // 使用 useClickOutside 监听点击外部区域事件
  const selectRef = ref<HTMLDivElement>()
  useClickOutside(selectRef, () => {
    if (isControlSelect.value) {
      controlSelect(false)
    }
  })
  // 传递给子组件
  provide('inputRef', inputRef)
</script>

<style scoped></style>
