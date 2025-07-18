<template>
  <!-- loding加载 -->
  <div
    class="my-select__loading"
    v-if="loading"
  >
    <Icon
      icon="spinner"
      spin
    >
    </Icon>
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/Icon/Icon.vue'
  defineProps({
    loading: {
      type: Boolean,
    },
  })
</script>
<style lang="scss" scoped>
  .my-select__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--my-text-color-secondary);
    font-size: var(--my-select-font-size);
  }
</style>
