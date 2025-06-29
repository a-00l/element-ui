<template>
  <div class="my-tooltip">
    <div
      class="my-tooltip__trigger"
      ref="triggerRef"
      @click="togglePopper"
    >
      <slot></slot>
    </div>
    <div
      v-if="isOpen"
      class="my-tooltip__popper"
      ref="popperRef"
    >
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue'
  import type { TooltipEmits, TooltipProps } from './types'
  import { createPopper, type Instance } from '@popperjs/core'
  defineOptions({
    name: 'MyTooltip',
  })

  // 获取dom
  const triggerRef = ref<HTMLElement>()
  const popperRef = ref<HTMLElement>()

  const props = withDefaults(defineProps<TooltipProps>(), {
    placement: 'bottom',
  })

  const emit = defineEmits<TooltipEmits>()
  // 切换点击状态
  const isOpen = ref(false)
  const togglePopper = () => {
    isOpen.value = !isOpen.value
    emit('visible-change', isOpen.value)

    nextTick(() => {
      tooltipShow()
    })
  }

  // 定义popper实例
  let popperInstance: Instance | null = null
  const tooltipShow = () => {
    if (!isOpen.value) return
    console.log('triggerRef', triggerRef.value, 'popperRef', popperRef.value)

    // dom创建后创建tooplit
    if (triggerRef.value && popperRef.value) {
      console.log('创建toolpit')

      popperInstance = createPopper(triggerRef.value, popperRef.value, {
        placement: props.placement,
      })
    } else {
      popperInstance?.destroy()
    }
  }

  // watch(
  //   isOpen,
  //   (newVal) => {
  //     if (!newVal) return
  //     console.log('triggerRef', triggerRef.value, 'popperRef', popperRef.value)

  //     // dom创建后创建tooplit
  //     if (triggerRef.value && popperRef.value) {
  //       console.log('创建toolpit')

  //       popperInstance = createPopper(triggerRef.value, popperRef.value, {
  //         placement: props.placement,
  //       })
  //     } else {
  //       popperInstance?.destroy()
  //     }
  //   },
  //   { flush: 'post' },
  // )
</script>

<style lang="scss" scoped></style>
