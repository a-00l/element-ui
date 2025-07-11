<template>
  <div
    class="my-switch"
    :class="{
      [`my-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="toggleSwitch"
  >
    <input
      class="my-switch__input"
      type="checkbox"
      role="switch"
      :disabled="disabled"
      :name="name"
      :id="id"
    />

    <span
      class="my-switch__core"
      :style="{ width: `${width}px` }"
    >
      <div class="my-switch__inner">
        <span class="my-switch__inner-text">{{ checked ? activeText : inactiveText }}</span>
      </div>
      <div class="my-switch__action"></div>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { SwitchEmits, SwitchPrors } from './types'
  defineOptions({
    name: 'MySwitch',
  })

  const props = withDefaults(defineProps<SwitchPrors>(), {
    activeValue: true,
    inactiveValue: false,
  })

  const emit = defineEmits<SwitchEmits>()

  // 控制switch开关
  const isSwitch = ref()
  const checked = computed(() => isSwitch.value === props.activeValue)

  const toggleSwitch = () => {
    if (props.disabled) return

    // 切换switch
    const newSwitch = isSwitch.value ? props.inactiveValue : props.activeValue

    isSwitch.value = newSwitch

    emit('change', newSwitch)
    emit('update:modelValue', newSwitch)
  }
</script>

<style scoped></style>
