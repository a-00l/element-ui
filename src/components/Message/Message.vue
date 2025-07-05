<template>
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
  >
    <div class="my-message__content">{{ message }}</div>
    topOffset: {{ topOffset }} - bottomOffset:{{ bottomOffset }} - height:{{ height }}
    <div
      class="my-message__close"
      v-if="showClose"
    >
      <Icon
        icon="xmark"
        @click="visible = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, watch } from 'vue'
  import Icon from '../Icon/Icon.vue'
  import type { MessageProps } from './types'
  import { getBottomOffset } from './method'

  const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
    offset: 10,
  })

  const messageRef = ref<HTMLDivElement>()
  const height = ref(0)

  // 获取最后一个实例的bottomOffset
  const lastOffset = computed(() => getBottomOffset(props.id))
  // 计算当前实例的topOffset
  const topOffset = computed(() => lastOffset.value + props.offset)
  // 计算当前实例的bottomOffset
  const bottomOffset = computed(() => topOffset.value + height.value)
  // 计算偏移值
  const cssStyle = computed(() => ({ top: topOffset.value + 'px' }))

  defineExpose({
    bottomOffset,
  })

  onMounted(() => {
    visible.value = true
    messageHandle()
    nextTick(() => {
      // 获取当前message的高度
      if (messageRef.value) {
        height.value = messageRef.value?.getBoundingClientRect().height
      }
    })
  })
  // 控制message的显示
  const visible = ref(false)
  // 关闭message
  const messageHandle = () => {
    if (props.duration) {
      setTimeout(() => {
        visible.value = false
      }, props.duration)
    }
  }

  watch(visible, (newVisible) => {
    // 关闭message的同时销毁dom节点
    if (!newVisible) {
      props.onDestroy()
    }
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
