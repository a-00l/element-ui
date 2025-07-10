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
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
  import type { InputProps } from './types'

  defineOptions({
    name: 'MyInput',
  })

  withDefaults(defineProps<InputProps>(), {
    type: 'text',
  })
</script>

<style scoped></style>
