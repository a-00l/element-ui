<template>
  <div
    class="my-collapse-item"
    :class="{ 'is-disabled': disabled }"
  >
    <div
      class="my-collapse-item__header"
      @click="handleClick"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <!-- 动画组件 -->
    <Transition
      name="slide"
      v-on="transitionEvents"
    >
      <div
        class="my-collapse-item__wrapper"
        v-show="isActive"
      >
        <div
          class="my-collapse-item__content"
          :class="{ 'is-active': isActive }"
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import './style.scss'
  import { computed, inject } from 'vue'
  import { CollapseContextKey, type CollapseItemProps } from './types'
  defineOptions({
    name: 'MyCollapseItem',
  })

  // 接收父组件提供的方法
  const collapseContext = inject(CollapseContextKey)
  const props = defineProps<CollapseItemProps>()
  // 判断是否显示
  const isActive = computed(() => {
    return collapseContext?.activeNames.value?.includes(props.name)
  })
  // 设置name
  const handleClick = () => {
    // 可以点击
    if (!props.disabled) {
      collapseContext?.setActiveNames(props.name)
    }
  }

  const transitionEvents: Record<string, (el: HTMLElement) => void> = {
    // 动画前状态
    beforeEnter(el) {
      el.style.height = '0px'
    },
    // 动画执行状态（从0 - 内容高度）
    enter(el) {
      el.style.height = `${el.scrollHeight}px`
    },
    // 动画结束状态
    afterEnter(el) {
      el.style.height = ''
    },
    // 动画离开前状态
    beforeLeave(el) {
      el.style.height = `${el.scrollHeight}px`
    },
    // 动画执行状态
    leave(el) {
      el.style.height = '0px'
    },
    // 动画结束状态
    afterLeave(el) {
      el.style.height = ''
    },
  }
</script>

<style scoped></style>
