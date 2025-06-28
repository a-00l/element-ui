<template>
  <i
    class="my-icon"
    v-bind="$attrs"
  >
    <font-awesome-icon
      v-bind="$props"
      :style="cssStyle"
    >
    </font-awesome-icon>
  </i>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { IconProps } from './types'
  defineOptions({
    name: 'myIcon',
    inheritAttrs: false,
  })

  const { size, color } = defineProps<IconProps>()
  // css属性
  const cssStyle = computed(() => {
    return {
      fontSize: size ? size : '1em',
      color: color ? color : '',
    }
  })
</script>

<style scoped></style>
