<template>
  <div
    class="my-tooltip"
    v-on="emitParent"
    ref="parentNode"
  >
    <div
      class="my-tooltip__trigger"
      ref="triggerRef"
      v-on="emitTrigger"
    >
      <slot></slot>
    </div>
    <Transition :name="props.transition">
      <div
        v-show="isOpen"
        @mouseenter="openFinal"
        class="my-tooltip__popper"
        :class="{
          'is-dark': effect === 'dark',
          'is-light': effect === 'light',
        }"
        ref="popperRef"
      >
        <slot name="content">{{ content }}</slot>
        <div
          data-popper-arrow
          id="arrow"
          :class="{
            'is-dark': effect === 'dark',
            'is-light': effect === 'light',
          }"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { useClickOutside } from '@/hooks/useClickOutside'
  import { nextTick, onUnmounted, ref, watch } from 'vue'
  import type { TooltipEmits, TooltipInstance, TooltipProps } from './types'
  import { createPopper, type Instance } from '@popperjs/core'
  import { debounce } from '@/utils/debounce'
  defineOptions({
    name: 'MyTooltip',
  })

  // 获取dom
  const triggerRef = ref<HTMLElement>()
  const popperRef = ref<HTMLElement>()
  const emit = defineEmits<TooltipEmits>()
  const props = withDefaults(defineProps<TooltipProps>(), {
    placement: 'bottom',
    trigger: 'hover',
    manual: false,
    transition: 'fade',
    openDelay: 200,
    closeDelay: 200,
    effect: 'dark',
  })

  // trigger事件
  let emitTrigger: Record<string, () => void> = {}
  // 用于添加hover
  let emitParent: Record<string, () => void> = {}
  // 定义popper实例
  let popperInstance: Instance | null = null
  const parentNode = ref<HTMLElement | undefined>()
  // 切换点击状态
  const isOpen = ref(false)

  const open = () => {
    isOpen.value = true
    emit('visible-change', isOpen.value)
  }

  const close = () => {
    isOpen.value = false
    emit('visible-change', isOpen.value)
  }

  const opendebounce = debounce(open, props.openDelay)
  const closedebounce = debounce(close, props.closeDelay)
  const openFinal = () => {
    closedebounce.cancel()
    opendebounce()
  }

  const closeFinal = () => {
    opendebounce.cancel()
    closedebounce()
  }

  useClickOutside(parentNode, () => {
    if (props.trigger === 'click' && !props.manual && isOpen.value) {
      debugger
      console.log(123123)
      close()
    }
  })

  // 创建popper
  const tooltipShow = () => {
    if (!isOpen.value) return

    // dom创建后创建tooplit
    if (triggerRef.value && popperRef.value) {
      popperInstance?.destroy()
      popperInstance = createPopper(triggerRef.value, popperRef.value, {
        placement: props.placement,
        ...props.popperOption,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 20],
            },
          },
        ],
      })
    }
  }

  watch(isOpen, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      emit('visible-change', isOpen.value)
      nextTick(() => {
        tooltipShow()
      })
    }
  })

  const togglePopper = () => {
    debugger
    isOpen.value = !isOpen.value
    emit('visible-change', isOpen.value)
  }

  const attachEvent = () => {
    if (props.trigger === 'click') {
      emitTrigger.click = debounce(togglePopper, isOpen.value ? props.closeDelay : props.openDelay)
    } else if (props.trigger === 'hover') {
      emitTrigger.mouseenter = openFinal

      emitParent.mouseleave = closeFinal
    }
  }

  if (!props.manual) {
    // 初始化添加事件
    attachEvent()
  }
  // 监听事件变化
  watch(
    () => props.trigger,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        // 清空原本事件
        emitTrigger = {}
        emitParent = {}
        // 添加新事件
        attachEvent()
      }
    },
  )

  // 暴露：click显示
  const tooltipShowEx = () => {
    // 清空trigger事件
    emitTrigger = {}
    emitParent = {}
    open()
    nextTick(() => {
      tooltipShow()
    })
  }

  const tooltipInstance: TooltipInstance = {
    show: tooltipShowEx,
    hide: close,
  }

  // 暴露方法
  defineExpose(tooltipInstance)
  onUnmounted(() => {
    popperInstance?.destroy()
  })
</script>

<style lang="scss" scoped></style>
