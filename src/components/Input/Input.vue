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

      <div
        class="el-input__wrapper"
        :class="{ 'is-focus': isFocus }"
      >
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
          :type="inputType"
          :disabled="disabled"
          v-model="modelValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- suffix -->
        <span
          v-if="$slots.suffix || isClearable || isPwdShow"
          class="el-input__suffix"
        >
          <Icon
            icon="times-circle"
            @click="clear"
            v-if="isClearable"
          ></Icon>

          <Icon
            icon="eye"
            v-if="isPwdShow && isPassword"
            @click="togglePwdVisible"
          ></Icon>

          <Icon
            icon="eye-slash"
            v-else="isPwdShow && !isPassword"
            @click="togglePwdVisible"
          ></Icon>
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
        v-model="modelValue"
        @input="handleInput"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import Icon from '../Icon/Icon.vue'
  import type { InputEmits, InputProps } from './types'
  defineOptions({
    name: 'MyInput',
  })

  const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
  })

  // 输入框绑定
  const modelValue = ref(props.modelValue)
  // 控制清空功能
  const isFocus = ref(false)
  // 判断是否可以清空
  const isClearable = computed(
    () => !!modelValue.value && props.clearable && isFocus.value && !props.disabled,
  )
  // 控制密码是否可见
  const isPassword = ref(false)
  // 判断是否可见
  const isPwdShow = computed(() => props.showPassword && !!modelValue.value && !props.disabled)

  // 计算input的type
  const inputType = computed(() => {
    if (props.showPassword) {
      return isPassword.value ? 'text' : 'password'
    }

    return props.type
  })

  // 切换密码是否可见
  const togglePwdVisible = () => {
    isPassword.value = !isPassword.value
  }

  // focus
  const handleFocus = () => {
    isFocus.value = true
  }

  // blur
  const handleBlur = () => {
    isFocus.value = false
  }

  // 清空input
  const clear = () => {
    modelValue.value = ''
    emit('update:modelValue', '')
  }

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
