<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Button from './components/Button/Button.vue'
  import type { ButtonInstance } from './components/Button/types'

  const btn = ref<ButtonInstance>()
  onMounted(() => {
    console.log(btn.value?.ref)
  })
</script>

<template>
  <Button ref="btn">登录</Button>
</template>

<style scoped></style>
