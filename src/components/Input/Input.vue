<template>
  <div
    class="my-input"
    :class="{
      [`my-input-${size}`]: size,
      'is-disabled': disabled,
      'is-append': $slots.append,
      'is-prepend': $slots.prepend,
      'is-suffix': $slots.suffix,
    }"
  >
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div
        v-if="$slots.prepend"
        class="el-input-group__prepend"
      >
        <slot name="prepend"></slot>
      </div>

      <div class="el-input__wrapper">
        <!-- prefix -->
        <span
          v-if="prefixIcon"
          class="el-input__prefix"
          :key="1"
          :class="{ abas: true }"
        >
          <slot name="prefix">{{ prefixIcon }}</slot>
        </span>

        <!-- input -->
        <input
          class="el-input__inner"
          :type="type"
          :disabled="disabled"
          v-model="modelValue"
          @input="handleInput"
        />

        <!-- suffix -->
        <span
          v-if="$slots.suffix"
          class="el-input__suffix"
        >
          <slot name="suffix"></slot>
        </span>
      </div>

      <!-- append slot -->
      <div
        v-if="$slots.append"
        class="el-input-group__append"
      >
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        name=""
        id=""
        v-model="modelValue"
        @input="handleInput"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { InputEmits, InputProps } from './types'
  defineOptions({
    name: 'MyInput',
  })

  const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
  })

  // 输入框绑定
  const modelValue = ref(props.modelValue)
  const emit = defineEmits<InputEmits>()
  // 处理输入事件
  const handleInput = () => {
    emit('update:modelValue', modelValue.value)
  }

  // 外部更新modalValue，同步到本地modelValue
  watch(
    () => props.modelValue,
    (newValue) => (modelValue.value = newValue),
  )
</script>

<style scoped></style>
