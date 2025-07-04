<template>
  <div
    role="alert"
    class="my-message"
    :class="{
      [`my-message--${type}`]: type,
      'is-close': showClose,
    }"
    v-show="visible"
  >
    <div class="my-message__content">{{ message }}</div>

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
  import { onMounted, ref } from 'vue'
  import Icon from '../Icon/Icon.vue'
  import type { MessageProps } from './types'

  const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
  })

  const visible = ref(false)
  // 关闭message
  const messageHandle = () => {
    if (props.duration) {
      setTimeout(() => {
        visible.value = false
      }, props.duration)
    }
  }

  onMounted(() => {
    visible.value = true
    messageHandle()
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
