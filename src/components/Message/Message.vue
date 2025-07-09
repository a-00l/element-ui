<template>
  <Transition
    :name="transitionName"
    @enter="handleBeforeEnter"
    @after-leave="handelLeaveTo"
  >
    <div
      role="alert"
      class="my-message"
      :class="{
        [`my-message--${type}`]: type,
        'is-close': showClose,
      }"
      v-show="visible"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="messageHandle"
    >
      <div class="my-message__content">{{ message }}</div>
      <div
        class="my-message__close"
        v-if="showClose"
      >
        <Icon
          icon="xmark"
          @click.stop="deleteMessage(id)"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import Icon from '../Icon/Icon.vue'
  import type { MessageProps } from './types'
  import { getBottomOffset, deleteMessage } from './method'
  import { useEventListener } from '@/hooks/useEventListener'

  const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
    offset: 10,
    transitionName: 'fade-up',
  })

  const messageRef = ref<HTMLDivElement>()
  // 获取message高度
  const height = ref(0)
  // 获取最后一个实例的bottomOffset
  const lastOffset = computed(() => getBottomOffset(props.id))
  // 计算当前实例的topOffset
  const topOffset = computed(() => lastOffset.value + props.offset)
  // 计算当前实例的bottomOffset
  const bottomOffset = computed(() => topOffset.value + height.value)
  // 计算css属性
  const cssStyle = computed(() => ({
    top: topOffset.value + 'px',
    zIndex: props.zIndex,
  }))

  // 监听键盘事件，按下Esc则清空message消息提示
  useEventListener(document, 'keydown', (e: Event) => {
    const event = e as KeyboardEvent
    if (event.code === 'Escape') {
      visible.value = false
    }
  })

  onMounted(() => {
    visible.value = true
    messageHandle()
  })

  let timer: number
  // 控制message的显示
  const visible = ref(false)
  // 关闭message
  const messageHandle = () => {
    if (props.duration) {
      timer = setTimeout(() => {
        visible.value = false
      }, props.duration)
    }
  }

  // 清除定时器
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }

  const handelLeaveTo = () => {
    props.onDestroy()
  }

  const handleBeforeEnter = () => {
    if (messageRef.value) {
      height.value = messageRef.value?.getBoundingClientRect().height
    }
  }

  defineExpose({
    bottomOffset,
    visible,
  })
</script>

<style scoped>
  .my-message {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
